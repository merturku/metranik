import { describe, expect, it } from "vitest";
import { boyaMiktariHesabi } from "./boya-miktari-hesabi";

describe("boya-miktari-hesabi", () => {
  it("50 m², 2 kat, verim 10 m²/L → 10 L", () => {
    const r = boyaMiktariHesabi.compute({ alan_m2: 50, katSayisi: 2, boyaVerimi_m2L: 10 });

    expect(r.value.gerekliBoya_L).toBeCloseTo(10, 5);
  });
});
