import { describe, it, expect } from "vitest";
import { motorKalkisSuresi } from "./motor-kalkis-suresi";

describe("Motor Kalkış Süresi", () => {
  it("J 2 kg·m², 1500 dev/dk, T 100 N·m → ω 157,08 rad/s; t = 3,1416 s", () => {
    const r = motorKalkisSuresi.compute({ toplamAtalet_kgm2: 2, devir_rpm: 1500, ortalamaIvmeMomenti_Nm: 100 });
    expect(r.intermediates.acisal_hiz_rad_s as number).toBeCloseTo(157.08, 2);
    expect(r.value.kalkisSuresi_s).toBeCloseTo(3.1416, 3);
  });
  it("kinetik enerji ½Jω² = 24,67 kJ", () => {
    const r = motorKalkisSuresi.compute({ toplamAtalet_kgm2: 2, devir_rpm: 1500, ortalamaIvmeMomenti_Nm: 100 });
    expect(r.intermediates.kinetik_enerji_kJ as number).toBeCloseTo(24.674, 2);
  });
});
