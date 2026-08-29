import { describe, expect, it } from "vitest";
import { boruSurtunmeKatsayisi } from "./boru-surtunme-katsayisi";

describe("boru-surtunme-katsayisi", () => {
  it("Re=100000, D=0.1m, ε=0.000045m (çelik boru) → f≈0.0202", () => {
    const r = boruSurtunmeKatsayisi.compute({
      reynoldsSayisi_Re: 100000,
      boruIcCapi_D_m: 0.1,
      mutlakPuruzluluk_epsilon_m: 0.000045,
    });

    expect(r.intermediates.goreliPuruzluluk).toBeCloseTo(0.00045, 5);
    expect(r.value.surtunmeKatsayisi_f).toBeCloseTo(0.0202, 3);
  });
});
