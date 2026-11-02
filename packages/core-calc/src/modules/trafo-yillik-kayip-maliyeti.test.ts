import { describe, it, expect } from "vitest";
import { trafoYillikKayipMaliyeti } from "./trafo-yillik-kayip-maliyeti";

describe("Trafo Yıllık Kayıp", () => {
  const o = { bostaKaybi_kW: 1.1, yukKaybi_kW: 7.5, yuklenmeOrani: 0.6, yillikSaat: 8760, elektrikFiyati_TLkWh: 3 };
  it("P0 1,1 + 0,36·7,5 = 3,8 kW × 8760 = 33 288 kWh; 99 864 ₺", () => {
    const r = trafoYillikKayipMaliyeti.compute(o);
    expect(r.intermediates.ortalama_kayip_kW as number).toBeCloseTo(3.8, 9);
    expect(r.value.yillikKayip_kWh).toBeCloseTo(33288, 6);
    expect(r.intermediates.yillik_maliyet_TL as number).toBeCloseTo(99864, 4);
  });
  it("yüklenme √(P0/Pk) = 0,383 iken boşta ve yük kayıpları eşit", () => {
    const b = trafoYillikKayipMaliyeti.compute(o).intermediates.esit_kayip_yuklenme_orani as number;
    const r = trafoYillikKayipMaliyeti.compute({ ...o, yuklenmeOrani: b });
    expect(r.intermediates.bosta_kaybi_kWh as number).toBeCloseTo(r.intermediates.yuk_kaybi_kWh as number, 6);
  });
});
