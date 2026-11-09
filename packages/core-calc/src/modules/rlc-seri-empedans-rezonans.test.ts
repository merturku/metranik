import { describe, it, expect } from "vitest";
import { rlcSeriEmpedansRezonans } from "./rlc-seri-empedans-rezonans";

describe("Seri RLC Empedansı", () => {
  it("R=10, L=100 mH, C=100 µF, 50 Hz: XL=31,416, XC=31,831, Z=10,0086, f0=50,33 Hz", () => {
    const r = rlcSeriEmpedansRezonans.compute({ direnc_ohm: 10, enduktans_mH: 100, kapasitans_uF: 100, frekans_Hz: 50, gerilim_V: 230 });
    expect(r.intermediates.enduktif_reaktans_ohm as number).toBeCloseTo(31.416, 3);
    expect(r.intermediates.kapasitif_reaktans_ohm as number).toBeCloseTo(31.831, 3);
    expect(r.value.empedans_ohm).toBeCloseTo(10.0086, 3);
    expect(r.intermediates.rezonans_frekansi_Hz as number).toBeCloseTo(50.329, 2);
    expect(r.intermediates.karakter).toBe("Kapasitif");
  });
  it("rezonans frekansında Z = R, I = V/R, φ = 0", () => {
    const f0 = 1 / (2 * Math.PI * Math.sqrt(0.1 * 100e-6));
    const r = rlcSeriEmpedansRezonans.compute({ direnc_ohm: 10, enduktans_mH: 100, kapasitans_uF: 100, frekans_Hz: f0, gerilim_V: 230 });
    expect(r.value.empedans_ohm).toBeCloseTo(10, 6);
    expect(r.intermediates.akim_A as number).toBeCloseTo(23, 5);
    expect(r.intermediates.faz_acisi_derece as number).toBeCloseTo(0, 5);
  });
  it("Q = √(L/C)/R = √1000/10 = 3,162", () => {
    const r = rlcSeriEmpedansRezonans.compute({ direnc_ohm: 10, enduktans_mH: 100, kapasitans_uF: 100, frekans_Hz: 50, gerilim_V: 230 });
    expect(r.intermediates.kalite_faktoru_Q as number).toBeCloseTo(3.1623, 3);
  });
});
