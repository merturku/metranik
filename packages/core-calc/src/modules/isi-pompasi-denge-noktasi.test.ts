import { describe, it, expect } from "vitest";
import { isiPompasiDengeNoktasi } from "./isi-pompasi-denge-noktasi";

describe("Isı Pompası Denge Noktası", () => {
  const o = {
    icSicaklik_C: 20, tasarimDisSicaklik_C: -5, tasarimYuku_kW: 10,
    kapasiteSicaklik1_C: -7, kapasite1_kW: 6, kapasiteSicaklik2_C: 7, kapasite2_kW: 9,
  };
  it("k 0,4 kW/K, s 3/14 → T_denge ≈ 0,81 °C; yük = kapasite ≈ 7,67 kW", () => {
    const r = isiPompasiDengeNoktasi.compute(o);
    expect(r.value.dengeSicakligi_C).toBeCloseTo(0.814, 3);
    expect(r.intermediates.denge_yuku_kW as number).toBeCloseTo(7.674, 2);
    // kapasite eğrisi aynı noktada aynı değeri verir
    expect(6 + (3 / 14) * (r.value.dengeSicakligi_C + 7)).toBeCloseTo(r.intermediates.denge_yuku_kW as number, 9);
  });
  it("tasarım noktasında kapasite 6,43 kW → ek ısıtıcı 3,57 kW (%35,7)", () => {
    const r = isiPompasiDengeNoktasi.compute(o);
    expect(r.intermediates.ek_isitici_gereksinimi_kW as number).toBeCloseTo(3.571, 3);
  });
  it("büyük pompa (kapasite ×2): denge noktası tasarım sıcaklığının altında → ek ısıtıcı 0", () => {
    const r = isiPompasiDengeNoktasi.compute({ ...o, kapasite1_kW: 12, kapasite2_kW: 18 });
    expect(r.value.dengeSicakligi_C).toBeLessThan(-5);
    expect(r.intermediates.ek_isitici_gereksinimi_kW).toBe(0);
  });
});
