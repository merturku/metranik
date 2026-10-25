import { describe, it, expect } from "vitest";
import { koseKaynagiDikisKapasitesi, koseKaynagiDikisKapasitesiInputSchema } from "./kose-kaynagi-dikis-kapasitesi";

const s235 = {
  celikSinifi: "S235" as const,
  kaynakKalinligi_a_mm: 5,
  kaynakUzunlugu_L_mm: 200,
  dikisSayisi: 1,
  uzunlukTipi: "tam" as const,
  kuvvetYonu: "enine" as const,
  tasarimKuvveti_FEd_kN: 150,
  gammaM2: 1.25,
};

describe("Köşe Kaynağı Dikiş Kapasitesi", () => {
  it("S235, a = 5 mm, L = 200 mm: fvw,d = 360/(√3×0,8×1,25) = 207,85 MPa, Fw,Rd = 1039,2 N/mm × 200 = 207,8 kN → uygun", () => {
    const r = koseKaynagiDikisKapasitesi.compute(s235);
    expect(r.intermediates.kaynak_kayma_dayanimi_fvwd_MPa).toBeCloseTo(207.846, 3);
    expect(r.intermediates.birim_boy_dayanimi_N_mm).toBeCloseTo(1039.23, 2);
    expect(r.value.kaynakTasarimDayanimi_kN).toBeCloseTo(207.846, 3);
    expect(r.intermediates.kullanim_orani).toBeCloseTo(150 / 207.846, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("S355, a = 4 mm, iki dikiş, uç krateri (Leff = 150 − 8 = 142 mm): 510/(√3×0,9×1,25) = 261,73 MPa → 2 × 1046,9 × 142 = 297,3 kN < 320 kN → uygunsuz", () => {
    const r = koseKaynagiDikisKapasitesi.compute({
      ...s235,
      celikSinifi: "S355",
      kaynakKalinligi_a_mm: 4,
      kaynakUzunlugu_L_mm: 150,
      dikisSayisi: 2,
      uzunlukTipi: "krater",
      kuvvetYonu: "boyuna",
      tasarimKuvveti_FEd_kN: 320,
    });
    expect(r.intermediates.kaynak_kayma_dayanimi_fvwd_MPa).toBeCloseTo(261.732, 3);
    expect(r.intermediates.etkin_dikis_boyu_mm).toBe(142);
    expect(r.intermediates.uzun_birlesim_azaltmasi_betaLw).toBe(1);
    expect(r.value.kaynakTasarimDayanimi_kN).toBeCloseTo(297.329, 2);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Uzun bindirmeli birleşim (S235, a = 4, L = 900 mm > 150a = 600 mm): βLw.1 = 1,2 − 0,2×900/600 = 0,9 → 0,9 × 831,4 × 900 = 673,4 kN", () => {
    const r = koseKaynagiDikisKapasitesi.compute({
      ...s235,
      kaynakKalinligi_a_mm: 4,
      kaynakUzunlugu_L_mm: 900,
      kuvvetYonu: "boyuna",
      tasarimKuvveti_FEd_kN: 600,
    });
    expect(r.intermediates.uzun_birlesim_azaltmasi_betaLw).toBeCloseTo(0.9, 12);
    expect(r.value.kaynakTasarimDayanimi_kN).toBeCloseTo(673.42, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Geometri koşulları: a = 2,5 mm ve 25 mm'lik dikiş taşıyıcı sayılmaz; dikiş sayısı tam sayı olmalı", () => {
    expect(koseKaynagiDikisKapasitesi.compute({ ...s235, kaynakKalinligi_a_mm: 2.5 }).verdict?.status).toBe("uygunsuz");
    const kisa = koseKaynagiDikisKapasitesi.compute({ ...s235, kaynakUzunlugu_L_mm: 25, tasarimKuvveti_FEd_kN: 1 });
    expect(kisa.verdict?.status).toBe("uygunsuz");
    expect(koseKaynagiDikisKapasitesiInputSchema.safeParse({ ...s235, dikisSayisi: 1.5 }).success).toBe(false);
  });
});
