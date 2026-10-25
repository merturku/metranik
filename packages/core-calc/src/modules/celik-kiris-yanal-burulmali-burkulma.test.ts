import { describe, it, expect } from "vitest";
import {
  celikKirisYanalBurulmaliBurkulma,
  celikKirisYanalBurulmaliBurkulmaInputSchema,
} from "./celik-kiris-yanal-burulmali-burkulma";

// IPE 300 (S235): Wpl,y = 628,4 cm³, Iz = 603,8 cm⁴, It = 20,12 cm⁴, Iw = 125 900 cm⁶; h/b = 2 → eğri a.
const ipe300 = {
  celikSinifi: "S235" as const,
  plastikMukavemetMomenti_Wpl_cm3: 628.4,
  zayifEksenAtaleti_Iz_cm4: 603.8,
  burulmaAtaleti_It_cm4: 20.12,
  carpilmaSabiti_Iw_cm6: 125900,
  yanalTutulmamisBoy_L_m: 4,
  momentKatsayisi_C1: 1,
  burkulmaEgrisi: "a" as const,
  gammaM1: 1,
  tasarimMomenti_MEd_kNm: 90,
};

describe("Çelik Kiriş Yanal Burulmalı Burkulma", () => {
  it("IPE 300, L = 4 m, sabit moment: Mcr = 782,2 kN × √(20 851 + 20 837) mm = 159,70 kNm; λ̄LT = 0,9616, χLT = 0,6923 → Mb,Rd = 102,23 kNm", () => {
    const r = celikKirisYanalBurulmaliBurkulma.compute(ipe300);
    expect(r.intermediates.elastik_kritik_moment_Mcr_kNm).toBeCloseTo(159.697, 2);
    expect(r.intermediates.boyutsuz_narinlik_lambdaLT).toBeCloseTo(0.96162, 4);
    expect(r.intermediates.azaltma_katsayisi_chiLT).toBeCloseTo(0.69229, 4);
    expect(r.value.burkulmaMomentDayanimi_MbRd_kNm).toBeCloseTo(102.233, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Bağımsız kontrol: çarpılma ihmal edilirse (Iw → 0) Mcr = (π/L)·√(E·Iz·G·It) klasik sonucuna iner", () => {
    const r = celikKirisYanalBurulmaliBurkulma.compute({ ...ipe300, carpilmaSabiti_Iw_cm6: 1e-9 });
    const klasik = (Math.PI / 4000) * Math.sqrt(210000 * 603.8e4 * 81000 * 20.12e4) / 1e6;
    expect(r.intermediates.elastik_kritik_moment_Mcr_kNm).toBeCloseTo(klasik, 6);
  });

  it("C1 = 1,13 (düzgün yayılı yük) Mcr'yi doğrudan 1,13 katına çıkarır: 180,46 kNm → Mb,Rd = 107,93 kNm", () => {
    const r = celikKirisYanalBurulmaliBurkulma.compute({ ...ipe300, momentKatsayisi_C1: 1.13 });
    expect(r.intermediates.elastik_kritik_moment_Mcr_kNm).toBeCloseTo(1.13 * 159.697, 2);
    expect(r.value.burkulmaMomentDayanimi_MbRd_kNm).toBeCloseTo(107.934, 2);
  });

  it("L = 8 m, eğri b: χLT = 0,3316 → Mb,Rd = 48,96 kNm; 90 kNm → uygunsuz", () => {
    const r = celikKirisYanalBurulmaliBurkulma.compute({ ...ipe300, yanalTutulmamisBoy_L_m: 8, burkulmaEgrisi: "b" });
    expect(r.value.burkulmaMomentDayanimi_MbRd_kNm).toBeCloseTo(48.965, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("C1 1'den küçük olamaz", () => {
    expect(celikKirisYanalBurulmaliBurkulmaInputSchema.safeParse({ ...ipe300, momentKatsayisi_C1: 0.8 }).success).toBe(false);
  });
});
