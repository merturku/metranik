import { describe, it, expect } from "vitest";
import { isiGeriKazanimYillikTasarruf } from "./isi-geri-kazanim-yillik-tasarruf";

describe("Isı Geri Kazanım Yıllık Enerji Tasarrufu", () => {
  it("5000 m³/h, ε 0,6, DG 2500, 24 h → 1675 W/K × 0,6 × 2500 × 24/1000 = 60 300 kWh", () => {
    const r = isiGeriKazanimYillikTasarruf.compute({ debi_m3h: 5000, verim: 0.6, dereceGun_Kgun: 2500, gunlukCalismaSaati: 24 });
    expect(r.intermediates.hava_isil_kapasite_WK as number).toBeCloseTo(1675, 6);
    expect(r.value.yillikTasarruf_kWh).toBeCloseTo(60300, 4);
  });
  it("12 saat/gün çalışma tasarrufu yarıya indirir", () => {
    const r = isiGeriKazanimYillikTasarruf.compute({ debi_m3h: 5000, verim: 0.6, dereceGun_Kgun: 2500, gunlukCalismaSaati: 12 });
    expect(r.value.yillikTasarruf_kWh).toBeCloseTo(30150, 4);
  });
});
