import { describe, expect, it } from "vitest";
import { kesmeDonatisiAraligi } from "./kesme-donatisi-araligi";

describe("kesme-donatisi-araligi", () => {
  it("Vu=150 kN, Vc=80 kN, Av=100 mm², fyk=420 MPa, d=450 mm → s≈234.78 mm", () => {
    const r = kesmeDonatisiAraligi.compute({
      tasarimKesmeKuvveti_Vu_kN: 150,
      betonKesmeKapasitesi_Vc_kN: 80,
      etriyeKesitAlani_Av_mm2: 100,
      celikAkmaDayanimi_fyk_MPa: 420,
      faydaliYukseklik_d_mm: 450,
    });

    expect(r.intermediates.celikHesapDayanimi_fyd_MPa).toBeCloseTo(365.22, 1);
    expect(r.intermediates.celigeDusenKesme_Vs_kN).toBeCloseTo(70, 5);
    expect(r.value.gerekliAralik_s_mm).toBeCloseTo(234.78, 1);
  });
});
