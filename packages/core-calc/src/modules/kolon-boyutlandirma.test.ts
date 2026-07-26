import { describe, expect, it } from "vitest";
import { kolonBoyutlandirma } from "./kolon-boyutlandirma";

describe("kolon-boyutlandirma", () => {
  it("TS 500: C25/B420C, Ac=90000mm², As=2513mm² → ~2157.2 kN", () => {
    const r = kolonBoyutlandirma.compute({
      betonKarakteristikDayanim_fck_MPa: 25,
      celikAkmaDayanimi_fyk_MPa: 420,
      kolonKesitAlani_Ac_mm2: 90000,
      donatiAlani_As_mm2: 2513,
    });

    expect(r.intermediates.betonHesapDayanimi_fcd_MPa).toBeCloseTo(16.667, 2);
    expect(r.intermediates.celikHesapDayanimi_fyd_MPa).toBeCloseTo(365.217, 2);
    expect(r.value.eksenelKapasite_kN).toBeCloseTo(2157.19, 1);
  });
});
