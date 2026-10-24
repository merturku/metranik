import { describe, it, expect } from "vitest";
import { radyatorDebiSicaklik } from "./radyator-debi-sicaklik-iliskisi";
describe("Radyatör", () => {
  it("10000 W, 10 L/min → 14.4°C fark", () => {
    const r = radyatorDebiSicaklik.compute({ isi_W: 10000, debi_Lmin: 10 });
    expect(r.value.sicaklik_farki_C).toBeGreaterThan(12);
  });
});
