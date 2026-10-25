import { describe, it, expect } from "vitest";
import { temelElastikOturmasi } from "./temel-elastik-oturmasi";

describe("Temel Elastik (Ani) Oturması", () => {
  it("q = 150 kPa, B = 2 m, ν = 0,3, Es = 20 MPa, Is = 1,12: s = 150×2×0,91×1,12/20000 = 15,29 mm ≤ 25 mm → uygun", () => {
    const r = temelElastikOturmasi.compute({
      netTemelBasinci_q_kPa: 150,
      temelGenisligi_B_m: 2,
      poissonOrani: 0.3,
      zeminElastisiteModulu_Es_kPa: 20000,
      etkiKatsayisi_Is: 1.12,
      izinVerilenOturma_mm: 25,
    });
    expect(r.intermediates.poisson_carpani).toBeCloseTo(0.91, 4);
    expect(r.value.oturma_mm).toBeCloseTo(15.288, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("q = 250 kPa, B = 2,5 m, ν = 0,35, Es = 15 MPa, Is = 0,95: s = 34,73 mm > 25 mm → uygunsuz", () => {
    const r = temelElastikOturmasi.compute({
      netTemelBasinci_q_kPa: 250,
      temelGenisligi_B_m: 2.5,
      poissonOrani: 0.35,
      zeminElastisiteModulu_Es_kPa: 15000,
      etkiKatsayisi_Is: 0.95,
      izinVerilenOturma_mm: 25,
    });
    expect(r.value.oturma_mm).toBeCloseTo(34.734, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
