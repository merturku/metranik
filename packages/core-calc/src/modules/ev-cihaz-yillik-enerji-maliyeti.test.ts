import { describe, it, expect } from "vitest";
import { evCihazYillikEnerjiMaliyeti } from "./ev-cihaz-yillik-enerji-maliyeti";

describe("Cihaz Yıllık Enerji Maliyeti", () => {
  it("150 W, 8 h/gün, 365 gün, kf 0,5: 0,6 kWh/gün; 219 kWh/yıl; 3,5 ₺ → 766,5 ₺/yıl", () => {
    const r = evCihazYillikEnerjiMaliyeti.compute({ guc_W: 150, gunlukSaat_h: 8, yilGun: 365, kf: 0.5, fiyat: 3.5 });
    expect(r.intermediates.gunluk_kWh as number).toBeCloseTo(0.6, 10);
    expect(r.value.yillikEnerji_kWh).toBeCloseTo(219, 8);
    expect(r.intermediates.yillik_maliyet as number).toBeCloseTo(766.5, 8);
    expect(r.intermediates.aylik_maliyet as number).toBeCloseTo(63.875, 8);
  });
  it("1 kW sürekli 24 saat 365 gün = 8760 kWh", () => {
    expect(evCihazYillikEnerjiMaliyeti.compute({ guc_W: 1000, gunlukSaat_h: 24, yilGun: 365, kf: 1, fiyat: 0 }).value.yillikEnerji_kWh).toBeCloseTo(8760, 8);
  });
});
