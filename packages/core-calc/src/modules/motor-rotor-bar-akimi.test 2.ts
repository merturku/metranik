import { describe, it, expect } from "vitest";
import { motorRotorBarAkimi } from "./motor-rotor-bar-akimi";

describe("Motor Rotor Bar Akımı", () => {
  it("11 kW, %91 verim, 2 kutup → ~17.3 A", () => {
    const r = motorRotorBarAkimi.compute({ guc_kW: 11, verim_yuzde: 91, kutup_sayisi: 2 });
    expect(r.value.rotor_bar_akimi_A).toBeGreaterThan(15);
  });
});
