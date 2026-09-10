import { describe, expect, it } from "vitest";
import { buharTrapKapasitesi } from "./buhar-trap-kapasitesi";

describe("buhar-trap-kapasitesi", () => {
  it("Cd=0.7, A=0.0001 m², ρ=900 kg/m³, ΔP=500000 Pa → 2.1 kg/s, 7560 kg/h", () => {
    const r = buharTrapKapasitesi.compute({
      desarjKatsayisi_Cd: 0.7,
      orifisAlani_A_m2: 0.0001,
      kondensYogunlugu_rho_kgm3: 900,
      basincFarki_dP_Pa: 500000,
    });

    expect(r.intermediates.kutleselDebi_kgs).toBeCloseTo(2.1, 2);
    expect(r.value.kapasite_kgh).toBeCloseTo(7560, 0);
  });
});
