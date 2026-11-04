import { describe, it, expect } from "vitest";
import { kabloStandartKesitSecimi } from "./kablo-standart-kesit-secimi";

describe("Kablo Standart Kesit Seçimi", () => {
  it("42 mm² → 50 mm²; bir alt 35", () => {
    const r = kabloStandartKesitSecimi.compute({ hesaplananKesit_mm2: 42 });
    expect(r.value.standartKesit_mm2).toBe(50);
    expect(r.intermediates.bir_alt_standart_kesit_mm2).toBe(35);
  });
  it("tam standart değer aynen kalır: 50 → 50 (pay %0)", () => {
    const r = kabloStandartKesitSecimi.compute({ hesaplananKesit_mm2: 50 });
    expect(r.value.standartKesit_mm2).toBe(50);
    expect(r.intermediates.pay_yuzde as number).toBeCloseTo(0, 9);
  });
  it("0,3 → 1,5 ; 700 → null + uygunsuz", () => {
    expect(kabloStandartKesitSecimi.compute({ hesaplananKesit_mm2: 0.3 }).value.standartKesit_mm2).toBe(1.5);
    const r = kabloStandartKesitSecimi.compute({ hesaplananKesit_mm2: 700 });
    expect(r.value.standartKesit_mm2).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
