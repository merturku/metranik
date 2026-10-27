import { describe, it, expect } from "vitest";
import { ahsapKolonBurkulmaKontrolu, ahsapKolonBurkulmaKontroluInputSchema } from "./ahsap-kolon-burkulma-kontrolu";

const dikme = {
  dayanimSinifi: "C24" as const,
  genislik_b_mm: 100,
  yukseklik_h_mm: 100,
  burkulmaBoyu_y_m: 3,
  burkulmaBoyu_z_m: 3,
  eksenelYuk_NEd_kN: 30,
  yukSuresi: "orta" as const,
  servisSinifi: "1-2" as const,
  gammaM: 1.3,
};

describe("Ahşap Kolon Burkulma Kontrolü", () => {
  it("C24 100×100, Lef = 3 m: i = 28,87 mm, λ = 103,9, λrel = (λ/π)√(21/7400) = 1,762", () => {
    const r = ahsapKolonBurkulmaKontrolu.compute(dikme);
    expect(r.intermediates.narinlik_lambda_z).toBeCloseTo(103.923, 3);
    expect(r.intermediates.goreli_narinlik_lambda_rel_z).toBeCloseTo(1.76220, 4);
  });

  it("k = 0,5[1 + 0,2(λrel − 0,3) + λrel²] = 2,1989 → kc = 0,2846; σ = 3,0 MPa ≤ kc·fc,0,d = 3,677 MPa → uygun (%81,6)", () => {
    const r = ahsapKolonBurkulmaKontrolu.compute(dikme);
    expect(r.intermediates.burkulma_katsayisi_kc_z).toBeCloseTo(0.284566, 5);
    expect(r.intermediates.tasarim_basinc_dayanimi_fc0d_MPa).toBeCloseTo(12.9231, 4);
    expect(r.value.kullanimOrani).toBeCloseTo(0.815777, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Aynı kolon 40 kN'da σ = 4,0 > 3,677 MPa → uygunsuz", () => {
    const r = ahsapKolonBurkulmaKontrolu.compute({ ...dikme, eksenelYuk_NEd_kN: 40 });
    expect(r.value.kullanimOrani).toBeCloseTo(4 / 3.677475, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Kısa kolon 200×200, Lef = 1 m: λrel = 0,2937 ≤ 0,3 → kc = 1 (burkulma etkisiz)", () => {
    const r = ahsapKolonBurkulmaKontrolu.compute({
      ...dikme,
      genislik_b_mm: 200,
      yukseklik_h_mm: 200,
      burkulmaBoyu_y_m: 1,
      burkulmaBoyu_z_m: 1,
    });
    expect(r.intermediates.goreli_narinlik_lambda_rel_z).toBeCloseTo(0.293700, 5);
    expect(r.intermediates.burkulma_katsayisi_kc_z).toBe(1);
  });

  it("C30 100×200, Ly = 4 m, Lz = 2 m: her iki eksende λrel = 1,2079, kc = 0,5396; NRd = 0,5396 × 14,769 × 20 000 = 159,4 kN", () => {
    const r = ahsapKolonBurkulmaKontrolu.compute({
      ...dikme,
      dayanimSinifi: "C30",
      yukseklik_h_mm: 200,
      burkulmaBoyu_y_m: 4,
      burkulmaBoyu_z_m: 2,
    });
    expect(r.intermediates.goreli_narinlik_lambda_rel_y).toBeCloseTo(1.20790, 4);
    expect(r.intermediates.burkulma_katsayisi_kc_y).toBeCloseTo(0.539554, 5);
    expect(r.intermediates.eksenel_tasima_kapasitesi_NRd_kN).toBeCloseTo(159.376, 2);
    expect(ahsapKolonBurkulmaKontroluInputSchema.safeParse({ ...dikme, dayanimSinifi: "C40" }).success).toBe(false);
  });
});
