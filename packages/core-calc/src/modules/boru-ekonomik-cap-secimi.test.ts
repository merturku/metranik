import { describe, expect, it } from "vitest";
import { boruEkonomikCapSecimi } from "./boru-ekonomik-cap-secimi";

describe("boru-ekonomik-cap-secimi", () => {
  it("Q=0.05 m³/s, Vekonomik=2 m/s → D≈178.41 mm", () => {
    const r = boruEkonomikCapSecimi.compute({
      debi_Q_m3s: 0.05,
      ekonomikHiz_V_ms: 2,
    });

    expect(r.intermediates.gerekliCap_m).toBeCloseTo(0.17841, 4);
    expect(r.value.gerekliCap_D_mm).toBeCloseTo(178.41, 1);
  });
});
