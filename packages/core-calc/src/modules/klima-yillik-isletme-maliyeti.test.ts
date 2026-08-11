import { describe, expect, it } from "vitest";
import { klimaYillikIsletmeMaliyeti } from "./klima-yillik-isletme-maliyeti";

describe("klima-yillik-isletme-maliyeti", () => {
  it("kapasite=3.2kW, COP=3.2, 6 saat/gün, 100 gün, 3TL/kWh → 600kWh, 1800TL", () => {
    const r = klimaYillikIsletmeMaliyeti.compute({
      kapasite_kW: 3.2,
      cop: 3.2,
      gunlukCalismaSuresi_saat: 6,
      yillikCalismaGunSayisi: 100,
      birimFiyat_TLkWh: 3,
    });

    expect(r.intermediates.elektrikGucu_kW).toBeCloseTo(1, 5);
    expect(r.intermediates.yillikTuketim_kWh).toBeCloseTo(600, 5);
    expect(r.value.yillikMaliyet_TL).toBeCloseTo(1800, 5);
  });
});
