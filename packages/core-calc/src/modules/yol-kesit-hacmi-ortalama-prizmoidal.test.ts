import { describe, it, expect } from "vitest";
import { yolKesitHacmiOrtalamaPrizmoidal } from "./yol-kesit-hacmi-ortalama-prizmoidal";

describe("Yol Kesit Hacmi", () => {
  it("L 20, A1 30, A2 50, Am 42: ortalama 800 m³; prizmoidal 826,67 m³; fark −26,67 (%−3,2)", () => {
    const r = yolKesitHacmiOrtalamaPrizmoidal.compute({ L_m: 20, a1_m2: 30, a2_m2: 50, am_m2: 42 });
    expect(r.intermediates.ortalama_alan_hacmi_m3 as number).toBeCloseTo(800, 8);
    expect(r.value.prizmoidalHacim_m3).toBeCloseTo(826.6667, 3);
    expect(r.intermediates.fark_m3 as number).toBeCloseTo(-26.6667, 3);
    expect(r.intermediates.fark_pct as number).toBeCloseTo(-3.2258, 3);
  });
  it("doğrusal değişimde (Am = (A1+A2)/2) iki yöntem aynı; prizma (A sabit) = L·A", () => {
    const r = yolKesitHacmiOrtalamaPrizmoidal.compute({ L_m: 20, a1_m2: 30, a2_m2: 50, am_m2: 40 });
    expect(r.value.prizmoidalHacim_m3).toBeCloseTo(r.intermediates.ortalama_alan_hacmi_m3 as number, 8);
    expect(yolKesitHacmiOrtalamaPrizmoidal.compute({ L_m: 10, a1_m2: 12, a2_m2: 12, am_m2: 12 }).value.prizmoidalHacim_m3).toBeCloseTo(120, 8);
  });
});
