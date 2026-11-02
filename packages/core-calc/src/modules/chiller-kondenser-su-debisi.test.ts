import { describe, it, expect } from "vitest";
import { chillerKondenserSuDebisi } from "./chiller-kondenser-su-debisi";

describe("Chiller Kondenser Su Debisi", () => {
  it("500 kW, COP 5 → W 100, Q_cond 600 kW; ΔT 5 K → 28,67 L/s = 103,2 m³/h", () => {
    const r = chillerKondenserSuDebisi.compute({ sogutmaKapasitesi_kW: 500, sogutmaCOP: 5, kondenserSuDeltaT_K: 5 });
    expect(r.intermediates.kondenser_isisi_kW).toBeCloseTo(600, 9);
    expect(r.intermediates.su_debisi_Ls as number).toBeCloseTo(28.668, 2);
    expect(r.value.kondenserSuDebisi_m3h).toBeCloseTo(103.2, 1);
  });
  it("kondenser ısısı her zaman evaporatör kapasitesinden büyük", () => {
    expect(chillerKondenserSuDebisi.compute({ sogutmaKapasitesi_kW: 100, sogutmaCOP: 6, kondenserSuDeltaT_K: 5 }).intermediates.kondenser_isisi_kW as number).toBeGreaterThan(100);
  });
});
