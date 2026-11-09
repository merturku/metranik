import { describe, it, expect } from "vitest";
import { istinatCoulombAktifBasinc } from "./istinat-coulomb-aktif-basinc";

const g = { birimHacimAgirlik_kNm3: 18, yukseklik_m: 4, icSurtunmeAcisi_derece: 30, duvarSurtunmeAcisi_derece: 20, duvarEgimi_derece: 0, yuzeyEgimi_derece: 0 };

describe("Coulomb Aktif Toprak Basıncı", () => {
  it("φ = 30°, δ = 20°, θ = β = 0: Ka = 0,2973; Pa = ½·18·16·0,2973 = 42,81 kN/m", () => {
    const r = istinatCoulombAktifBasinc.compute(g);
    expect(r.intermediates.aktif_katsayi_Ka as number).toBeCloseTo(0.2973, 3);
    expect(r.value.aktifKuvvet_kNm).toBeCloseTo(42.81, 1);
  });
  it("δ = θ = β = 0 → Rankine Ka = 1/3 (tan²(45° − φ/2))", () => {
    const r = istinatCoulombAktifBasinc.compute({ ...g, duvarSurtunmeAcisi_derece: 0 });
    expect(r.intermediates.aktif_katsayi_Ka as number).toBeCloseTo(1 / 3, 8);
    expect(r.intermediates.aktif_katsayi_Ka as number).toBeCloseTo(r.intermediates.rankine_Ka_karsilastirma as number, 8);
  });
  it("duvar sürtünmesi basıncı azaltır; β ≥ φ geçersiz", () => {
    expect(istinatCoulombAktifBasinc.compute(g).value.aktifKuvvet_kNm).toBeLessThan(0.5 * 18 * 16 / 3);
    expect(istinatCoulombAktifBasinc.compute({ ...g, yuzeyEgimi_derece: 30 }).verdict?.status).toBe("uygunsuz");
  });
});
