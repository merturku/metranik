import { describe, it, expect } from "vitest";
import { havaKarisimNoktasi, havaKarisimNoktasiInputSchema } from "./hava-karisim-noktasi";

// ASHRAE Fundamentals Bölüm 1, Örnek (adyabatik karışım): 2 m³/s dış hava 4 °C kuru /
// 2 °C yaş termometre ile 6,25 m³/s dönüş havası 25 °C, %50 bağıl nem karışıyor.
// Kitap çözümü: v1 = 0,789, v2 = 0,858 m³/kg; ṁ1 = 2,535, ṁ2 = 7,284 kg/s;
// t3 = 19,5 °C (diyagramdan), t*3 = 14,6 °C. 4 °C / 2 °C yaş termometre durumu
// Eş. 35 ile W1 = 0,003552 kg/kg, yani φ1 = %70,74'e karşılık gelir.
const ashraeOrnegi = {
  akim1Debisi_m3s: 2,
  akim1Sicakligi_C: 4,
  akim1BagilNem_yuzde: 70.74,
  akim2Debisi_m3s: 6.25,
  akim2Sicakligi_C: 25,
  akim2BagilNem_yuzde: 50,
  atmosferBasinci_kPa: 101.325,
};

describe("Hava Karışım Noktası", () => {
  it("ASHRAE örneği: ṁ1 ≈ 2,535, ṁ2 ≈ 7,284 kg/s; t3 ≈ 19,5 °C (diyagram okuması), t*3 ≈ 14,6 °C", () => {
    const r = havaKarisimNoktasi.compute(ashraeOrnegi);
    expect(r.intermediates.akim1_kuru_hava_kg_s).toBeCloseTo(2.535, 2);
    expect(r.intermediates.akim2_kuru_hava_kg_s).toBeCloseTo(7.284, 2);
    expect(r.intermediates.akim1_nem_orani_g_kg).toBeCloseTo(3.552, 2);
    expect(Math.abs(r.value.karisimSicakligi_C - 19.5)).toBeLessThan(0.15);
    expect(r.intermediates.karisim_yas_termometre_C).toBeCloseTo(14.6, 1);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Eşit kütleli, aynı nemli iki akım: karışım sıcaklığı yaklaşık aritmetik ortalama, nem oranı değişmez", () => {
    const r = havaKarisimNoktasi.compute({
      ...ashraeOrnegi,
      akim1Debisi_m3s: 1,
      akim1Sicakligi_C: 20,
      akim1BagilNem_yuzde: 50,
      akim2Debisi_m3s: 1,
      akim2Sicakligi_C: 20,
      akim2BagilNem_yuzde: 50,
    });
    expect(r.value.karisimSicakligi_C).toBeCloseTo(20, 6);
    expect(r.intermediates.karisim_bagil_nemi_yuzde).toBeCloseTo(50, 6);
  });

  it("Çok soğuk-doymuş dış hava ile sıcak-nemli dönüş havası: karışım doyma ötesine geçer, sis uyarısı", () => {
    const r = havaKarisimNoktasi.compute({
      ...ashraeOrnegi,
      akim1Debisi_m3s: 1,
      akim1Sicakligi_C: -15,
      akim1BagilNem_yuzde: 100,
      akim2Debisi_m3s: 1,
      akim2Sicakligi_C: 30,
      akim2BagilNem_yuzde: 90,
    });
    expect(r.intermediates.karisim_bagil_nemi_yuzde as number).toBeGreaterThan(100);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Bağıl nem %100'ü aşamaz", () => {
    expect(havaKarisimNoktasiInputSchema.safeParse({ ...ashraeOrnegi, akim2BagilNem_yuzde: 120 }).success).toBe(false);
  });
});
