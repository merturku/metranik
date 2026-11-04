import { describe, it, expect } from "vitest";
import { evBeklemeTuketimiMaliyeti } from "./ev-bekleme-tuketimi-maliyeti";

describe("Bekleme Tüketimi Maliyeti", () => {
  it("5 W × 1 cihaz × 24 h → 43,8 kWh/yıl; 3 ₺/kWh → 131,4 ₺", () => {
    const r = evBeklemeTuketimiMaliyeti.compute({ beklemeGucu_W: 5, cihazSayisi: 1, gunlukBeklemeSaati: 24, birimFiyat_TLkWh: 3 });
    expect(r.intermediates.yillik_enerji_kWh as number).toBeCloseTo(43.8, 6);
    expect(r.value.yillikMaliyet_TL).toBeCloseTo(131.4, 6);
  });
  it("10 cihaz × 3 W × 20 h → 219 kWh", () => {
    const r = evBeklemeTuketimiMaliyeti.compute({ beklemeGucu_W: 3, cihazSayisi: 10, gunlukBeklemeSaati: 20, birimFiyat_TLkWh: 2 });
    expect(r.intermediates.yillik_enerji_kWh as number).toBeCloseTo(219, 6);
  });
});
