import { describe, expect, it } from "vitest";
import { catiKaplamaMetraji } from "./cati-kaplama-metraji";

describe("cati-kaplama-metraji", () => {
  it("izdüşüm=150m², eğim=30°, fire=%10 → ~190.53 m²", () => {
    const r = catiKaplamaMetraji.compute({
      izdusumAlani_m2: 150,
      egimAcisi_derece: 30,
      fireOrani: 0.1,
    });

    expect(r.intermediates.gercekCatiAlani_m2).toBeCloseTo(173.21, 1);
    expect(r.value.gerekliMalzeme_m2).toBeCloseTo(190.53, 1);
  });
});
