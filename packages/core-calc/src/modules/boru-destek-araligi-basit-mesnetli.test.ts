import { describe, expect, it } from "vitest";
import { boruDestekAraligiBasitMesnetli } from "./boru-destek-araligi-basit-mesnetli";

describe("boru-destek-araligi-basit-mesnetli", () => {
  it("σizin=140 MPa, S=20000 mm³, w=20 N/mm → L≈1058.3 mm (1.058 m)", () => {
    const r = boruDestekAraligiBasitMesnetli.compute({
      izinVerilenGerilme_sigma_MPa: 140,
      kesitModulu_S_mm3: 20000,
      birimUzunlukYuku_w_Nmm: 20,
    });

    expect(r.intermediates.maksimumAralik_mm).toBeCloseTo(1058.3, 1);
    expect(r.value.maksimumAralik_L_m).toBeCloseTo(1.0583, 3);
  });
});
