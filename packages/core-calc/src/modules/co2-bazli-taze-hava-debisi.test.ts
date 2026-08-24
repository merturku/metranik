import { describe, expect, it } from "vitest";
import { co2BazliTazeHavaDebisi } from "./co2-bazli-taze-hava-debisi";

describe("co2-bazli-taze-hava-debisi", () => {
  it("20 kişi, G=0.0052 L/s, Cs=1000 ppm, Co=400 ppm → 173.3 L/s ≈ 624 m³/h", () => {
    const r = co2BazliTazeHavaDebisi.compute({
      kisiSayisi: 20,
      kisiBasinaCo2Uretimi_Ls: 0.0052,
      icOrtamCo2SetNoktasi_ppm: 1000,
      disOrtamCo2_ppm: 400,
    });

    expect(r.intermediates.derisimFarki_ppm).toBeCloseTo(600, 5);
    expect(r.intermediates.debisi_Ls).toBeCloseTo(173.33, 1);
    expect(r.value.tazeHavaDebisi_m3h).toBeCloseTo(624, 0);
  });
});
