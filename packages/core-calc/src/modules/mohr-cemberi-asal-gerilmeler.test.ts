import { describe, it, expect } from "vitest";
import { mohrCemberiAsalGerilmeler } from "./mohr-cemberi-asal-gerilmeler";

describe("Mohr Çemberi Asal Gerilmeler", () => {
  it("σx=80, σy=20, τ=30: ort 50, R = 42,426, σ1 = 92,426, σ2 = 7,574, θp = 22,5°", () => {
    const r = mohrCemberiAsalGerilmeler.compute({ sigmaX_MPa: 80, sigmaY_MPa: 20, tauXY_MPa: 30 });
    expect(r.value.sigma1_MPa).toBeCloseTo(92.426, 3);
    expect(r.intermediates.sigma2_MPa as number).toBeCloseTo(7.574, 3);
    expect(r.intermediates.cember_yaricapi_tau_maks_MPa as number).toBeCloseTo(42.426, 3);
    expect(r.intermediates.asal_duzlem_acisi_derece as number).toBeCloseTo(22.5, 6);
  });
  it("von Mises, σx²−σxσy+σy²+3τ² = 7900 ile aynı: √7900 = 88,882", () => {
    const r = mohrCemberiAsalGerilmeler.compute({ sigmaX_MPa: 80, sigmaY_MPa: 20, tauXY_MPa: 30 });
    expect(r.intermediates.von_mises_MPa as number).toBeCloseTo(Math.sqrt(7900), 6);
  });
  it("invaryantlar: σ1+σ2 = σx+σy; saf kayma τ için σ1 = τ, σ2 = −τ", () => {
    const r = mohrCemberiAsalGerilmeler.compute({ sigmaX_MPa: 0, sigmaY_MPa: 0, tauXY_MPa: 40 });
    expect(r.value.sigma1_MPa).toBeCloseTo(40, 8);
    expect(r.intermediates.sigma2_MPa as number).toBeCloseTo(-40, 8);
  });
});
