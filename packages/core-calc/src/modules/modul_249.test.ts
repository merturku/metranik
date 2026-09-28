import { describe, it, expect } from "vitest";
import { modul_249 } from "./modul_249";

describe("Ev Pik Elektrik Talebi", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_249.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
