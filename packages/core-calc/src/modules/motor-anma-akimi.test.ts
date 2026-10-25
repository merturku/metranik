import { describe, it, expect } from "vitest";
import { motorAnmaAkimi } from "./motor-anma-akimi";

describe("Motor Anma Akımı", () => {
  it("11 kW, 400 V, η = %87, cosφ = 0,87: Pgiriş = 12,644 kW, S = 14,533 kVA, I = 20,98 A", () => {
    const r = motorAnmaAkimi.compute({
      milGucu_kW: 11,
      gerilim_V: 400,
      verim_yuzde: 87,
      gucFaktoru_cosfi: 0.87,
    });

    expect(r.intermediates.giris_gucu_kW).toBeCloseTo(12.644, 3);
    expect(r.intermediates.gorunur_guc_kVA).toBeCloseTo(14.533, 3);
    expect(r.value.anmaAkimi_A).toBeCloseTo(20.98, 2);
  });
});
