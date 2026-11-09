import { describe, it, expect } from "vitest";
import { standartMotorGucuSecimi } from "./standart-motor-gucu-secimi";

describe("Standart Motor Gücü Seçimi", () => {
  it("7,2 kW × 1,15 = 8,28 kW → 11 kW", () => {
    const r = standartMotorGucuSecimi.compute({ milGucu_kW: 7.2, yedekCarpani: 1.15 });
    expect(r.value.secilenMotor_kW).toBe(11);
    expect(r.intermediates.gerekli_guc_kW as number).toBeCloseTo(8.28, 8);
    expect(r.intermediates.onceki_kademe_kW).toBe(7.5);
  });
  it("tam seri değerinde aynı kademe: 3 kW × 1 → 3 kW", () => {
    expect(standartMotorGucuSecimi.compute({ milGucu_kW: 3, yedekCarpani: 1 }).value.secilenMotor_kW).toBe(3);
  });
  it("seri aşılırsa null + uygunsuz", () => {
    const r = standartMotorGucuSecimi.compute({ milGucu_kW: 300, yedekCarpani: 1.15 });
    expect(r.value.secilenMotor_kW).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
