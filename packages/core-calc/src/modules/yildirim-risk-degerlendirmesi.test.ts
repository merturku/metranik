import { describe, expect, it } from "vitest";
import { yildirimRiskDegerlendirmesi } from "./yildirim-risk-degerlendirmesi";

describe("yildirim-risk-degerlendirmesi", () => {
  it("Ng=4, Ae=10000m², Cd=1 → Nd=0.04/yıl", () => {
    const r = yildirimRiskDegerlendirmesi.compute({
      yildirimYogunlugu_Ng_km2yil: 4,
      esdegerToplamaAlani_Ae_m2: 10000,
      konumKatsayisi_Cd: 1,
    });

    expect(r.value.yillikDusmeSikligi_Nd).toBeCloseTo(0.04, 5);
  });
});
