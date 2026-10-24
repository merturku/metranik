import { describe, it, expect } from "vitest";
import { kabloDuşüşKontrolu } from "./kablo-gerilim-drop-kontrolu";

describe("Kablo Gerilim Düşümü (üç faz, b = 1)", () => {
  it("32 A, 50 m, 10 mm²: R = 0,0175×50/10 = 0,0875 Ω → u = 2,80 V → 2,80/230 = %1,22", () => {
    const r = kabloDuşüşKontrolu.compute({ akım_A: 32, uzunluk_m: 50, kesit_mm2: 10 });
    expect(r.intermediates.iletken_direnci_ohm).toBeCloseTo(0.0875, 6);
    expect(r.value.U_düşüş_V).toBeCloseTo(2.8, 6);
    expect(r.value.U_düşüş_yuzde).toBeCloseTo(1.217, 3);
  });
});
