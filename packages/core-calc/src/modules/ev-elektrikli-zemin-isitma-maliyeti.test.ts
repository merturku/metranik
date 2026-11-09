import { describe, it, expect } from "vitest";
import { evElektrikliZeminIsitmaMaliyeti } from "./ev-elektrikli-zemin-isitma-maliyeti";

describe("Elektrikli Yerden Isıtma Maliyeti", () => {
  it("120 W/m² × 10 m² = 1,2 kW; 6 h × %100 → 7,2 kWh/gün; 30 gün 216 kWh; 3 ₺/kWh → 648 ₺", () => {
    const r = evElektrikliZeminIsitmaMaliyeti.compute({ guc_yogunlugu_Wm2: 120, alan_m2: 10, gunlukSaat_h: 6, calismaOrani: 1, aylikGun: 30, birimFiyat_TLkWh: 3 });
    expect(r.intermediates.kurulu_guc_kW as number).toBeCloseTo(1.2, 8);
    expect(r.intermediates.aylik_enerji_kWh as number).toBeCloseTo(216, 6);
    expect(r.value.aylikMaliyet_TL).toBeCloseTo(648, 6);
    expect(r.intermediates.faz_basina_akim_A_230V as number).toBeCloseTo(5.217, 3);
  });
  it("termostat çalışma oranı %50 → maliyet yarıya iner", () => {
    const r = evElektrikliZeminIsitmaMaliyeti.compute({ guc_yogunlugu_Wm2: 120, alan_m2: 10, gunlukSaat_h: 6, calismaOrani: 0.5, aylikGun: 30, birimFiyat_TLkWh: 3 });
    expect(r.value.aylikMaliyet_TL).toBeCloseTo(324, 6);
  });
});
