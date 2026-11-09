import { describe, it, expect } from "vitest";
import { celikLevhaProfilAgirligi } from "./celik-levha-profil-agirligi";

describe("Çelik Levha / Dolu Profil Ağırlığı", () => {
  it("levha 1000 × 10 mm, L = 2000 mm: 0,01·... = 0,01 m²·... → 157 kg", () => {
    const r = celikLevhaProfilAgirligi.compute({ sekil: "levha", boyut1_mm: 1000, boyut2_mm: 10, uzunluk_mm: 2000, adet: 1 });
    expect(r.value.toplamAgirlik_kg).toBeCloseTo(157, 6);
    expect(r.intermediates.birim_uzunluk_agirligi_kgm as number).toBeCloseTo(78.5, 8);
  });
  it("Ø20 yuvarlak, 6 m: 2,466 kg/m → 14,80 kg; 10 adet → 148 kg", () => {
    const r = celikLevhaProfilAgirligi.compute({ sekil: "yuvarlak", boyut1_mm: 20, boyut2_mm: 0, uzunluk_mm: 6000, adet: 10 });
    expect(r.intermediates.birim_uzunluk_agirligi_kgm as number).toBeCloseTo(2.4661, 3);
    expect(r.value.toplamAgirlik_kg).toBeCloseTo(147.97, 1);
  });
  it("kare 20 mm: 3,14 kg/m (yuvarlağın 4/π katı)", () => {
    const k = celikLevhaProfilAgirligi.compute({ sekil: "kare", boyut1_mm: 20, boyut2_mm: 0, uzunluk_mm: 1000, adet: 1 });
    expect(k.value.toplamAgirlik_kg).toBeCloseTo(3.14, 2);
  });
});
