import { describe, it, expect } from "vitest";
import { kanalSacAgirligi } from "./kanal-sac-agirligi";

describe("Kanal Sac Ağırlığı", () => {
  it("600×400, 10 m, 0,8 mm: 20 m² → 125,6 kg; +%10 fire = 138,16 kg", () => {
    const r = kanalSacAgirligi.compute({ genislik_mm: 600, yukseklik_mm: 400, uzunluk_m: 10, sacKalinligi_mm: 0.8, fireYuzde: 10 });
    expect(r.intermediates.sac_alani_m2 as number).toBeCloseTo(20, 9);
    expect(r.intermediates.net_agirlik_kg as number).toBeCloseTo(125.6, 6);
    expect(r.value.agirlik_kg).toBeCloseTo(138.16, 6);
    expect(r.intermediates.birim_alan_agirligi_kgm2 as number).toBeCloseTo(6.28, 6);
  });
});
