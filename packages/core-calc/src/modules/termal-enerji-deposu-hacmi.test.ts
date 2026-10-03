import { describe, it, expect } from "vitest";
import { termalEnerjiDeposuHacmi } from "./termal-enerji-deposu-hacmi";

describe("Termal Enerji Depolama Tank Hacmi", () => {
  it("EN 12392 örneği: 10 kWh/gün, 8h atım, 20°C fark → ~150 L", () => {
    const result = termalEnerjiDeposuHacmi.compute({
      gunluk_enerji_ihtiyaci_kWh: 10,
      atim_suresi_saat: 8,
      sicaklik_farki_C: 20,
    });
    expect(result.value.hacim_L).toBeCloseTo(150, 0);
  });
});
