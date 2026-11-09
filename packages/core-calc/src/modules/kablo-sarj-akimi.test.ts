import { describe, it, expect } from "vitest";
import { kabloSarjAkimi } from "./kablo-sarj-akimi";

describe("Kablo Kapasitif Şarj Akımı", () => {
  it("20 kV, 250 nF/km, 10 km, 50 Hz: C = 2,5 µF, Ic = 9,069 A, Qc = 314,16 kVAr", () => {
    const r = kabloSarjAkimi.compute({ kapasitans_nFkm: 250, uzunluk_km: 10, hatGerilimi_kV: 20, frekans_Hz: 50 });
    expect(r.intermediates.toplam_kapasitans_uF as number).toBeCloseTo(2.5, 8);
    expect(r.value.sarjAkimi_A).toBeCloseTo(9.069, 2);
    expect(r.intermediates.sarj_gucu_kVAr as number).toBeCloseTo(314.16, 1);
  });
  it("Qc = √3·U·Ic tutarlılığı", () => {
    const r = kabloSarjAkimi.compute({ kapasitans_nFkm: 300, uzunluk_km: 4, hatGerilimi_kV: 34.5, frekans_Hz: 50 });
    expect(r.intermediates.sarj_gucu_kVAr as number).toBeCloseTo((Math.sqrt(3) * 34.5 * r.value.sarjAkimi_A), 6);
  });
});
