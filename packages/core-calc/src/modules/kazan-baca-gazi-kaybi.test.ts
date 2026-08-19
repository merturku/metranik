import { describe, expect, it } from "vitest";
import { kazanBacaGaziKaybi } from "./kazan-baca-gazi-kaybi";

describe("kazan-baca-gazi-kaybi", () => {
  it("Tgaz=180°C, Tortam=20°C, CO2=%10, A2=0.66, B=0.009 → %12 kayıp, %88 verim", () => {
    const r = kazanBacaGaziKaybi.compute({
      bacaGaziSicakligi_Tgaz_C: 180,
      ortamSicakligi_Tortam_C: 20,
      co2Orani_yuzde: 10,
      siegertKatsayisi_A2: 0.66,
      siegertKatsayisi_B: 0.009,
    });

    expect(r.intermediates.sicaklikFarki_C).toBeCloseTo(160, 5);
    expect(r.intermediates.bacaGaziKaybi_yuzde).toBeCloseTo(12, 5);
    expect(r.value.yanmaVerimi_yuzde).toBeCloseTo(88, 5);
  });
});
