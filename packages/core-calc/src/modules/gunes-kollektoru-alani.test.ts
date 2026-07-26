import { describe, expect, it } from "vitest";
import { gunesKollektoruAlani } from "./gunes-kollektoru-alani";

describe("gunes-kollektoru-alani", () => {
  it("Q=10kWh/gün, I=5kWh/m²gün, verim=0.5 → 4 m²", () => {
    const r = gunesKollektoruAlani.compute({
      gunlukEnerjiIhtiyaci_Q_kWh: 10,
      gunesRadyasyonu_I_kWhm2gun: 5,
      kollektorVerimi: 0.5,
    });

    expect(r.value.gerekliAlan_m2).toBeCloseTo(4, 5);
  });
});
