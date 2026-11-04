import { describe, it, expect } from "vitest";
import { odaSogumaSuresi } from "./oda-soguma-suresi";

describe("Oda Soğuma Süresi", () => {
  it("H 200 W/K, C 20 MJ/K (τ 27,78 h), 21 → 18 °C, Te 0 → t = τ·ln(21/18) ≈ 4,282 h", () => {
    const r = odaSogumaSuresi.compute({ isiKaybiKatsayisi_WK: 200, isilKutle_MJK: 20, baslangicSicakligi_C: 21, disSicaklik_C: 0, hedefSicaklik_C: 18 });
    expect(r.intermediates.zaman_sabiti_saat as number).toBeCloseTo(27.778, 3);
    expect(r.value.sure_saat).toBeCloseTo(4.282, 2);
  });
  it("Ti−Te farkı e'ye bölününce süre tam bir zaman sabitidir", () => {
    const r = odaSogumaSuresi.compute({ isiKaybiKatsayisi_WK: 100, isilKutle_MJK: 3.6, baslangicSicakligi_C: 10 + Math.E * 10, disSicaklik_C: 10, hedefSicaklik_C: 20 });
    expect(r.value.sure_saat).toBeCloseTo(10, 6);
  });
});
