import { describe, it, expect } from "vitest";
import { fanMilGucu } from "./fan-mil-gucu";

describe("Fan Mil Gücü", () => {
  it("ASHRAE: 1 m³/s, 500 Pa, η=75% → P_hid=0.5 kW, P_mil=0.667 kW", () => {
    const r = fanMilGucu.compute({
      debi_m3s: 1,
      basinc_pa: 500,
      verim_yuzde: 75,
    });

    expect(r.value.hidrolik_guc_kW).toBeCloseTo(0.5, 2);
    expect(r.value.mil_gucu_kW).toBeCloseTo(0.667, 2);
  });

  it("2 m³/s, 1000 Pa, η=80% → P_hid=2 kW, P_mil=2.5 kW", () => {
    const r = fanMilGucu.compute({
      debi_m3s: 2,
      basinc_pa: 1000,
      verim_yuzde: 80,
    });

    expect(r.value.hidrolik_guc_kW).toBeCloseTo(2, 2);
    expect(r.value.mil_gucu_kW).toBeCloseTo(2.5, 2);
  });
});
