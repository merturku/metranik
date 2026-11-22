import { describe, it, expect } from "vitest";
import { kirisKesmeGerilmesiJourawski } from "./kiris-kesme-gerilmesi-jourawski";

describe("Kiriş Kesme Gerilmesi (Jourawski)", () => {
  it("dikdörtgen 100×200, V = 60 kN: τmaks = 1,5·60000/20000 = 4,5 MPa", () => {
    const r = kirisKesmeGerilmesiJourawski.compute({ kesitTipi: "dikdortgen", kesmeKuvveti_V_kN: 60, yukseklik_h_mm: 200, genislik_b_mm: 100, govdeKalinligi_tw_mm: 8, baslikKalinligi_tf_mm: 12, izinVerilenGerilme_MPa: 10 });
    expect(r.value.maksKesmeGerilmesi_MPa).toBeCloseTo(4.5, 10);
    expect(r.intermediates.ortalama_tau_MPa as number).toBeCloseTo(3, 10);
  });
  it("I kesit bf100 h200 tw8 tf12, V = 50 kN: I = 24 869 717 mm⁴, τmaks = 36,13 MPa, birleşimde 28,35 MPa", () => {
    const r = kirisKesmeGerilmesiJourawski.compute({ kesitTipi: "i_kesit", kesmeKuvveti_V_kN: 50, yukseklik_h_mm: 200, genislik_b_mm: 100, govdeKalinligi_tw_mm: 8, baslikKalinligi_tf_mm: 12, izinVerilenGerilme_MPa: 100 });
    expect(r.intermediates.I_mm4 as number).toBeCloseTo(24869717.33, 1);
    expect(r.value.maksKesmeGerilmesi_MPa).toBeCloseTo(36.1323, 3);
    expect(r.intermediates.tau_govde_baslik_birlesimi_MPa as number).toBeCloseTo(28.3477, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("izin gerilme aşılırsa uygunsuz; geçersiz geometri uygunsuz", () => {
    const g = { kesitTipi: "i_kesit" as const, kesmeKuvveti_V_kN: 50, yukseklik_h_mm: 200, genislik_b_mm: 100, govdeKalinligi_tw_mm: 8, baslikKalinligi_tf_mm: 12, izinVerilenGerilme_MPa: 30 };
    expect(kirisKesmeGerilmesiJourawski.compute(g).verdict?.status).toBe("uygunsuz");
    expect(kirisKesmeGerilmesiJourawski.compute({ ...g, baslikKalinligi_tf_mm: 110 }).verdict?.status).toBe("uygunsuz");
  });
});
