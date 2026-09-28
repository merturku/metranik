import { describe, it, expect } from "vitest";
import { pompaGirdisiGuc } from "./pompa-girdisi-guc";

describe("Pompa Giriş Gücü", () => {
  it("ISO 9906: 3.6 m³/h (0.001 m³/s), 100 kPa, η=70% → P_teo=0.1 kW, P_gir≈0.143 kW", () => {
    const r = pompaGirdisiGuc.compute({
      debi_m3h: 3.6,
      basınç_kPa: 100,
      verim_yuzde: 70,
    });

    expect(r.value.teorik_guc_kW).toBeCloseTo(0.1, 2);
    expect(r.value.girdisi_guc_kW).toBeCloseTo(0.143, 2);
  });

  it("7.2 m³/h, 200 kPa, η=75% → P_teo=0.4 kW, P_gir≈0.533 kW", () => {
    const r = pompaGirdisiGuc.compute({
      debi_m3h: 7.2,
      basınç_kPa: 200,
      verim_yuzde: 75,
    });

    expect(r.value.teorik_guc_kW).toBeCloseTo(0.4, 2);
    expect(r.value.girdisi_guc_kW).toBeCloseTo(0.533, 2);
  });
});
