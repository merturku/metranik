import { describe, it, expect } from "vitest";
import { modul_240 } from "./modul_240";

describe("Boru Yüzey Alanı", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_240.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
