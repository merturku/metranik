import { describe, it, expect } from "vitest";
import { yogusmaOnleyiciYalitimKalinligi } from "./yogusma-onleyici-yalitim-kalinligi";

const sogukSuHatti = {
  boruDisCapi_D1_mm: 60.3,
  akiskanSicakligi_C: 6,
  ortamSicakligi_C: 30,
  bagilNem_yuzde: 70,
  yalitimIletkenligi_lambda_WmK: 0.035,
  disYuzeyIsiTasinim_he_Wm2K: 6,
  guvenlikPayi_C: 0,
};

describe("Soğuk Boru Yoğuşma Önleyici Yalıtım Kalınlığı (EN ISO 12241)", () => {
  it("DN50 (Ø60,3), 6 °C soğuk su, 30 °C / %70 ortam, λ = 0,035, he = 6: Tçiy = 23,92 °C, gerekli kalınlık 14,24 mm", () => {
    const r = yogusmaOnleyiciYalitimKalinligi.compute(sogukSuHatti);
    expect(r.intermediates.ciy_noktasi_C).toBeCloseTo(23.915, 3);
    expect(r.value.yalitimKalinligi_mm).toBeCloseTo(14.2419, 3);
    expect(r.intermediates.isi_kazanci_Wm).toBeCloseTo(10.1835, 3);
  });

  it("Çözümde yüzey sıcaklığı hedefe eşittir ve Ryalıtım/Rdış = he·D2·ln(D2/D1)/(2λ) = (Ty − Ta)/(Tortam − Ty) sağlanır", () => {
    const r = yogusmaOnleyiciYalitimKalinligi.compute(sogukSuHatti);
    const tYuzey = Number(r.intermediates.yuzey_sicakligi_C);
    expect(tYuzey).toBeCloseTo(Number(r.intermediates.hedef_yuzey_sicakligi_C), 6);
    const d2 = Number(r.intermediates.yalitim_dis_capi_D2_mm) / 1000;
    const direncOrani = (6 * d2 * Math.log(d2 / 0.0603)) / (2 * 0.035);
    expect(direncOrani).toBeCloseTo((tYuzey - 6) / (30 - tYuzey), 6);
  });

  it("1 °C güvenlik payıyla kalınlık 17,42 mm'ye çıkar", () => {
    const r = yogusmaOnleyiciYalitimKalinligi.compute({ ...sogukSuHatti, guvenlikPayi_C: 1 });
    expect(r.value.yalitimKalinligi_mm).toBeCloseTo(17.424, 3);
  });

  it("Akışkan zaten hedef yüzey sıcaklığının üstündeyse yalıtım gerekmez (0 mm)", () => {
    const r = yogusmaOnleyiciYalitimKalinligi.compute({ ...sogukSuHatti, akiskanSicakligi_C: 25 });
    expect(r.value.yalitimKalinligi_mm).toBe(0);
  });
});
