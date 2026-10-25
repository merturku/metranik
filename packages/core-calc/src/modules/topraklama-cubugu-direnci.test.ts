import { describe, it, expect } from "vitest";
import { topraklamaCubuguDirenci, topraklamaCubuguDirenciInputSchema } from "./topraklama-cubugu-direnci";

const cubuk = {
  zeminOzdirenci_ohm_m: 100,
  cubukBoyu_L_m: 3,
  cubukCapi_d_mm: 16,
  hedefDirenc_ohm: 25,
};

describe("Topraklama Çubuğu (Kazık) Yayılma Direnci", () => {
  it("ρ = 100 Ωm, L = 3 m, d = 16 mm: R = 100/(2π×3) × [ln(1500) − 1] = 5,3052 × 6,3132 = 33,49 Ω (pratik kural ρ/L ≈ 33 Ω)", () => {
    const r = topraklamaCubuguDirenci.compute(cubuk);
    expect(r.intermediates.logaritmik_terim).toBeCloseTo(6.31322, 5);
    expect(r.value.yayilmaDirenci_ohm).toBeCloseTo(33.4927, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("25 Ω hedefi için gereken boy ≈ 4,24 m; o boyda direnç hedefe eşit → uygun", () => {
    const r = topraklamaCubuguDirenci.compute(cubuk);
    expect(r.intermediates.hedef_icin_gerekli_boy_m as number).toBeCloseTo(4.2392, 3);
    const uzun = topraklamaCubuguDirenci.compute({ ...cubuk, cubukBoyu_L_m: 4.25 });
    expect(uzun.value.yayilmaDirenci_ohm).toBeLessThan(25);
    expect(uzun.verdict?.status).toBe("uygun");
  });

  it("Direnç özdirençle doğru orantılı: ρ = 1000 Ωm'de 334,9 Ω; 1 Ω hedefi tek çubukla ulaşılamaz", () => {
    const r = topraklamaCubuguDirenci.compute({ ...cubuk, zeminOzdirenci_ohm_m: 1000, hedefDirenc_ohm: 1 });
    expect(r.value.yayilmaDirenci_ohm).toBeCloseTo(334.927, 3);
    expect(typeof r.intermediates.hedef_icin_gerekli_boy_m).toBe("string");
  });

  it("Özdirenç sıfır olamaz", () => {
    expect(topraklamaCubuguDirenciInputSchema.safeParse({ ...cubuk, zeminOzdirenci_ohm_m: 0 }).success).toBe(false);
  });
});
