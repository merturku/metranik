import { describe, it, expect } from "vitest";
import { fanGucu } from "./fan-gucu";

describe("Fan Gücü", () => {
  it("ASHRAE: Q=1 m³/s, ΔP=500 Pa, η=70% → P_hidrolik=0.5 kW, P_motor≈0.71 kW", () => {
    const r = fanGucu.compute({
      volumetrik_debi_m3s: 1,
      toplam_basinc_Pa: 500,
      verim_yuzde: 70,
    });

    expect(r.value.hidrolik_guç_kW).toBeCloseTo(0.5, 1);
    expect(r.value.motor_gucu_kW).toBeCloseTo(0.71, 1);
  });
});
