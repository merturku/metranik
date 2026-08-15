import { describe, expect, it } from "vitest";
import { buharKazaniKapasitesi } from "./buhar-kazani-kapasitesi";

describe("buhar-kazani-kapasitesi", () => {
  it("güç=500kW, gizli ısı=2257kJ/kg → ~797.52 kg/h", () => {
    const r = buharKazaniKapasitesi.compute({
      isilGuc_kW: 500,
      gizliBuharlasmaIsisi_kJkg: 2257,
    });

    expect(r.intermediates.isilGuc_kJh).toBeCloseTo(1800000, 5);
    expect(r.value.buharKapasitesi_kgh).toBeCloseTo(797.52, 1);
  });
});
