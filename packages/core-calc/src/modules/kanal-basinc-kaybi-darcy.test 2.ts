import { describe, it, expect } from "vitest";
import { kanalBasincKaybi } from "./kanal-basinc-kaybi-darcy";
describe("Kanal Basınç Kaybı", () => {
  it("1 m³/s, 200mm, 10m → ~12 Pa", () => {
    const r = kanalBasincKaybi.compute({ debi_m3s: 1, cap_mm: 200, uzunluk_m: 10 });
    expect(r.value.basinc_pa).toBeGreaterThan(5);
  });
});
