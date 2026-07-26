import { describe, expect, it } from "vitest";
import { kolonOnBoyutlandirma } from "./kolon-on-boyutlandirma";

describe("kolon-on-boyutlandirma", () => {
  it("N=1500kN, fck=25MPa → 1500 cm², önerilen kenar ~387.3mm", () => {
    const r = kolonOnBoyutlandirma.compute({
      eksenelYuk_N_kN: 1500,
      betonKarakteristikDayanim_fck_MPa: 25,
    });

    expect(r.value.gerekliKesitAlani_cm2).toBeCloseTo(1500, 5);
    expect(r.intermediates.onerilenKareKenar_mm).toBeCloseTo(387.298, 1);
  });
});
