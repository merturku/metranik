import { describe, it, expect } from "vitest";
import { betonAğirlikHesabi } from "./insaat-beton-agirlik-hesabi";

describe("Beton Ağırlık", () => {
  it("10 m³, 2400 kg/m³ → 24 ton", () => {
    const r = betonAğirlikHesabi.compute({ hacim_m3: 10, yoğunluk_kgm3: 2400 });
    expect(r.value.agirlik_ton).toBeCloseTo(24, 1);
  });
});
