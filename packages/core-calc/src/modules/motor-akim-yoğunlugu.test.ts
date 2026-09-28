import { describe, it, expect } from "vitest";
import { motorAkimYoğunlugu } from "./motor-akim-yoğunlugu";

describe("Motor Akım Yoğunluğu", () => {
  it("IEC 60034: 11 kW motor, 400 V, η=87%, cos φ=0.87 → I ≈ 18.5 A", () => {
    const r = motorAkimYoğunlugu.compute({
      guc_kW: 11,
      voltaj_V: 400,
      verim_yuzde: 87,
      kosinus_phi: 0.87,
    });

    expect(r.value.akım_A).toBeCloseTo(18.5, 0);
  });
});
