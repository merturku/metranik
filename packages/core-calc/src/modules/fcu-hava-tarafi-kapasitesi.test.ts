import { describe, expect, it } from "vitest";
import { fcuHavaTarafiKapasitesi } from "./fcu-hava-tarafi-kapasitesi";

describe("fcu-hava-tarafi-kapasitesi", () => {
  it("V=500 m³/h, ΔT=10°C → ~1.677 kW", () => {
    const r = fcuHavaTarafiKapasitesi.compute({
      havaDebisi_V_m3h: 500,
      sicaklikFarki_dT_C: 10,
    });

    expect(r.intermediates.debi_m3s).toBeCloseTo(0.13889, 4);
    expect(r.value.kapasite_kW).toBeCloseTo(1.6767, 3);
  });
});
