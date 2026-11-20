import { describe, it, expect } from "vitest";
import { fanIsiKazanciHavaSicaklikArtisi } from "./fan-isi-kazanci-hava-sicaklik-artisi";

describe("Fan Isı Kazancı", () => {
  const g = { debi_m3h: 10000, havaYogunlugu_kgm3: 1.2, havaOzgulIsisi_kJkgK: 1.006, milGucu_kW: 5.5, motorVerimi: 0.9, motorKonumu: "hava_akiminda" as const };
  it("10 000 m³/h, 5,5 kW mil, ηm 0,9, motor hava akımında: Q = 6,111 kW; ΔT ≈ 1,82 K", () => {
    const r = fanIsiKazanciHavaSicaklikArtisi.compute(g);
    expect(r.intermediates.havaya_giren_isi_kW as number).toBeCloseTo(5.5 + 5.5 / 9, 8);
    expect(r.value.sicaklikArtisi_K).toBeCloseTo(6.1111 / (3.33333 * 1.006), 3);
    expect(r.value.sicaklikArtisi_K).toBeCloseTo(1.822, 2);
  });
  it("motor hava akımı dışındaysa yalnız mil gücü: ΔT ≈ 1,64 K", () => {
    const r = fanIsiKazanciHavaSicaklikArtisi.compute({ ...g, motorKonumu: "hava_akimi_disinda" });
    expect(r.value.sicaklikArtisi_K).toBeCloseTo(1.640, 2);
  });
  it("debi iki katına çıkınca ΔT yarıya iner", () => {
    const a = fanIsiKazanciHavaSicaklikArtisi.compute(g).value.sicaklikArtisi_K;
    const b = fanIsiKazanciHavaSicaklikArtisi.compute({ ...g, debi_m3h: 20000 }).value.sicaklikArtisi_K;
    expect(a / b).toBeCloseTo(2, 10);
  });
});
