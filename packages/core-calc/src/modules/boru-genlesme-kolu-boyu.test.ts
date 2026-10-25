import { describe, it, expect } from "vitest";
import { boruGenlesmeKoluBoyu, boruGenlesmeKoluBoyuInputSchema } from "./boru-genlesme-kolu-boyu";

// DN100 çelik boru D = 114,3 mm, 50 mm genleşme, E = 200 GPa, SA = 100 MPa.
const dn100 = {
  boruDisCapi_D_mm: 114.3,
  genlesmeMiktari_delta_mm: 50,
  elastisiteModulu_E_GPa: 200,
  izinVerilenGerilme_SA_MPa: 100,
  mevcutKolBoyu_m: 6,
};

describe("Boru Genleşme Kolu Boyu (Kılavuzlu Konsol)", () => {
  it("L = √(3 × 200 000 × 114,3 × 50 / 100) = √34 290 000 = 5855,8 mm → 6 m kol uygun", () => {
    const r = boruGenlesmeKoluBoyu.compute(dn100);
    expect(r.intermediates.gerekli_kol_boyu_mm).toBeCloseTo(5855.766, 3);
    expect(r.value.gerekliKolBoyu_m).toBeCloseTo(5.85577, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Gereken boy √δ ile artar: 25 mm genleşmede 5855,8/√2 = 4140,7 mm", () => {
    const r = boruGenlesmeKoluBoyu.compute({ ...dn100, genlesmeMiktari_delta_mm: 25 });
    expect(r.intermediates.gerekli_kol_boyu_mm).toBeCloseTo(4140.652, 3);
  });

  it("4 m mevcut kol: karşılanan δ = 100 × 4000² / (3 × 200 000 × 114,3) = 23,33 mm, gerilme 3×200 000×114,3×50/4000² = 214,3 MPa → uygunsuz", () => {
    const r = boruGenlesmeKoluBoyu.compute({ ...dn100, mevcutKolBoyu_m: 4 });
    expect(r.intermediates.mevcut_kolun_karsiladigi_genlesme_mm).toBeCloseTo(23.3304, 4);
    expect(r.intermediates.mevcut_kolda_gerilme_MPa).toBeCloseTo(214.3125, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Genleşme sıfır olamaz", () => {
    expect(boruGenlesmeKoluBoyuInputSchema.safeParse({ ...dn100, genlesmeMiktari_delta_mm: 0 }).success).toBe(false);
  });
});
