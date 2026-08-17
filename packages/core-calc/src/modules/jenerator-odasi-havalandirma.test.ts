import { describe, expect, it } from "vitest";
import { jeneratorOdasiHavalandirma } from "./jenerator-odasi-havalandirma";

describe("jenerator-odasi-havalandirma", () => {
  it("P=500kW, yanma katsayısı=7m³h/kW, atık ısı=60kW, ΔT=15°C → ~15428.4 m³/h", () => {
    const r = jeneratorOdasiHavalandirma.compute({
      jeneratorGucu_P_kW: 500,
      yanmaHavaKatsayisi_m3h_kW: 7,
      odayaYayilanAtikIsi_Pkayip_kW: 60,
      izinVerilenSicaklikArtisi_dT_C: 15,
    });

    expect(r.intermediates.yanmaHavasi_m3h).toBeCloseTo(3500, 5);
    expect(r.intermediates.sogutmaHavasi_m3h).toBeCloseTo(11928.43, 1);
    expect(r.value.toplamHavaDebisi_m3h).toBeCloseTo(15428.43, 1);
  });
});
