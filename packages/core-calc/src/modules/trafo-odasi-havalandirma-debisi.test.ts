import { describe, expect, it } from "vitest";
import { trafoOdasiHavalandirmaDebisi } from "./trafo-odasi-havalandirma-debisi";

describe("trafo-odasi-havalandirma-debisi", () => {
  it("Pkayıp=10kW, ΔT=10°C → ~2982.1 m³/h", () => {
    const r = trafoOdasiHavalandirmaDebisi.compute({
      trafoKayipIsisi_Pkayip_kW: 10,
      izinVerilenSicaklikArtisi_dT_C: 10,
    });

    expect(r.value.havaDebisi_m3h).toBeCloseTo(2982.1, 0);
  });
});
