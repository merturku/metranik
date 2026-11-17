import { describe, it, expect } from "vitest";
import { kanalYogusmaOnleyiciYalitimKalinligi } from "./kanal-yogusma-onleyici-yalitim-kalinligi";

const g = { ortamSicakligi_C: 30, bagilNem_pct: 60, kanalSicakligi_C: 12, lambda_WmK: 0.035, hDis_Wm2K: 8, pay_K: 1 };

describe("Kanal Yoğuşma Önleyici Yalıtım", () => {
  it("30 °C %60 (Td = 21,385 °C), Ts = 22,385, Tc = 12, λ 0,035, ho 8 → t = 5,967 mm", () => {
    const r = kanalYogusmaOnleyiciYalitimKalinligi.compute(g);
    expect(r.intermediates.ciy_noktasi_C as number).toBeCloseTo(21.3854, 3);
    expect(r.value.kalinlik_mm as number).toBeCloseTo(5.967, 2);
  });
  it("geri doğrulama: t ile yüzey sıcaklığı = hedef (22,385 °C)", () => {
    const t = (kanalYogusmaOnleyiciYalitimKalinligi.compute(g).value.kalinlik_mm as number) / 1000;
    const Ro = 1 / 8;
    const Ts = 30 - (30 - 12) * (Ro / (Ro + t / 0.035));
    expect(Ts).toBeCloseTo(22.3854, 3);
  });
  it("Tc hedefin üstündeyse 0 mm; nem %100'e yakın ve pay büyükse null", () => {
    expect(kanalYogusmaOnleyiciYalitimKalinligi.compute({ ...g, kanalSicakligi_C: 25 }).value.kalinlik_mm).toBe(0);
    expect(kanalYogusmaOnleyiciYalitimKalinligi.compute({ ...g, bagilNem_pct: 100, pay_K: 1 }).value.kalinlik_mm).toBeNull();
  });
});
