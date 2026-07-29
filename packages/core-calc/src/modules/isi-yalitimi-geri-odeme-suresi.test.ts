import { describe, expect, it } from "vitest";
import { isiYalitimiGeriOdemeSuresi } from "./isi-yalitimi-geri-odeme-suresi";

describe("isi-yalitimi-geri-odeme-suresi", () => {
  it("yatırım=15000TL, yıllık ısı kaybı azalması=3000kWh, yakıt=2TL/kWh → 2.5 yıl", () => {
    const r = isiYalitimiGeriOdemeSuresi.compute({
      yatirimTutari_TL: 15000,
      yillikIsiKaybiAzalmasi_kWh: 3000,
      yakitFiyati_TL_kWh: 2,
    });

    expect(r.intermediates.yillikTasarruf_TL).toBeCloseTo(6000, 5);
    expect(r.value.geriOdemeSuresi_yil).toBeCloseTo(2.5, 5);
  });
});
