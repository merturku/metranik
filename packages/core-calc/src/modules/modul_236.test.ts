import { describe, it, expect } from "vitest";
import { modul_236 } from "./modul_236";

describe("Motor Nominal Akımı", () => {
  it("IEC 60034-1: 5.5 kW, 400 V, cos φ=0.87 → I≈9.2 A", () => {
    const r = modul_236.compute({
      guc_kW: 5.5,
      voltaj_V: 400,
      kosinus_phi: 0.87,
    });

    expect(r.value.akim_A).toBeCloseTo(9.2, 1);
  });
});
