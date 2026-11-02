import { describe, it, expect } from "vitest";
import { perdeKumasMiktari } from "./perde-kumas-miktari";

describe("Perde Kumaşı Miktarı", () => {
  it("2 m pencere ×2 pile + 0,2 = 4,2 m; 1,4 m en → 3 panel; boy 2,5+0,3 = 2,8 → 8,4 m", () => {
    const r = perdeKumasMiktari.compute({
      pencereGenisligi_m: 2, perdeYuksekligi_m: 2.5, pileKatsayisi: 2, kumasEni_m: 1.4, yanPayi_m: 0.1, etekVeUstPayi_m: 0.3,
    });
    expect(r.intermediates.gereken_genislik_m as number).toBeCloseTo(4.2, 9);
    expect(r.intermediates.panel_sayisi).toBe(3);
    expect(r.value.toplamKumas_m).toBeCloseTo(8.4, 9);
  });
  it("tam katı (4,2 m / 1,4 m = 3) tavanlanmaz", () => {
    const r = perdeKumasMiktari.compute({
      pencereGenisligi_m: 2, perdeYuksekligi_m: 2.5, pileKatsayisi: 2, kumasEni_m: 1.4, yanPayi_m: 0.1, etekVeUstPayi_m: 0,
    });
    expect(r.intermediates.panel_sayisi).toBe(3);
  });
});
