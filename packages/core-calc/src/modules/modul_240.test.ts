import { describe, it, expect } from "vitest";
import { modul_240 } from "./modul_240";

describe("Boru Yüzey Alanı", () => {
  it("ISO 4413: D=50mm, L=100m → A≈15.7 m²", () => {
    const r = modul_240.compute({
      cap_mm: 50,
      uzunluk_m: 100,
      yuzey_pürüzlülük_mm: 0.045,
    });
    expect(r.value.yuzey_alani_m2).toBeCloseTo(15.7, 1);
  });
});
