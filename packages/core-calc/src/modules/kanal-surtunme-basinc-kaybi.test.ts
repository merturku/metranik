import { describe, expect, it } from "vitest";
import { kanalSurtunmeBasincKaybi } from "./kanal-surtunme-basinc-kaybi";

describe("kanal-surtunme-basinc-kaybi", () => {
  it("f=0.02, L=20m, Dh=0.4m, ρ=1.2kg/m³, V=8m/s → 38.4 Pa", () => {
    const r = kanalSurtunmeBasincKaybi.compute({
      surtunmeKatsayisi_f: 0.02,
      kanalUzunlugu_L_m: 20,
      hidroliCap_Dh_m: 0.4,
      havaYogunlugu_rho_kgm3: 1.2,
      hiz_V_ms: 8,
    });

    expect(r.intermediates.dinamikBasinc_Pa).toBeCloseTo(38.4, 5);
    expect(r.value.basincKaybi_Pa).toBeCloseTo(38.4, 5);
  });
});
