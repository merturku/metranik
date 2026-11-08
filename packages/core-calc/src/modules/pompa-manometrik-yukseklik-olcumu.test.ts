import { describe, it, expect } from "vitest";
import { pompaManometrikYukseklikOlcumu } from "./pompa-manometrik-yukseklik-olcumu";

describe("Pompa Manometrik Yüksekliği", () => {
  it("5,0 / 0,5 bar, Δz = 0,4 m, v 2,5 / 1,5 m/s, ρ = 1000: 45,872 + 0,4 + 0,2039 = 46,476 m", () => {
    const r = pompaManometrikYukseklikOlcumu.compute({ basmaBasinci_bar: 5, emmeBasinci_bar: 0.5, kotFarki_m: 0.4, basmaHizi_ms: 2.5, emmeHizi_ms: 1.5, yogunluk_kgm3: 1000 });
    expect(r.intermediates.basinc_yuksekligi_m as number).toBeCloseTo(45.872, 2);
    expect(r.intermediates.hiz_yuksekligi_farki_m as number).toBeCloseTo(0.2039, 3);
    expect(r.value.manometrikYukseklik_m).toBeCloseTo(46.476, 2);
  });
  it("emme negatif (vakum) okumasında basınç farkı artar; geri hesap bar farkını verir", () => {
    const r = pompaManometrikYukseklikOlcumu.compute({ basmaBasinci_bar: 4, emmeBasinci_bar: -0.2, kotFarki_m: 0, basmaHizi_ms: 2, emmeHizi_ms: 2, yogunluk_kgm3: 998 });
    expect(r.value.manometrikYukseklik_m).toBeCloseTo((4.2e5) / (998 * 9.81), 6);
    expect(r.intermediates.toplam_basinc_farki_bar as number).toBeCloseTo(4.2, 8);
  });
});
