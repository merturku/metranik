import { describe, expect, it } from "vitest";
import { yagmurSuyuDebisi } from "./yagmur-suyu-debisi";

describe("yagmur-suyu-debisi", () => {
  it("C=0.9, I=100mm/h, A=0.05ha → 12.501 L/s", () => {
    const r = yagmurSuyuDebisi.compute({
      akisKatsayisi_C: 0.9,
      yagisSiddeti_I_mmh: 100,
      alan_A_ha: 0.05,
    });

    expect(r.value.debi_Ls).toBeCloseTo(12.501, 3);
  });
});
