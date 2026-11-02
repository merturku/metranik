import { describe, it, expect } from "vitest";
import { sicakSuBirimMaliyeti } from "./sicak-su-birim-maliyeti";

describe("Sıcak Su Birim Maliyeti", () => {
  it("10→55 °C: 1000·4,186·45/3600 = 52,325 kWh/m³; η 0,9 → 58,14 kWh/m³; 3 ₺/kWh → 174,4 ₺/m³", () => {
    const r = sicakSuBirimMaliyeti.compute({ soguklukSuSicakligi_C: 10, sicakSuSicakligi_C: 55, cihazVerimi: 0.9, enerjiFiyati_TLkWh: 3, aylikSicakSuHacmi_m3: 4 });
    expect(r.intermediates.birim_enerji_kWh_m3 as number).toBeCloseTo(58.139, 2);
    expect(r.value.birimMaliyet_TLm3).toBeCloseTo(174.42, 1);
    expect(r.intermediates.aylik_maliyet_TL as number).toBeCloseTo(697.67, 1);
  });
});
