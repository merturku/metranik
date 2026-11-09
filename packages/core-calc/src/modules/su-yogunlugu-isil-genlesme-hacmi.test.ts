import { describe, it, expect } from "vitest";
import { suYogunluguIsilGenlesmeHacmi } from "./su-yogunlugu-isil-genlesme-hacmi";

describe("Su Yoğunluğu ve Isıl Genleşme", () => {
  it("20 °C → 998,21; 80 °C → 971,8 kg/m³ (tablo değerleri 998,21 / 971,8)", () => {
    const r = suYogunluguIsilGenlesmeHacmi.compute({ sistemHacmi_L: 1000, baslangicSicakligi_C: 20, sonSicaklik_C: 80 });
    expect(r.intermediates.baslangic_yogunlugu_kgm3 as number).toBeCloseTo(998.21, 1);
    expect(r.intermediates.son_yogunluk_kgm3 as number).toBeCloseTo(971.8, 0);
  });
  it("1000 L, 10 → 80 °C: ΔV ≈ 28,8 L (%2,88)", () => {
    const r = suYogunluguIsilGenlesmeHacmi.compute({ sistemHacmi_L: 1000, baslangicSicakligi_C: 10, sonSicaklik_C: 80 });
    expect(r.value.genlesmeHacmi_L).toBeCloseTo(28.8, 0);
  });
  it("aynı sıcaklıkta ΔV = 0; 4 °C'de yoğunluk 1000 kg/m³ (maksimum)", () => {
    const r = suYogunluguIsilGenlesmeHacmi.compute({ sistemHacmi_L: 500, baslangicSicakligi_C: 4, sonSicaklik_C: 4 });
    expect(r.value.genlesmeHacmi_L).toBeCloseTo(0, 10);
    expect(r.intermediates.baslangic_yogunlugu_kgm3 as number).toBeCloseTo(999.97, 1);
  });
});
