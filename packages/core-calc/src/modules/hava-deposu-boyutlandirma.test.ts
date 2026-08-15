import { describe, expect, it } from "vitest";
import { havaDeposuBoyutlandirma } from "./hava-deposu-boyutlandirma";

describe("hava-deposu-boyutlandirma", () => {
  it("Q=500L/dk, t=1dk, Pa=1bar, P1=8bar, P2=6bar → 250 L", () => {
    const r = havaDeposuBoyutlandirma.compute({
      talepDebisi_Q_Ldk: 500,
      talepSuresi_t_dk: 1,
      atmosferBasinci_Pa_bar: 1,
      depoUstBasinc_P1_bar: 8,
      depoAltBasinc_P2_bar: 6,
    });

    expect(r.intermediates.basincFarki_bar).toBeCloseTo(2, 5);
    expect(r.value.gerekliHacim_L).toBeCloseTo(250, 5);
  });
});
