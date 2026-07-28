import { describe, expect, it } from "vitest";
import { bahceSulamaDebisi } from "./bahce-sulama-debisi";

describe("bahce-sulama-debisi", () => {
  it("Alan=50m², oran=15mm/saat, verim=0.8 → 937.5 L/saat", () => {
    const r = bahceSulamaDebisi.compute({
      sulanacakAlan_m2: 50,
      uygulamaOrani_mm_saat: 15,
      sistemVerimi: 0.8,
    });

    expect(r.value.gerekliDebi_L_saat).toBeCloseTo(937.5, 2);
    expect(r.intermediates.gerekliDebi_L_dk).toBeCloseTo(15.625, 3);
  });
});
