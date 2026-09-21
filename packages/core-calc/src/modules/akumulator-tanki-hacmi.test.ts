import { describe, it, expect } from "vitest";
import { akumulatorTankiHacmi } from "./akumulator-tanki-hacmi";

describe("Akümülatör Tankı Hacmi", () => {
  it("Boyle yasası: V_ölü=10L, P_max=10bar, P_min=7bar → V_kullanılabilir≈1.2L", () => {
    const r = akumulatorTankiHacmi.compute({
      olü_hacmi_L: 10,
      max_basinc_bar: 10,
      min_basinc_bar: 7,
    });

    expect(r.value.kullanilabilir_hacmi_L).toBeCloseTo(1.2, 0);
    expect(r.value.toplam_tanki_hacmi_L).toBeCloseTo(11.2, 0);
  });
});
