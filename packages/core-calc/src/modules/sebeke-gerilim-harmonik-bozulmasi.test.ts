import { describe, it, expect } from "vitest";
import { sebekeGerilimHarmonikBozulmasi } from "./sebeke-gerilim-harmonik-bozulmasi";

describe("Şebeke THDv", () => {
  const o = { hatGerilimi_V: 400, kisaDevreGucu_MVA: 10, akim5_A: 100, akim7_A: 0, akim11_A: 0, akim13_A: 0 };
  it("Zsc = 0,016 Ω; I5 = 100 A → V5 = √3·100·5·0,016/400 = %3,46", () => {
    const r = sebekeGerilimHarmonikBozulmasi.compute(o);
    expect(r.intermediates.Zsc_ohm as number).toBeCloseTo(0.016, 9);
    expect(r.value.thdv_yuzde).toBeCloseTo(3.464, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("5. 100 A + 7. 50 A → √(3,464² + 2,425²) = %4,23", () => {
    expect(sebekeGerilimHarmonikBozulmasi.compute({ ...o, akim7_A: 50 }).value.thdv_yuzde).toBeCloseTo(4.229, 2);
  });
  it("zayıf şebeke (1 MVA): %34,6 → uygunsuz; şebeke gücü 10 kat artınca bozulma 10 kat azalır", () => {
    const zayif = sebekeGerilimHarmonikBozulmasi.compute({ ...o, kisaDevreGucu_MVA: 1 });
    expect(zayif.verdict?.status).toBe("uygunsuz");
    expect(zayif.value.thdv_yuzde / sebekeGerilimHarmonikBozulmasi.compute(o).value.thdv_yuzde).toBeCloseTo(10, 9);
  });
});
