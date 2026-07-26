import { describe, expect, it } from "vitest";
import { duzYuzeyTasinimIsiKaybi } from "./duz-yuzey-tasinim-isi-kaybi";

describe("duzYuzeyTasinimIsiKaybi", () => {
  it("h=15 W/m²K, A=12 m², ΔT=20K → Q=3600 W", () => {
    const r = duzYuzeyTasinimIsiKaybi.compute({
      tasinimKatsayisi_h_Wm2K: 15,
      yuzeyAlani_A_m2: 12,
      sicaklikFarki_dT_K: 20,
    });
    expect(r.value.isiKaybi_Q_W).toBeCloseTo(3600, 3);
  });
});
