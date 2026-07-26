import { describe, expect, it } from "vitest";
import { gunesPaneliKapasiteHesabi } from "./gunes-paneli-kapasite-hesabi";

describe("gunes-paneli-kapasite-hesabi", () => {
  it("günlük tüketim=10 kWh, güneşlenme=5h, verim=0.8 → 2.5 kWp", () => {
    const r = gunesPaneliKapasiteHesabi.compute({
      gunlukTuketim_kWh: 10,
      guneslenmeSaati_h: 5,
      sistemVerimi: 0.8,
    });

    expect(r.value.gerekliGuc_kWp).toBeCloseTo(2.5, 5);
  });
});
