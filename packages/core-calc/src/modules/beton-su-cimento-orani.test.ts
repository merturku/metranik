import { describe, expect, it } from "vitest";
import { betonSuCimentoOrani } from "./beton-su-cimento-orani";

describe("beton-su-cimento-orani", () => {
  it("Oran=0.5, çimento=350kg/m³ → 175 kg/m³ su", () => {
    const r = betonSuCimentoOrani.compute({
      suCimentoOrani: 0.5,
      cimentoDozaji_kg_m3: 350,
    });

    expect(r.value.suMiktari_kg_m3).toBeCloseTo(175, 5);
  });
});
