import { describe, it, expect } from "vitest";
import { motorAkimYoğunlugu } from "./motor-akim-yoğunlugu";

describe("Motor Akım Yoğunluğu", () => {
  it("11 kW, 400 V, η = %87, cosφ = 0,87: I = 11000/0,87 / (√3×400×0,87) = 20,98 A; 4 mm² → 5,24 A/mm²", () => {
    const r = motorAkimYoğunlugu.compute({
      guc_kW: 11,
      voltaj_V: 400,
      verim_yuzde: 87,
      kosinus_phi: 0.87,
      kesit_mm2: 4,
    });

    expect(r.intermediates.giris_gucu_kW).toBeCloseTo(12.644, 3);
    expect(r.value.akım_A).toBeCloseTo(20.98, 2);
    expect(r.value.akım_yoğunluğu_Amm2).toBeCloseTo(5.244, 3);
  });
});
