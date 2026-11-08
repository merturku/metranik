import { describe, it, expect } from "vitest";
import { tankBosalmaSuresiTorricelli } from "./tank-bosalma-suresi-torricelli";

const g = { tankKesitAlani_m2: 1, baslangicYuksekligi_m: 2, sonYukseklik_m: 0, cikisCapi_mm: 50, debiKatsayisi_Cd: 0.62 };

describe("Tank Boşalma Süresi (Torricelli)", () => {
  it("A = 1 m², H = 2 m, d = 50 mm, Cd = 0,62: Q0 = 7,63 L/s; t ≈ 524,5 s (8,74 dk)", () => {
    const r = tankBosalmaSuresiTorricelli.compute(g);
    expect(r.intermediates.baslangic_debisi_Ls as number).toBeCloseTo(7.626, 2);
    expect(r.value.bosalmaSuresi_s as number).toBeCloseTo(524.5, 0);
  });
  it("tam boşalma süresi = 2·V/Q0 (başlangıç debisiyle)", () => {
    const r = tankBosalmaSuresiTorricelli.compute(g);
    const t = r.value.bosalmaSuresi_s as number;
    expect(t).toBeCloseTo((2 * (r.intermediates.bosalan_hacim_m3 as number)) / (r.intermediates.baslangic_debisi_m3s as number), 6);
  });
  it("yarı seviyeye kadar boşalma süresi tam boşalmanın (1 − 1/√2) = %29,3'ü; geçersiz seviye null", () => {
    const tam = tankBosalmaSuresiTorricelli.compute(g).value.bosalmaSuresi_s as number;
    const yari = tankBosalmaSuresiTorricelli.compute({ ...g, sonYukseklik_m: 1 }).value.bosalmaSuresi_s as number;
    expect(yari / tam).toBeCloseTo(1 - 1 / Math.sqrt(2), 8);
    expect(tankBosalmaSuresiTorricelli.compute({ ...g, sonYukseklik_m: 2 }).value.bosalmaSuresi_s).toBeNull();
  });
});
