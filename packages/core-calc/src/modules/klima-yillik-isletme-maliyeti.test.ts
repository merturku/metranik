import { describe, it, expect } from "vitest";
import { klimaYillikIsletmeMaliyeti } from "./klima-yillik-isletme-maliyeti";

describe("Klima Yıllık İşletme Maliyeti", () => {
  it("5 kW klima, 3000 saat/yıl, COP=3.5, 3 TL/kWh → 4286 kWh, 12857 TL", () => {
    const r = klimaYillikIsletmeMaliyeti.compute({
      kapasite_kW: 5,
      saat_yillik: 3000,
      COP: 3.5,
      fiyat_kwh: 3,
    });

    expect(r.value.yillik_tüketim_kWh).toBeCloseTo(4286, 0);
    expect(r.value.yillik_maliyet_TL).toBeCloseTo(12857, 0);
  });
});
