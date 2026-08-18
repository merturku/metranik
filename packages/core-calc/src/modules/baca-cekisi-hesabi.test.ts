import { describe, expect, it } from "vitest";
import { bacaCekisiHesabi } from "./baca-cekisi-hesabi";

describe("baca-cekisi-hesabi", () => {
  it("H=15m, Tdış=15°C, Tbaca=200°C, P=101325Pa → ~70.49 Pa çekiş", () => {
    const r = bacaCekisiHesabi.compute({
      bacaYuksekligi_H_m: 15,
      disOrtamSicakligi_Tdis_C: 15,
      bacaGaziSicakligi_Tbaca_C: 200,
      atmosferBasinci_P_Pa: 101325,
    });

    expect(r.intermediates.disOrtamYogunlugu_kg_m3).toBeCloseTo(1.2252, 3);
    expect(r.value.cekisBasinci_Pa).toBeCloseTo(70.49, 1);
  });
});
