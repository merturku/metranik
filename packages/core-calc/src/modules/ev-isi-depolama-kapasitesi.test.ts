import { describe, it, expect } from "vitest";
import { evIsiDepolamaKapasitesi } from "./ev-isi-depolama-kapasitesi";

describe("Isı Depolama Kapasitesi", () => {
  it("500 L, 60→30 °C: 500·4,186·30/3600 = 17,44 kWh; η = 0,9 → 15,70; 3 kW ile 5,81 saat", () => {
    const r = evIsiDepolamaKapasitesi.compute({ hacim_L: 500, ustSicaklik_C: 60, altSicaklik_C: 30, depoVerimi: 0.9, isiticiGucu_kW: 3 });
    expect(r.intermediates.brut_enerji_kWh as number).toBeCloseTo(17.442, 2);
    expect(r.value.depolananEnerji_kWh).toBeCloseTo(15.698, 2);
    expect(r.intermediates.sarj_suresi_saat as number).toBeCloseTo(5.814, 2);
  });
  it("ΔT ≤ 0 ise enerji 0 ve not", () => {
    const r = evIsiDepolamaKapasitesi.compute({ hacim_L: 100, ustSicaklik_C: 20, altSicaklik_C: 30, depoVerimi: 1, isiticiGucu_kW: 2 });
    expect(r.value.depolananEnerji_kWh).toBe(0);
  });
});
