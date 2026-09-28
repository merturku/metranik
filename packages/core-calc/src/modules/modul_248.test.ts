import { describe, it, expect } from "vitest";
import { modul_248 } from "./modul_248";

describe("Zemin Yaşlanma Etkisi", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_248.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
