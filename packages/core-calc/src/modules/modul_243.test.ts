import { describe, it, expect } from "vitest";
import { modul_243 } from "./modul_243";

describe("Transformatör I²R Kaybı", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_243.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
