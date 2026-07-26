import { describe, expect, it } from "vitest";
import { dengeKabiHacmi } from "./denge-kabi-hacmi";

describe("denge-kabi-hacmi", () => {
  it("Q=20kW, t=600s, ΔT=10°C → ~286.67 L", () => {
    const r = dengeKabiHacmi.compute({
      isiKaynagiGucu_Q_kW: 20,
      minimumCalismaSuresi_t_s: 600,
      izinVerilenSicaklikFarki_dT_C: 10,
    });

    expect(r.intermediates.gerekliEnerji_kJ).toBeCloseTo(12000, 5);
    expect(r.value.gerekliHacim_L).toBeCloseTo(286.67, 1);
  });
});
