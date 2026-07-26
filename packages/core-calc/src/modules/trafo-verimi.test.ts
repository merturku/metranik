import { describe, expect, it } from "vitest";
import { trafoVerimi } from "./trafo-verimi";

describe("trafoVerimi", () => {
  it("Pout=500kW, Pfe=1.2kW, Pcu=3.5kW → η≈99.07%", () => {
    const r = trafoVerimi.compute({
      cikisGucu_Pout_kW: 500,
      demirKaybi_Pfe_kW: 1.2,
      bakirKaybi_Pcu_kW: 3.5,
    });
    expect(r.value.verim_yuzde).toBeCloseTo(99.0688, 3);
  });
});
