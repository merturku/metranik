import { describe, it, expect } from "vitest";
import { istinatPasifToprakBasinci } from "./istinat-pasif-toprak-basinci";

describe("Pasif Toprak Basıncı (Rankine)", () => {
  it("φ = 30°, c = 0, γ = 18, H = 3: Kp = 3, Pp = ½·18·9·3 = 243 kN/m", () => {
    const r = istinatPasifToprakBasinci.compute({ birimHacimAgirlik_kNm3: 18, yukseklik_m: 3, icSurtunmeAcisi_derece: 30, kohezyon_kPa: 0 });
    expect(r.intermediates.pasif_katsayi_Kp as number).toBeCloseTo(3, 10);
    expect(r.value.pasifKuvvet_kNm).toBeCloseTo(243, 8);
  });
  it("c = 10 kPa: + 2·10·3·√3 = 103,92 → 346,92 kN/m", () => {
    const r = istinatPasifToprakBasinci.compute({ birimHacimAgirlik_kNm3: 18, yukseklik_m: 3, icSurtunmeAcisi_derece: 30, kohezyon_kPa: 10 });
    expect(r.value.pasifKuvvet_kNm).toBeCloseTo(346.92, 2);
  });
  it("φ = 0 → Kp = 1, yalnız ½γH² + 2cH", () => {
    const r = istinatPasifToprakBasinci.compute({ birimHacimAgirlik_kNm3: 18, yukseklik_m: 2, icSurtunmeAcisi_derece: 0, kohezyon_kPa: 25 });
    expect(r.value.pasifKuvvet_kNm).toBeCloseTo(0.5 * 18 * 4 + 2 * 25 * 2, 8);
  });
});
