import { describe, expect, it } from "vitest";
import { hidroforTankiHacmi } from "./hidrofor-tanki-hacmi";

describe("hidrofor-tanki-hacmi", () => {
  it("Vd=50 L, Pmin=250 kPa(abs), Pmax=450 kPa(abs) → Vt=112.5 L", () => {
    const r = hidroforTankiHacmi.compute({
      cekilebilirHacim_Vd_L: 50,
      devreyeGirmeBasinci_Pmin_kPaAbs: 250,
      devredenCikmaBasinci_Pmax_kPaAbs: 450,
    });

    expect(r.intermediates.basincFarki_kPa).toBeCloseTo(200, 5);
    expect(r.value.tankHacmi_Vt_L).toBeCloseTo(112.5, 5);
  });
});
