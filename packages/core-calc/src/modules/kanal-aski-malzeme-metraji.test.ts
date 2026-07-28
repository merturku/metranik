import { describe, expect, it } from "vitest";
import { kanalAskiMalzemeMetraji } from "./kanal-aski-malzeme-metraji";

describe("kanal-aski-malzeme-metraji", () => {
  it("L=30m, S=3m, çevre=1.0m, ek pay=0.3m → 11 askı, 14.3 m malzeme", () => {
    const r = kanalAskiMalzemeMetraji.compute({
      kanalUzunlugu_L_m: 30,
      maksimumAskiAraligi_S_m: 3,
      kanalCevresi_P_m: 1.0,
      baglamaPayi_m: 0.3,
    });

    expect(r.intermediates.askiAdedi).toBe(11);
    expect(r.value.toplamAskiMalzemesi_m).toBeCloseTo(14.3, 5);
  });
});
