import { describe, expect, it } from "vitest";
import { elektrikliAracSarjSuresi } from "./elektrikli-arac-sarj-suresi";

describe("elektrikli-arac-sarj-suresi", () => {
  it("60 kWh batarya, %20 mevcut, 7.4 kW şarj, %90 verim → 48 kWh gerekli, ~7.21 saat", () => {
    const r = elektrikliAracSarjSuresi.compute({
      bataryaKapasitesi_kWh: 60,
      mevcutSarjOrani: 0.2,
      sarjGucu_P_kW: 7.4,
      sarjVerimi_eta: 0.9,
    });

    expect(r.intermediates.gerekliEnerji_kWh).toBeCloseTo(48, 5);
    expect(r.value.sarjSuresi_saat).toBeCloseTo(7.207, 2);
  });
});
