import { describe, it, expect } from "vitest";
import { koseKaynagiMetalAgirligi } from "./kose-kaynagi-metal-agirligi";

describe("Köşe Kaynağı Metal Ağırlığı", () => {
  it("z = 6 mm: A = 18 mm²; L = 1000 mm → 18 cm³ → 0,1413 kg; a = 4,243 mm", () => {
    const r = koseKaynagiMetalAgirligi.compute({ kenarUzunlugu_z_mm: 6, dikisBoyu_mm: 1000, dikisSayisi: 1, yuzeyPayi: 1, kaynakVerimi_yuzde: 100 });
    expect(r.intermediates.kaynak_metali_hacmi_cm3 as number).toBeCloseTo(18, 8);
    expect(r.value.kaynakMetaliAgirligi_kg).toBeCloseTo(0.14130, 4);
    expect(r.intermediates.bogaz_kalinligi_a_mm as number).toBeCloseTo(4.2426, 3);
  });
  it("iki taraflı, %15 pay, %65 elektrot verimi: ağırlık 2·1,15 katı; sarfiyat = ağırlık/0,65", () => {
    const r = koseKaynagiMetalAgirligi.compute({ kenarUzunlugu_z_mm: 6, dikisBoyu_mm: 1000, dikisSayisi: 2, yuzeyPayi: 1.15, kaynakVerimi_yuzde: 65 });
    expect(r.value.kaynakMetaliAgirligi_kg).toBeCloseTo(0.1413 * 2 * 1.15, 4);
    expect(r.intermediates.elektrot_tel_sarfiyati_kg as number).toBeCloseTo(r.value.kaynakMetaliAgirligi_kg / 0.65, 8);
  });
  it("z iki katına → ağırlık 4 katına", () => {
    const a = koseKaynagiMetalAgirligi.compute({ kenarUzunlugu_z_mm: 5, dikisBoyu_mm: 500, dikisSayisi: 1, yuzeyPayi: 1, kaynakVerimi_yuzde: 100 }).value.kaynakMetaliAgirligi_kg;
    const b = koseKaynagiMetalAgirligi.compute({ kenarUzunlugu_z_mm: 10, dikisBoyu_mm: 500, dikisSayisi: 1, yuzeyPayi: 1, kaynakVerimi_yuzde: 100 }).value.kaynakMetaliAgirligi_kg;
    expect(b / a).toBeCloseTo(4, 8);
  });
});
