import { describe, expect, it } from "vitest";
import { duvarTuglasiMetraji } from "./duvar-tuglasi-metraji";

describe("duvar-tuglasi-metraji", () => {
  it("tuğla 190×90mm, derz=10mm, duvar=50m², fire=%5 → 2625 adet", () => {
    const r = duvarTuglasiMetraji.compute({
      tuglaUzunlugu_mm: 190,
      tuglaYuksekligi_mm: 90,
      derzKalinligi_mm: 10,
      duvarAlani_m2: 50,
      fireOrani: 0.05,
    });

    expect(r.intermediates.tuglaBirimAlani_m2).toBeCloseTo(0.02, 5);
    expect(r.intermediates.teorikAdet).toBeCloseTo(2500, 5);
    expect(r.value.gerekliTuglaAdedi).toBe(2625);
  });
});
