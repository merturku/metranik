import { describe, it, expect } from "vitest";
import { termalEnerjiDeposuHacmi } from "./termal-enerji-deposu-hacmi";

describe("Termal Enerji Depolama Tank Hacmi", () => {
  it("10 kWh, ΔT = 20 K: m = 36000 / (4,186×20) = 430,0 kg → 430 L; 8 saatte 1,25 kW", () => {
    const r = termalEnerjiDeposuHacmi.compute({
      gunluk_enerji_ihtiyaci_kWh: 10,
      atim_suresi_saat: 8,
      sicaklik_farki_C: 20,
    });
    expect(r.value.hacim_L).toBeCloseTo(430.0, 1);
    expect(r.intermediates.ortalama_desarj_gucu_kW).toBe(1.25);
  });

  it("ΔT iki katına çıkınca hacim yarıya iner: 10 kWh, 40 K → 215 L", () => {
    const r = termalEnerjiDeposuHacmi.compute({
      gunluk_enerji_ihtiyaci_kWh: 10,
      atim_suresi_saat: 8,
      sicaklik_farki_C: 40,
    });
    expect(r.value.hacim_L).toBeCloseTo(215.0, 1);
  });
});
