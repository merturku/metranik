import { describe, it, expect } from "vitest";
import { chillerIplv, chillerIplvInputSchema } from "./chiller-iplv";

// IPLV = 0,01A + 0,42B + 0,45C + 0,12D (AHRI 550/590); A..D = 5,0 / 5,5 / 6,0 / 6,5 COP
// → 0,05 + 2,31 + 2,70 + 0,78 = 5,84.
const ornek = { cop100: 5.0, cop75: 5.5, cop50: 6.0, cop25: 6.5 };

describe("Chiller IPLV", () => {
  it("IPLV = 5,84 COP", () => {
    const r = chillerIplv.compute(ornek);
    expect(r.value.iplv_COP).toBeCloseTo(5.84, 9);
  });

  it("ağırlıklar toplamı 1'dir", () => {
    expect(chillerIplv.compute(ornek).intermediates.agirlik_toplami).toBeCloseTo(1, 12);
  });

  it("tüm yüklerde aynı verim → IPLV o verime eşittir", () => {
    const r = chillerIplv.compute({ cop100: 4, cop75: 4, cop50: 4, cop25: 4 });
    expect(r.value.iplv_COP).toBeCloseTo(4, 12);
  });

  it("dönüşümler: EER = 3,412·COP ve kW/TR = 3,517/COP", () => {
    const r = chillerIplv.compute(ornek);
    expect(r.intermediates.iplv_EER).toBeCloseTo(19.926, 2);
    expect(r.intermediates.iplv_kW_per_TR).toBeCloseTo(0.6022, 3);
  });

  it("sıfır/negatif COP reddedilir", () => {
    expect(chillerIplvInputSchema.safeParse({ ...ornek, cop25: 0 }).success).toBe(false);
  });
});
