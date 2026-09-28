import { describe, it, expect } from "vitest";
import { modul_244 } from "./modul_244";

describe("Kablo Direnci (Sıcaklık)", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_244.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
