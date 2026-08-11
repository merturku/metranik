import { describe, expect, it } from "vitest";
import { isiPompasiYillikIsletmeMaliyeti } from "./isi-pompasi-yillik-isletme-maliyeti";

describe("isi-pompasi-yillik-isletme-maliyeti", () => {
  it("yıllık ısı ihtiyacı=9000kWh, SPF=3.0, fiyat=3TL/kWh → 3000kWh, 9000TL", () => {
    const r = isiPompasiYillikIsletmeMaliyeti.compute({
      yillikIsiIhtiyaci_kWh: 9000,
      spf: 3.0,
      birimFiyat_TLkWh: 3,
    });

    expect(r.intermediates.yillikTuketim_kWh).toBeCloseTo(3000, 5);
    expect(r.value.yillikMaliyet_TL).toBeCloseTo(9000, 5);
  });
});
