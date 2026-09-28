import { describe, it, expect } from "vitest";
import { modul_242 } from "./modul_242";

describe("Fan Mil Gücü", () => {
  it("ASHRAE: 1500 rpm, 50mm çap, 500 Pa, η=75%", () => {
    const r = modul_242.compute({
      devir_rpm: 1500,
      cap_mm: 50,
      basinc_Pa: 500,
      verim_yuzde: 75,
    });
    expect(r.value.mil_gucu_kW).toBeGreaterThan(0);
  });
});
