import { describe, expect, it } from "vitest";
import { zeminKonsolidasyonOturmasi } from "./zemin-konsolidasyon-oturmasi";

describe("zemin-konsolidasyon-oturmasi", () => {
  it("Cc=0.3, H=5m, e0=0.8, σ0=100kPa, Δσ=50kPa → ~146.7 mm", () => {
    const r = zeminKonsolidasyonOturmasi.compute({
      sikismaKatsayisi_Cc: 0.3,
      tabakaKalinligi_H_m: 5,
      ilkBosluklOrani_e0: 0.8,
      ilkGerilme_sigma0_kPa: 100,
      ekGerilme_dsigma_kPa: 50,
    });

    expect(r.intermediates.gerilmeOrani).toBeCloseTo(1.5, 5);
    expect(r.value.oturma_mm).toBeCloseTo(146.74, 1);
  });
});
