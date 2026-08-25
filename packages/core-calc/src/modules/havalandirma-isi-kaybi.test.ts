import { describe, expect, it } from "vitest";
import { havalandirmaIsiKaybi } from "./havalandirma-isi-kaybi";

describe("havalandirma-isi-kaybi", () => {
  it("n=0.5 1/h, V=200 m³, ΔT=20°C → 670 W", () => {
    const r = havalandirmaIsiKaybi.compute({
      havaDegisimSayisi_n_1h: 0.5,
      hacim_V_m3: 200,
      sicaklikFarki_dT_C: 20,
    });

    expect(r.value.isiKaybi_W).toBeCloseTo(670, 1);
  });
});
