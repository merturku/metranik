import { describe, expect, it } from "vitest";
import { yagmurSuyuHasatTanki } from "./yagmur-suyu-hasat-tanki";

describe("yagmur-suyu-hasat-tanki", () => {
  it("çatı alanı=120m², yağış=50mm, akış katsayısı=0.85 → 5100 L", () => {
    const r = yagmurSuyuHasatTanki.compute({
      catiAlani_m2: 120,
      yagisMiktari_mm: 50,
      akisKatsayisi: 0.85,
    });

    expect(r.intermediates.teorikHacim_L).toBeCloseTo(6000, 5);
    expect(r.value.hasatHacmi_L).toBeCloseTo(5100, 5);
  });
});
