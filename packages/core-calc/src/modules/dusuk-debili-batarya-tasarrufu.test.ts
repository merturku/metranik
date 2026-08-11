import { describe, expect, it } from "vitest";
import { dusukDebiliBataryaTasarrufu } from "./dusuk-debili-batarya-tasarrufu";

describe("dusuk-debili-batarya-tasarrufu", () => {
  it("eski=12L/dk, yeni=8L/dk, 10dk/gün, 350 gün, 45TL/m³ → 14 m³, 630 TL", () => {
    const r = dusukDebiliBataryaTasarrufu.compute({
      eskiDebi_L_dk: 12,
      yeniDebi_L_dk: 8,
      gunlukKullanimSuresi_dk: 10,
      yillikGunSayisi: 350,
      birimFiyat_TLm3: 45,
    });

    expect(r.intermediates.debiFarki_L_dk).toBeCloseTo(4, 5);
    expect(r.intermediates.yillikSuTasarrufu_m3).toBeCloseTo(14, 5);
    expect(r.value.yillikTasarruf_TL).toBeCloseTo(630, 5);
  });
});
