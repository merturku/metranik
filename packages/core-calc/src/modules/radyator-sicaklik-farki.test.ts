import { describe, it, expect } from "vitest";
import { radyatorSicaklikFarki } from "./radyator-sicaklik-farki";

describe("Radyatör Sıcaklık Farkı", () => {
  it("EN 442: Q=62790 W, ṁ=1 kg/s, c=4186 J/kg°C → ΔT ≈ 15°C, uygun", () => {
    const r = radyatorSicaklikFarki.compute({
      isi_yuku_W: 62790,
      kutlesel_debi_kgs: 1,
      ozgul_isi_Jkg: 4186,
      min_sicaklik_farki: 10,
      max_sicaklik_farki: 20,
    });

    expect(r.value.sicaklik_farki_C).toBeCloseTo(15, 0);
    expect(r.value.verdict?.status).toBe("uygun");
  });

  it("Düşük sıcaklık farkı: Q=31395 W, ṁ=1 kg/s → ΔT ≈ 7.5°C, düşük", () => {
    const r = radyatorSicaklikFarki.compute({
      isi_yuku_W: 31395,
      kutlesel_debi_kgs: 1,
      ozgul_isi_Jkg: 4186,
      min_sicaklik_farki: 10,
      max_sicaklik_farki: 20,
    });

    expect(r.value.sicaklik_farki_C).toBeCloseTo(7.5, 0);
    expect(r.value.verdict?.status).toBe("düşük");
  });
});
