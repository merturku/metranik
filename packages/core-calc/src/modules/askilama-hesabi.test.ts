import { describe, expect, it } from "vitest";
import { askilamaHesabi } from "./askilama-hesabi";

describe("askilama-hesabi", () => {
  // (5+3) kg/m × 3 m = 24 kg, bağımsız doğrulanabilir (doğrusal ağırlık × açıklık).
  it("5 kg/m boru, 3 kg/m su, 3 m askı aralığı için yükü hesaplar", () => {
    const r = askilamaHesabi.compute({
      boruAgirligi_kg_m: 5,
      suAgirligi_kg_m: 3,
      askiAraligi_m: 3,
    });

    expect(r.value.askiYuku_kg).toBeCloseTo(24, 5);
    expect(r.intermediates.askiYuku_N).toBeCloseTo(235.44, 2);
  });
});
