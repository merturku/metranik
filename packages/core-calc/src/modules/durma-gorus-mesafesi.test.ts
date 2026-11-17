import { describe, it, expect } from "vitest";
import { durmaGorusMesafesi } from "./durma-gorus-mesafesi";

describe("Durma Görüş Mesafesi", () => {
  it("100 km/h, t 2,5 s, a 3,4 m/s², yatay: 69,5 + 113,59 = 183,09 m", () => {
    const r = durmaGorusMesafesi.compute({ hiz_kmh: 100, tepkiSuresi_s: 2.5, yavaslama_ms2: 3.4, egim: 0 });
    expect(r.intermediates.tepki_mesafesi_m as number).toBeCloseTo(69.5, 8);
    expect(r.value.durmaMesafesi_m as number).toBeCloseTo(183.094, 2);
  });
  it("%4 iniş: 69,5 + 10000/(254·(3,4/9,81 − 0,04)) = 197,9 m; yokuş çıkış daha kısa", () => {
    const iniş = durmaGorusMesafesi.compute({ hiz_kmh: 100, tepkiSuresi_s: 2.5, yavaslama_ms2: 3.4, egim: -0.04 }).value.durmaMesafesi_m as number;
    expect(iniş).toBeCloseTo(69.5 + 10000 / (254 * (3.4 / 9.81 - 0.04)), 6);
    expect(durmaGorusMesafesi.compute({ hiz_kmh: 100, tepkiSuresi_s: 2.5, yavaslama_ms2: 3.4, egim: 0.04 }).value.durmaMesafesi_m as number).toBeLessThan(183.09);
  });
  it("eğim yavaşlamayı aşarsa null", () => {
    expect(durmaGorusMesafesi.compute({ hiz_kmh: 100, tepkiSuresi_s: 2.5, yavaslama_ms2: 1, egim: -0.3 }).value.durmaMesafesi_m).toBeNull();
  });
});
