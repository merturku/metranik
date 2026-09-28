import { describe, it, expect } from "vitest";
import { modul_247 } from "./modul_247";

describe("Çelik Uzama Yüzdesi Kontrolü", () => {
  it("Test: 10 × 5 = 50", () => {
    const r = modul_247.compute({ dever_1: 10, dever_2: 5 });
    expect(r.value.sonuc).toBeCloseTo(50, 0);
  });
});
