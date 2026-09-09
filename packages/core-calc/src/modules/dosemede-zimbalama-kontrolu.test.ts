import { describe, expect, it } from "vitest";
import { dosemedeZimbalamaKontrolu } from "./dosemede-zimbalama-kontrolu";

describe("dosemede-zimbalama-kontrolu", () => {
  it("c=400mm, d=150mm, fck=25MPa, Vu=300kN → u=2200mm, Vc=577.5kN → uygun", () => {
    const r = dosemedeZimbalamaKontrolu.compute({
      kolonKenari_c_mm: 400,
      doseFaydaliYukseklik_d_mm: 150,
      betonKarakteristikDayanim_fck_MPa: 25,
      etkiyenYuk_Vu_kN: 300,
    });

    expect(r.intermediates.kritikCevre_u_mm).toBeCloseTo(2200, 5);
    expect(r.value.zimbalamaKapasitesi_Vc_kN).toBeCloseTo(577.5, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
});
