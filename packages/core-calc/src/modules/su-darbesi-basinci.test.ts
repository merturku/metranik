import { describe, expect, it } from "vitest";
import { suDarbesiBasinci } from "./su-darbesi-basinci";

describe("su-darbesi-basinci", () => {
  it("ρ=1000, c=1000 m/s, Δv=2 m/s → 20 bar", () => {
    const r = suDarbesiBasinci.compute({
      suYogunlugu_rho_kgm3: 1000,
      basincDalgasiHizi_c_ms: 1000,
      hizDegisimi_dv_ms: 2,
    });

    expect(r.intermediates.basincArtisi_Pa).toBeCloseTo(2000000, 5);
    expect(r.value.basincArtisi_bar).toBeCloseTo(20, 5);
  });
});
