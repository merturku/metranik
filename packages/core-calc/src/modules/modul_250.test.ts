import { describe, it, expect } from "vitest";
import { modul_250 } from "./modul_250";

describe("Rüzgarda Pompa Çalışması", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_250.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
