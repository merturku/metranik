import { describe, expect, it } from "vitest";
import { kazikElastikKisalmasi } from "./kazik-elastik-kisalmasi";

describe("kazik-elastik-kisalmasi", () => {
  it("P=500000 N, L=15000 mm, A=100000 mm², E=25000 MPa → δ=3.0 mm", () => {
    const r = kazikElastikKisalmasi.compute({
      eksenelYuk_P_N: 500000,
      kazikBoyu_L_mm: 15000,
      kesitAlani_A_mm2: 100000,
      elastisiteModulu_E_MPa: 25000,
    });

    expect(r.value.elastikKisalma_delta_mm).toBeCloseTo(3.0, 5);
    expect(r.intermediates.eksenelRijitlik_Nmm).toBeCloseTo(166666.67, 1);
  });
});
