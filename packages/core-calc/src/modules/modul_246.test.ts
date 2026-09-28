import { describe, it, expect } from "vitest";
import { modul_246 } from "./modul_246";

describe("Beton Örnek Sıkıştırma", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_246.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
