import { describe, it, expect } from "vitest";
import { modul_237 } from "./modul_237";

describe("Aydınlatma Enerji Tasarrufu", () => {
  it("ASHRAE 90.1: 100 m², 10→5 kW/m² → 500 kW tasarruf, %50", () => {
    const r = modul_237.compute({
      alan_m2: 100,
      kW_m2_baslangic: 10,
      kW_m2_final: 5,
    });

    expect(r.value.tasarrufu_kW).toBe(500);
    expect(r.value.tasarrufu_yuzde).toBe(50);
  });
});
