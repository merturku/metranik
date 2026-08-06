import { describe, expect, it } from "vitest";
import { gunesPaneliYillikUretim } from "./gunes-paneli-yillik-uretim";

describe("gunes-paneli-yillik-uretim", () => {
  it("kurulu güç=5kWp, güneşlenme=4.5h, PR=0.8 → 6570 kWh/yıl", () => {
    const r = gunesPaneliYillikUretim.compute({
      kuruluGuc_kWp: 5,
      guneslenmeSaati_h: 4.5,
      performansOrani: 0.8,
    });

    expect(r.intermediates.gunlukUretim_kWh).toBeCloseTo(18, 5);
    expect(r.value.yillikUretim_kWh).toBeCloseTo(6570, 5);
  });
});
