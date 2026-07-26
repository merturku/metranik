import { describe, expect, it } from "vitest";
import { fanAffiniteYasalari } from "./fan-affinite-yasalari";

describe("fan-affinite-yasalari", () => {
  it("Q1=1000, P1=500, Guc1=2kW, N1=1450, N2=1160 (oran=0.8) → Q2=800, P2=320, Guc2=1.024", () => {
    const r = fanAffiniteYasalari.compute({
      referansDebi_Q1_m3h: 1000,
      referansBasinc_P1_Pa: 500,
      referansGuc_Guc1_kW: 2,
      referansDevir_N1_rpm: 1450,
      yeniDevir_N2_rpm: 1160,
    });

    expect(r.intermediates.devirOrani).toBeCloseTo(0.8, 5);
    expect(r.value.yeniDebi_Q2_m3h).toBeCloseTo(800, 5);
    expect(r.intermediates.yeniBasinc_P2_Pa).toBeCloseTo(320, 5);
    expect(r.intermediates.yeniGuc_Guc2_kW).toBeCloseTo(1.024, 3);
  });
});
