import { describe, it, expect } from "vitest";
import { trapezKanalManningNormalDerinlik } from "./trapez-kanal-manning-normal-derinlik";

describe("Trapez Kanal Normal Derinlik", () => {
  it("y = 1 m için Q = 5,3903 m³/s (A 3,5; P 5,6056; R 0,6244): ters çözüm y = 1,000 m", () => {
    const r = trapezKanalManningNormalDerinlik.compute({ q_m3s: 5.390262662974859, b_m: 2, z: 1.5, n: 0.015, s: 0.001 });
    expect(r.value.normalDerinlik_m).toBeCloseTo(1, 6);
    expect(r.intermediates.alan_m2 as number).toBeCloseTo(3.5, 5);
    expect(r.intermediates.hidrolik_yaricap_m as number).toBeCloseTo(0.62438, 4);
    expect(r.intermediates.hiz_ms as number).toBeCloseTo(1.54008, 4);
    expect(r.intermediates.froude as number).toBeCloseTo(0.5878, 4);
    expect(r.intermediates.rejim).toBe("Alt-kritik (nehir)");
  });
  it("dikdörtgen kanal (z = 0) b = 2, y = 1: Q = (1/0,015)·2·(2/4)^(2/3)·√0,001; derinlik geri bulunur", () => {
    const Q = (1 / 0.015) * 2 * Math.pow(0.5, 2 / 3) * Math.sqrt(0.001);
    const r = trapezKanalManningNormalDerinlik.compute({ q_m3s: Q, b_m: 2, z: 0, n: 0.015, s: 0.001 });
    expect(r.value.normalDerinlik_m).toBeCloseTo(1, 6);
  });
  it("dik eğimde akış üst-kritik", () => {
    const r = trapezKanalManningNormalDerinlik.compute({ q_m3s: 5, b_m: 2, z: 1.5, n: 0.015, s: 0.05 });
    expect(r.intermediates.froude as number).toBeGreaterThan(1);
  });
});
