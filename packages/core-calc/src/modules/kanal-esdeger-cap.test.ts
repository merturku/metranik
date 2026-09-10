import { describe, expect, it } from "vitest";
import { kanalEsdegerCap } from "./kanal-esdeger-cap";

describe("kanal-esdeger-cap", () => {
  it("a=400mm, b=300mm → Deq≈377.71mm", () => {
    const r = kanalEsdegerCap.compute({
      kanalGenisligi_a_mm: 400,
      kanalYuksekligi_b_mm: 300,
    });

    expect(r.intermediates.kesitAlani_mm2).toBeCloseTo(120000, 5);
    expect(r.value.esdegerCap_Deq_mm).toBeCloseTo(377.71, 1);
  });
});
