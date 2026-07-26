import { describe, expect, it } from "vitest";
import { boylerIsinmaSuresi } from "./boyler-isinma-suresi";

describe("boyler-isinma-suresi", () => {
  it("150kg su, ΔT=45°C, P=3kW → ~2.616 saat", () => {
    const r = boylerIsinmaSuresi.compute({
      suKutlesi_m_kg: 150,
      sicaklikFarki_dT_C: 45,
      isiticiGucu_P_kW: 3,
    });

    expect(r.intermediates.gerekliEnerji_kJ).toBeCloseTo(28255.5, 1);
    expect(r.value.isinmaSuresi_saat).toBeCloseTo(2.616, 2);
  });
});
