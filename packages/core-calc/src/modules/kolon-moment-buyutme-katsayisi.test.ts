import { describe, it, expect } from "vitest";
import { kolonMomentBuyutmeKatsayisi } from "./kolon-moment-buyutme-katsayisi";

const g = { pu_kN: 1500, ec_MPa: 30000, b_mm: 400, h_mm: 400, betaDns: 0.6, k: 1, lu_m: 3.5, cm: 1 };

describe("Kolon Moment Büyütme", () => {
  it("400×400, Ec 30 GPa, βdns 0,6, lu 3,5 m: (EI)eff = 1,6e13 N·mm², Pc = 12 890,9 kN, δns = 1,1836", () => {
    const r = kolonMomentBuyutmeKatsayisi.compute(g);
    expect(r.intermediates.EI_eff_kNm2 as number).toBeCloseTo(16000, 6);
    expect(r.intermediates.Pc_kN as number).toBeCloseTo(12890.91, 1);
    expect(r.value.delta_ns as number).toBeCloseTo(1.18364, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("Pu = 0 → δns = 1 (Cm = 1); Pu ≥ 0,75Pc → null + uygunsuz", () => {
    expect(kolonMomentBuyutmeKatsayisi.compute({ ...g, pu_kN: 0 }).value.delta_ns as number).toBeCloseTo(1, 10);
    const r = kolonMomentBuyutmeKatsayisi.compute({ ...g, pu_kN: 9700 });
    expect(r.value.delta_ns).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
