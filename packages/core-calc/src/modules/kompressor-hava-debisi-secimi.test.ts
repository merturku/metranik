import { describe, it, expect } from "vitest";
import { kompresörHavaDebisiSecimi } from "./kompressor-hava-debisi-secimi";

describe("Kompresör Hava Debisi Seçimi", () => {
  it("7 m³/min, sf=0.7 → 10 m³/min (FAD)", () => {
    const r = kompresörHavaDebisiSecimi.compute({ debi_m3min: 7, esanzamanlılık_faktoru: 0.7 });
    expect(r.value.fad_m3min).toBeCloseTo(10, 0);
  });
});
