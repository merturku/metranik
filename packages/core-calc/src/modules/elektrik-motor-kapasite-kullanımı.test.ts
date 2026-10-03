import { describe, it, expect } from "vitest";
import { elektrikMotorKapasite } from "./elektrik-motor-kapasite-kullanımı";

describe("Motor Kapasite Kullanımı", () => {
  it("7.5 kW istenen, 11 kW motor → 68% (uygun)", () => {
    const r = elektrikMotorKapasite.compute({ guc_istenen_kW: 7.5, motor_nominal_kW: 11 });
    expect(r.value.kullanım_yuzde).toBeCloseTo(68, 0);
    expect(r.verdict?.status).toBe("uygun");
  });
});
