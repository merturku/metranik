import { describe, it, expect } from "vitest";
import { modul_251 } from "./modul_251";

describe("Buhar Kalitesi Ölçüm", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_251.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
