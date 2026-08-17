import { describe, expect, it } from "vitest";
import { kapaliOtoparkHavalandirma } from "./kapali-otopark-havalandirma";

describe("kapali-otopark-havalandirma", () => {
  it("50 araç, 0.001 m³/h/araç CO, izin=35ppm, dış=5ppm → 1666.67 m³/h", () => {
    const r = kapaliOtoparkHavalandirma.compute({
      aracSayisi: 50,
      aracBasiCOUretimi_m3h: 0.001,
      izinVerilenCO_ppm: 35,
      disOrtamCO_ppm: 5,
    });

    expect(r.intermediates.toplamCOUretimi_m3h).toBeCloseTo(0.05, 5);
    expect(r.intermediates.derisimFarki_ppm).toBeCloseTo(30, 5);
    expect(r.value.gerekliDebi_m3h).toBeCloseTo(1666.67, 1);
  });
});
