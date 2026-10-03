import { describe, it, expect } from "vitest";
import { kanalDifuzorAgiDebisi } from "./kanal-difuzor-agı-debisi";

describe("Kanal Difüzör Ağı", () => {
  it("4 m/s, 0.1 m² → 1440 m³/h", () => {
    const r = kanalDifuzorAgiDebisi.compute({ hızlı_havayolu_hızı_ms: 4, difuzor_alanı_m2: 0.1 });
    expect(r.value.debi_m3h).toBeCloseTo(1440, 0);
  });
});
