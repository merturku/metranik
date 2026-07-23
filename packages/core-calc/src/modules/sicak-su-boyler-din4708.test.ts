import { describe, expect, it } from "vitest";
import { sicakSuBoylerDin4708 } from "./sicak-su-boyler-din4708";

describe("sicak-su-boyler-din4708", () => {
  // recovery = 10×860/35 = 245.714 L/saat; depo = 500 − 245.714×1 = 254.286 L,
  // bağımsız doğrulanabilir (enerji korunumu, 860 kcal/kWh sabiti).
  it("500 L pik talep, 10 kW ısıtıcı, ΔT=35 için depo hacmini hesaplar", () => {
    const r = sicakSuBoylerDin4708.compute({
      pikTalep_L: 500,
      pikSuresi_saat: 1,
      isiticiGucu_kW: 10,
      deltaT: 35,
    });

    expect(r.value.depoHacmi_L).toBeCloseTo(254.29, 1);
  });

  it("ısıtıcı gücü pik talebi tek başına karşılıyorsa depo ihtiyacı sıfırlanır", () => {
    const r = sicakSuBoylerDin4708.compute({
      pikTalep_L: 100,
      pikSuresi_saat: 1,
      isiticiGucu_kW: 24,
      deltaT: 35,
    });

    expect(r.value.depoHacmi_L).toBe(0);
  });
});
