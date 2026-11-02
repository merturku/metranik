import { describe, it, expect } from "vitest";
import { boruSistemSuHacmi } from "./boru-sistem-su-hacmi";

describe("Hidronik Sistem Su Hacmi", () => {
  it("di 107,1 mm → 9,009 L/m; 100 m + 50 L ekipman ≈ 950,9 L", () => {
    const r = boruSistemSuHacmi.compute({ icCap_mm: 107.1, boruUzunlugu_m: 100, ekipmanHacmi_L: 50 });
    expect(r.intermediates.birim_uzunluk_hacmi_Lm as number).toBeCloseTo(9.009, 3);
    expect(r.value.toplamHacim_L).toBeCloseTo(950.9, 1);
  });
});
