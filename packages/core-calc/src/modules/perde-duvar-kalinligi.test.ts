import { describe, expect, it } from "vitest";
import { perdeDuvarKalinligi } from "./perde-duvar-kalinligi";

describe("perde-duvar-kalinligi", () => {
  it("h=3m, n=20 → 15 cm", () => {
    const r = perdeDuvarKalinligi.compute({ katYuksekligi_h_m: 3, katsayi_n: 20 });

    expect(r.value.minimumKalinlik_cm).toBeCloseTo(15, 5);
  });
});
