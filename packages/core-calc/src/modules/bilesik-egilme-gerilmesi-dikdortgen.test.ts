import { describe, it, expect } from "vitest";
import { bilesikEgilmeGerilmesiDikdortgen } from "./bilesik-egilme-gerilmesi-dikdortgen";

describe("Bileşik Eğilme Gerilmesi (Dikdörtgen)", () => {
  const g = { genislik_b_mm: 300, yukseklik_h_mm: 500, eksenelBasinc_N_kN: 600, momentMx_kNm: 40, momentMy_kNm: 15, izinVerilenBasinc_MPa: 12 };
  it("N/A = 4; Mx/Wx = 3,2; My/Wy = 2 → σmaks 9,2; σmin −1,2 MPa (çekme → sınırda)", () => {
    const r = bilesikEgilmeGerilmesiDikdortgen.compute(g);
    expect(r.intermediates.eksenel_gerilme_MPa as number).toBeCloseTo(4, 10);
    expect(r.intermediates.Mx_gerilmesi_MPa as number).toBeCloseTo(3.2, 10);
    expect(r.intermediates.My_gerilmesi_MPa as number).toBeCloseTo(2, 10);
    expect(r.value.maksBasincGerilmesi_MPa).toBeCloseTo(9.2, 10);
    expect(r.intermediates.min_gerilme_MPa as number).toBeCloseTo(-1.2, 10);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("çekirdek: ex/h + ey/b = 0,2167 > 1/6 ile σmin < 0 tutarlı; küçük moment → uygun; izin aşılırsa uygunsuz", () => {
    const r = bilesikEgilmeGerilmesiDikdortgen.compute(g);
    expect(r.intermediates.cekirdek_orani_ex_h_ey_b as number).toBeCloseTo(0.216667, 5);
    expect(bilesikEgilmeGerilmesiDikdortgen.compute({ ...g, momentMx_kNm: 10, momentMy_kNm: 5 }).verdict?.status).toBe("uygun");
    expect(bilesikEgilmeGerilmesiDikdortgen.compute({ ...g, izinVerilenBasinc_MPa: 9 }).verdict?.status).toBe("uygunsuz");
  });
});
