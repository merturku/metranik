import { describe, it, expect } from "vitest";
import { dogalgazFaturaTahmini } from "./dogalgaz-fatura-tahmini";

describe("Doğalgaz Fatura Tahmini", () => {
  it("100 m³ × 9,59 = 959 kWh × 2,5 = 2397,5 ₺ + %20 vergi = 2877 ₺", () => {
    const r = dogalgazFaturaTahmini.compute({ tuketim_m3: 100, isilDeger_kWhm3: 9.59, birimFiyat_TLkWh: 2.5, sabitBedel_TL: 0, vergi_yuzde: 20 });
    expect(r.intermediates.enerji_kWh as number).toBeCloseTo(959, 8);
    expect(r.value.toplamTutar_TL).toBeCloseTo(2877, 6);
  });
  it("sabit bedel vergiye dahil edilir; sıfır tüketimde m³ maliyeti tanımsız", () => {
    const r = dogalgazFaturaTahmini.compute({ tuketim_m3: 0, isilDeger_kWhm3: 9.59, birimFiyat_TLkWh: 2.5, sabitBedel_TL: 50, vergi_yuzde: 20 });
    expect(r.value.toplamTutar_TL).toBeCloseTo(60, 8);
    expect(r.intermediates.m3_basina_maliyet_TL).toBe("—");
  });
});
