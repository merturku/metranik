import { describe, expect, it } from "vitest";
import { baraIsinmaKaybi } from "./bara-isinma-kaybi";

describe("bara-isinma-kaybi", () => {
  it("I=800A, R=0.00003 Ω/m, L=5m → 96 W", () => {
    const r = baraIsinmaKaybi.compute({
      akim_I_A: 800,
      birimDirenc_R_ohmm: 0.00003,
      uzunluk_L_m: 5,
    });

    expect(r.value.isiKaybi_W).toBeCloseTo(96, 5);
  });
});
