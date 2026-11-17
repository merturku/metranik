import { describe, it, expect } from "vitest";
import { evCamLevhaAgirligi } from "./ev-cam-levha-agirligi";

describe("Cam Levha Ağırlığı", () => {
  it("1,2×2,0 m, 6 mm: 15 kg/m², tek levha 36 kg; 3 adet = 108 kg, 7,2 m²", () => {
    const r = evCamLevhaAgirligi.compute({ genislik_m: 1.2, yukseklik_m: 2, kalinlik_mm: 6, adet: 3, yogunluk_kgm3: 2500 });
    expect(r.intermediates.birim_alan_agirligi_kgm2 as number).toBeCloseTo(15, 10);
    expect(r.intermediates.tek_levha_kg as number).toBeCloseTo(36, 10);
    expect(r.value.toplamAgirlik_kg).toBeCloseTo(108, 10);
    expect(r.intermediates.toplam_alan_m2 as number).toBeCloseTo(7.2, 10);
  });
  it("1 mm kalınlıkta 1 m² cam 2,5 kg", () => {
    expect(evCamLevhaAgirligi.compute({ genislik_m: 1, yukseklik_m: 1, kalinlik_mm: 1, adet: 1, yogunluk_kgm3: 2500 }).value.toplamAgirlik_kg).toBeCloseTo(2.5, 10);
  });
});
