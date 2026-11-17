import { describe, it, expect } from "vitest";
import { asansorMotorGucu } from "./asansor-motor-gucu";

describe("Asansör Motor Gücü", () => {
  it("630 kg, 1 m/s, φ 0,5, η 0,6: dengesizlik 315 kg; mekanik 3,09015 kW; motor 5,15025 kW", () => {
    const r = asansorMotorGucu.compute({ q_kg: 630, v_ms: 1, phi: 0.5, eta: 0.6 });
    expect(r.intermediates.dengesizlik_kg as number).toBeCloseTo(315, 10);
    expect(r.intermediates.mekanik_guc_kW as number).toBeCloseTo(3.09015, 5);
    expect(r.value.motorGucu_kW).toBeCloseTo(5.15025, 5);
  });
  it("hız iki katı → güç iki kat; φ = 1 (tam dengeli) → 0", () => {
    const a = asansorMotorGucu.compute({ q_kg: 630, v_ms: 1, phi: 0.5, eta: 0.6 }).value.motorGucu_kW;
    expect(asansorMotorGucu.compute({ q_kg: 630, v_ms: 2, phi: 0.5, eta: 0.6 }).value.motorGucu_kW / a).toBeCloseTo(2, 10);
    expect(asansorMotorGucu.compute({ q_kg: 630, v_ms: 1, phi: 1, eta: 0.6 }).value.motorGucu_kW).toBeCloseTo(0, 10);
  });
});
