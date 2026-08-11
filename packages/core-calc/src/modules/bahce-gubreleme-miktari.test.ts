import { describe, expect, it } from "vitest";
import { bahceGubrelemeMiktari } from "./bahce-gubreleme-miktari";

describe("bahce-gubreleme-miktari", () => {
  it("alan=200m², uygulama oranı=0.05kg/m² → 10 kg gübre", () => {
    const r = bahceGubrelemeMiktari.compute({
      alan_m2: 200,
      uygulamaOrani_kg_m2: 0.05,
    });

    expect(r.intermediates.uygulamaOrani_g_m2).toBeCloseTo(50, 5);
    expect(r.value.gerekliGubre_kg).toBeCloseTo(10, 5);
  });
});
