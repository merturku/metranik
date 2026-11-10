import { describe, it, expect } from "vitest";
import { boruBoyuncaSicaklikDusumu } from "./boru-boyunca-sicaklik-dusumu";

describe("Boru Boyunca Sıcaklık Düşümü", () => {
  it("80/10 °C, U' = 0,3 W/mK, 200 m, 2 m³/h: x = 0,0258, T = 78,22 °C, Q ≈ 4146 W", () => {
    const r = boruBoyuncaSicaklikDusumu.compute({ girisSicakligi_C: 80, ortamSicakligi_C: 10, boyBasinaGecirgenlik_WmK: 0.3, uzunluk_m: 200, debi_m3h: 2 });
    expect(r.intermediates.ntu_benzeri_us as number).toBeCloseTo(0.0258, 4);
    expect(r.value.cikisSicakligi_C).toBeCloseTo(78.217, 2);
    expect(r.intermediates.isi_kaybi_W as number).toBeCloseTo(4146, -1);
  });
  it("küçük x için lineer yaklaşım: Q ≈ U'·L·(Ti − Ta)", () => {
    const r = boruBoyuncaSicaklikDusumu.compute({ girisSicakligi_C: 80, ortamSicakligi_C: 10, boyBasinaGecirgenlik_WmK: 0.3, uzunluk_m: 200, debi_m3h: 200 });
    expect(r.intermediates.isi_kaybi_W as number / (0.3 * 200 * 70)).toBeCloseTo(1, 2);
  });
  it("çok uzun boruda ortam sıcaklığına yaklaşır", () => {
    const r = boruBoyuncaSicaklikDusumu.compute({ girisSicakligi_C: 80, ortamSicakligi_C: 10, boyBasinaGecirgenlik_WmK: 1, uzunluk_m: 1e6, debi_m3h: 1 });
    expect(r.value.cikisSicakligi_C).toBeCloseTo(10, 6);
  });
});
