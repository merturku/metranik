import { describe, it, expect } from "vitest";
import { armaturYerlesimAraligi } from "./armatur-yerlesim-araligi";

describe("Armatür Yerleşimi", () => {
  const o = { odaUzunlugu_m: 10, odaGenisligi_m: 6, montajYuksekligi_m: 2.5, shr: 1.25, gerekliArmaturSayisi: 6 };
  it("s_maks 3,125 m → 4 × 2 = 8 armatür; aralıklar 2,5 × 3,0 m", () => {
    const r = armaturYerlesimAraligi.compute(o);
    expect(r.intermediates.azami_aralik_m).toBeCloseTo(3.125, 9);
    expect(r.value.armaturSayisi).toBe(8);
    expect(r.intermediates.gercek_aralik_uzunluk_m as number).toBeCloseTo(2.5, 9);
    expect(r.intermediates.gercek_aralik_genislik_m as number).toBeCloseTo(3, 9);
  });
  it("lüks yöntemi adedi daha büyükse onu alır", () => {
    const r = armaturYerlesimAraligi.compute({ ...o, gerekliArmaturSayisi: 12 });
    expect(r.value.armaturSayisi).toBe(12);
    expect(r.intermediates.belirleyici).toBe("Lüks yöntemi adedi");
  });
});
