import { describe, it, expect } from "vitest";
import { boruBirimAgirligi } from "./boru-birim-agirligi";

describe("Boru Birim Uzunluk Ağırlığı", () => {
  const o = { disCap_mm: 114.3, etKalinligi_mm: 3.6, yalitimKalinligi_mm: 0, yalitimYogunlugu_kgm3: 0, icerik: "dolu" as const };
  it("DN100 (114,3×3,6): çelik ≈ 9,83 kg/m, su ≈ 9,01 kg/m", () => {
    const r = boruBirimAgirligi.compute(o);
    expect(r.intermediates.celik_boru_kgm as number).toBeCloseTo(9.83, 2);
    expect(r.intermediates.su_kgm as number).toBeCloseTo(9.01, 2);
    expect(r.value.toplam_kgm).toBeCloseTo(18.84, 1);
  });
  it("boş boru ve yalıtım: 50 mm × 100 kg/m³ → π/4(0,2143²−0,1143²)·100 ≈ 2,58 kg/m", () => {
    const r = boruBirimAgirligi.compute({ ...o, icerik: "bos" as const, yalitimKalinligi_mm: 50, yalitimYogunlugu_kgm3: 100 });
    expect(r.intermediates.su_kgm).toBe(0);
    expect(r.intermediates.yalitim_kgm as number).toBeCloseTo(2.58, 2);
  });
});
