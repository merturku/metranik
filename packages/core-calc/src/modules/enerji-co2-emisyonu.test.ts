import { describe, it, expect } from "vitest";
import { enerjiCo2Emisyonu } from "./enerji-co2-emisyonu";

describe("Enerji CO₂ Emisyonu", () => {
  it("3000 kWh × 0,45 + 1000 m³ × 1,935 = 3285 kg", () => {
    const r = enerjiCo2Emisyonu.compute({ elektrik_kWh: 3000, elektrikFaktoru_kgkWh: 0.45, dogalgaz_m3: 1000, dogalgazFaktoru_kgm3: 1.935 });
    expect(r.value.toplamEmisyon_kg).toBeCloseTo(3285, 6);
    expect(r.intermediates.elektrik_payi_yuzde as number).toBeCloseTo((1350 / 3285) * 100, 6);
  });
  it("hiç tüketim yoksa 0 ve pay 0", () => {
    const r = enerjiCo2Emisyonu.compute({ elektrik_kWh: 0, elektrikFaktoru_kgkWh: 0.45, dogalgaz_m3: 0, dogalgazFaktoru_kgm3: 1.935 });
    expect(r.value.toplamEmisyon_kg).toBe(0);
    expect(r.intermediates.elektrik_payi_yuzde).toBe(0);
  });
  it("IPCC çevrimi: 56,1 kg/GJ × 34,5 MJ/m³ ≈ 1,935", () => {
    expect((56.1 * 34.5) / 1000).toBeCloseTo(1.935, 3);
  });
});
