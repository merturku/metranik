import { describe, it, expect } from "vitest";
import { suSertligiBirimDonusumu } from "./su-sertligi-birim-donusumu";

describe("Su Sertliği Birim Dönüşümü", () => {
  it("20 °dH → 357 ppm, 35,7 °fH, çok sert", () => {
    const r = suSertligiBirimDonusumu.compute({ deger: 20, birim: "dH" });
    expect(r.value.ppm_CaCO3).toBeCloseTo(356.96, 2);
    expect(r.intermediates.fransiz_fH as number).toBeCloseTo(35.7, 1);
    expect(r.intermediates.sinif).toBe("Çok sert");
  });
  it("1 mmol/L = 100,09 ppm ≈ 10 °fH ≈ 5,6 °dH; 30 ppm yumuşak", () => {
    const r = suSertligiBirimDonusumu.compute({ deger: 1, birim: "mmol" });
    expect(r.intermediates.alman_dH as number).toBeCloseTo(5.61, 2);
    expect(suSertligiBirimDonusumu.compute({ deger: 30, birim: "ppm" }).intermediates.sinif).toBe("Yumuşak");
  });
});
