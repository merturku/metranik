import { describe, it, expect } from "vitest";
import { kabloDuşüşKontrolu } from "./kablo-gerilim-drop-kontrolu";
describe("Kablo Gerilim", () => {
  it("32A, 50m, 10mm² → %1.4 düşüş", () => {
    const r = kabloDuşüşKontrolu.compute({ akım_A: 32, uzunluk_m: 50, kesit_mm2: 10 });
    expect(r.value.U_düşüş_yuzde).toBeGreaterThan(1);
  });
});
