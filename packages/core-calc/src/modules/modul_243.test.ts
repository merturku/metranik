import { describe, it, expect } from "vitest";
import { modul_243 } from "./modul_243";

describe("Transformatör Kaybı", () => {
  it("IEC 60076: Pınak=500W, Pyük=1000W, 100kVA → %98.5 verim", () => {
    const r = modul_243.compute({
      zarar_ınak_W: 500,
      zarar_yuk_W: 1000,
      guc_kVA: 100,
    });
    expect(r.value.verim_yuzde).toBeCloseTo(98.5, 1);
  });
});
