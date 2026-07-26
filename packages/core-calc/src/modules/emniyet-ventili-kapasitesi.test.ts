import { describe, expect, it } from "vitest";
import { emniyetVentiliKapasitesi } from "./emniyet-ventili-kapasitesi";

describe("emniyet-ventili-kapasitesi", () => {
  it("P=500kW, hfg=2257kJ/kg → ~797.5 kg/h", () => {
    const r = emniyetVentiliKapasitesi.compute({
      kazanGucu_P_kW: 500,
      buharlasmaGizliIsisi_hfg_kJkg: 2257,
    });

    expect(r.value.tahliyeKapasitesi_kgh).toBeCloseTo(797.52, 1);
  });
});
