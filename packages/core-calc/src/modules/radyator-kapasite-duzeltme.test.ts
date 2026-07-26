import { describe, expect, it } from "vitest";
import { radyatorKapasiteDuzeltme } from "./radyator-kapasite-duzeltme";

describe("radyator-kapasite-duzeltme", () => {
  it("EN 442: Qnom=1000W, ΔTnom=50°C, ΔTgerçek=40°C → ~748.2 W", () => {
    const r = radyatorKapasiteDuzeltme.compute({
      nominalKapasite_Q_W: 1000,
      nominalSicaklikFarki_dT_C: 50,
      gercekSicaklikFarki_dT_C: 40,
    });

    expect(r.intermediates.sicaklikOrani).toBeCloseTo(0.8, 5);
    expect(r.value.duzeltilmisKapasite_W).toBeCloseTo(748.2, 1);
  });
});
