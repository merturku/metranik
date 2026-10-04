import { describe, it, expect } from "vitest";
import { havalanVentilAcikligi } from "./havalandirma-ventil-acikligi";

describe("Ventil Açıklığı", () => {
  it("3600 m³/h, 3 m/s → 0.333 m² açıklık", () => {
    const r = havalanVentilAcikligi.compute({ debi_m3h: 3600, hiz_ms: 3 });
    expect(r.value.aciklik_m2).toBeCloseTo(0.333, 2);
  });
});
