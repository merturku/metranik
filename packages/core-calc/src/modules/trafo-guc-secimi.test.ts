import { describe, expect, it } from "vitest";
import { trafoGucSecimi } from "./trafo-guc-secimi";

describe("trafo-guc-secimi", () => {
  it("P=400kW, cosφ=0.85, güvenlik=1.25 → ~588.24 kVA", () => {
    const r = trafoGucSecimi.compute({
      toplamAktifGuc_kW: 400,
      gucFaktoru_cosfi: 0.85,
      guvenlikKatsayisi: 1.25,
    });

    expect(r.intermediates.gorunurGuc_kVA).toBeCloseTo(470.588, 2);
    expect(r.value.gerekliTrafoGucu_kVA).toBeCloseTo(588.235, 2);
  });
});
