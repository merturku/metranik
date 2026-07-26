import { describe, expect, it } from "vitest";
import { fayansDosemeMalzemeMiktari } from "./fayans-doseme-malzeme-miktari";

describe("fayans-doseme-malzeme-miktari", () => {
  it("30 m², %10 fire → 33 m²", () => {
    const r = fayansDosemeMalzemeMiktari.compute({ alan_m2: 30, fireOrani: 0.1 });

    expect(r.value.gerekliMalzeme_m2).toBeCloseTo(33, 5);
  });
});
