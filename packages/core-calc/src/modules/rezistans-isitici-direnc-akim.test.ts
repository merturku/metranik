import { describe, it, expect } from "vitest";
import { rezistansIsiticiDirencAkim } from "./rezistans-isitici-direnc-akim";

describe("Rezistans Isıtıcı (Y/Δ)", () => {
  it("9 kW, 400 V yıldız: Uf = 230,94 V, Pe = 3000 W, R = 17,78 Ω, I = 12,99 A", () => {
    const r = rezistansIsiticiDirencAkim.compute({ toplamGuc_kW: 9, hatGerilimi_V: 400, baglanti: "yildiz" });
    expect(r.intermediates.eleman_gerilimi_V as number).toBeCloseTo(230.94, 2);
    expect(r.value.elemanDirenci_ohm).toBeCloseTo(17.778, 3);
    expect(r.intermediates.hat_akimi_A as number).toBeCloseTo(12.99, 2);
  });
  it("üçgen: R = 400²/3000 = 53,33 Ω (yıldızın 3 katı); eleman akımı 7,5 A; hat akımı aynı", () => {
    const y = rezistansIsiticiDirencAkim.compute({ toplamGuc_kW: 9, hatGerilimi_V: 400, baglanti: "yildiz" });
    const d = rezistansIsiticiDirencAkim.compute({ toplamGuc_kW: 9, hatGerilimi_V: 400, baglanti: "ucgen" });
    expect(d.value.elemanDirenci_ohm).toBeCloseTo(53.333, 3);
    expect(d.value.elemanDirenci_ohm / y.value.elemanDirenci_ohm).toBeCloseTo(3, 8);
    expect(d.intermediates.eleman_akimi_A as number).toBeCloseTo(7.5, 8);
    expect(d.intermediates.hat_akimi_A as number).toBeCloseTo(y.intermediates.hat_akimi_A as number, 10);
  });
  it("aynı elemanlar Y → Δ geçince güç 3 katı", () => {
    expect(rezistansIsiticiDirencAkim.compute({ toplamGuc_kW: 9, hatGerilimi_V: 400, baglanti: "yildiz" }).intermediates.diger_baglantida_guc_kW).toBe(27);
  });
});
