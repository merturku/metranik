import { describe, it, expect } from "vitest";
import { yagmurOluguKapasitesi } from "./yagmur-olugu-kapasitesi";

// 125 mm yarım daire oluk (r = 62,5 mm), tam dolu, S = %0,5, n = 0,011 (PVC):
// A = πr²/2 = 6,1359·10⁻³ m², P = πr = 0,19635 m, R = r/2 = 0,03125 m
// Q = (1/0,011)·A·R^(2/3)·√0,005 = 3,913 L/s.
const ornek = {
  olukYaricapi_mm: 62.5,
  suDerinligi_orani: 1,
  egim_yuzde: 0.5,
  manningN: 0.011,
  catiAlani_m2: 120,
  yagisSiddeti_mmh: 100,
  akisKatsayisi: 1,
};

describe("Yağmur Oluğu Taşıma Kapasitesi", () => {
  it("tam dolu yarım daire: R = r/2 ve Q = 3,913 L/s", () => {
    const r = yagmurOluguKapasitesi.compute(ornek);
    expect(r.intermediates.hidrolik_yaricap_m).toBeCloseTo(0.03125, 8);
    expect(r.value.olukKapasitesi_Ls).toBeCloseTo(3.9133, 3);
  });

  it("çatı debisi = 120·100/3,6·10⁶ = 3,333 L/s → uygun (kullanım ~%85)", () => {
    const r = yagmurOluguKapasitesi.compute(ornek);
    expect(r.intermediates.cati_debisi_Ls).toBeCloseTo(3.3333, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("yarı dolu (y = r/2): θ = 2π/3 ve Q = 1,072 L/s; aynı çatı için uygunsuz", () => {
    const r = yagmurOluguKapasitesi.compute({ ...ornek, suDerinligi_orani: 0.5 });
    expect(r.value.olukKapasitesi_Ls).toBeCloseTo(1.0721, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
