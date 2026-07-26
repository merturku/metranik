import { describe, expect, it } from "vitest";
import { pencereDuvarIsiKaybi } from "./pencere-duvar-isi-kaybi";

describe("pencere-duvar-isi-kaybi", () => {
  it("U=1.4 W/m²K, A=2m², ΔT=20°C → 56 W", () => {
    const r = pencereDuvarIsiKaybi.compute({
      isiGecirmeKatsayisi_U_Wm2K: 1.4,
      yuzeyAlani_A_m2: 2,
      sicaklikFarki_dT_C: 20,
    });

    expect(r.value.isiKaybi_W).toBeCloseTo(56, 5);
  });
});
