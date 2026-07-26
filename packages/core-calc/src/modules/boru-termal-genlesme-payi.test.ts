import { describe, expect, it } from "vitest";
import { boruTermalGenlesmePayi } from "./boru-termal-genlesme-payi";

describe("boru-termal-genlesme-payi", () => {
  it("α=0.012 mm/mK, L=50m, ΔT=60°C → 36 mm", () => {
    const r = boruTermalGenlesmePayi.compute({
      genlesmeKatsayisi_alpha_mmMK: 0.012,
      boruUzunlugu_L_m: 50,
      sicaklikFarki_dT_C: 60,
    });

    expect(r.value.genlesme_mm).toBeCloseTo(36, 5);
  });
});
