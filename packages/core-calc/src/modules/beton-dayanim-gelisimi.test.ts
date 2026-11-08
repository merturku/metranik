import { describe, it, expect } from "vitest";
import { betonDayanimGelisimi } from "./beton-dayanim-gelisimi";

const g = { fck_MPa: 25, yas_gun: 7, cimento: "normal" as const, hedefDayanim_MPa: 15 };

describe("Beton Dayanım Gelişimi", () => {
  it("C25, 7 gün, s = 0,25: βcc = e^−0,25 = 0,7788; fcm(t) = 25,70; fck(t) = 17,70 MPa", () => {
    const r = betonDayanimGelisimi.compute(g);
    expect(r.intermediates.beta_cc as number).toBeCloseTo(0.7788, 4);
    expect(r.intermediates.fcm_t_MPa as number).toBeCloseTo(25.7, 1);
    expect(r.value.fckT_MPa).toBeCloseTo(17.7, 1);
  });
  it("28 günde βcc = 1, fck(t) = fck", () => {
    const r = betonDayanimGelisimi.compute({ ...g, yas_gun: 28 });
    expect(r.intermediates.beta_cc as number).toBeCloseTo(1, 10);
    expect(r.value.fckT_MPa).toBe(25);
  });
  it("hedef 15 MPa için gün ≈ 4,69 ve o günde fck(t) = 15 (geri hesap)", () => {
    const r = betonDayanimGelisimi.compute(g);
    const t = r.intermediates.hedefe_ulasma_gunu as number;
    expect(t).toBeCloseTo(4.685, 2);
    expect(betonDayanimGelisimi.compute({ ...g, yas_gun: Math.max(t, 3) }).value.fckT_MPa).toBeCloseTo(15, 6);
  });
});
