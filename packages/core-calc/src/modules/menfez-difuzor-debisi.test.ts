import { describe, expect, it } from "vitest";
import { menfezDifuzorDebisi } from "./menfez-difuzor-debisi";

describe("menfez-difuzor-debisi", () => {
  it("A=0.1m², Cd=0.65, ΔP=20Pa → ~1351 m³/h", () => {
    const r = menfezDifuzorDebisi.compute({
      menfezAlani_A_m2: 0.1,
      debiKatsayisi_Cd: 0.65,
      basincFarki_dP_Pa: 20,
    });

    expect(r.intermediates.terminalHiz_ms).toBeCloseTo(5.7735, 3);
    expect(r.value.debi_m3h).toBeCloseTo(1351, 0);
  });
});
