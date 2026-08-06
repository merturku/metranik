import { describe, expect, it } from "vitest";
import { isitmaYakitTuketimiMaliyeti } from "./isitma-yakit-tuketimi-maliyeti";

describe("isitma-yakit-tuketimi-maliyeti", () => {
  it("ısı ihtiyacı=9270kWh, alt ısıl değer=10.3kWh/m³, verim=0.9, fiyat=15TL/m³ → 1000m³, 15000TL", () => {
    const r = isitmaYakitTuketimiMaliyeti.compute({
      yillikIsiIhtiyaci_kWh: 9270,
      yakitAltIsilDegeri_kWh_birim: 10.3,
      kazanVerimi: 0.9,
      yakitBirimFiyati_TL_birim: 15,
    });

    expect(r.intermediates.yillikYakitTuketimi_birim).toBeCloseTo(1000, 5);
    expect(r.value.yillikMaliyet_TL).toBeCloseTo(15000, 5);
  });
});
