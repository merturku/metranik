import { describe, it, expect } from "vitest";
import { bulonKesmeCekmeEtkilesimi } from "./bulon-kesme-cekme-etkilesimi";

const g = { sinif: "8.8" as const, duzlem: "disli" as const, d_mm: 16, as_mm2: 157, fvEd_kN: 30, ftEd_kN: 40 };

describe("Bulon Kesme–Çekme Etkileşimi", () => {
  it("M16 8.8, dişli düzlem: Fv,Rd 60,288 kN; Ft,Rd 90,432 kN; 0,4976 + 0,3159 = 0,8136 → uygun", () => {
    const r = bulonKesmeCekmeEtkilesimi.compute(g);
    expect(r.intermediates.Fv_Rd_kN as number).toBeCloseTo(60.288, 3);
    expect(r.intermediates.Ft_Rd_kN as number).toBeCloseTo(90.432, 3);
    expect(r.value.etkilesimOrani).toBeCloseTo(0.81356, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("gövdeden kesme: A = π16²/4 = 201,06 mm², αv 0,6 → Fv,Rd 77,2 kN; 10.9 dişli αv 0,5", () => {
    const r = bulonKesmeCekmeEtkilesimi.compute({ ...g, duzlem: "govde" });
    expect(r.intermediates.Fv_Rd_kN as number).toBeCloseTo((0.6 * 800 * ((Math.PI * 256) / 4)) / 1.25 / 1000, 6);
    expect(bulonKesmeCekmeEtkilesimi.compute({ ...g, sinif: "10.9" }).intermediates.alfa_v).toBe(0.5);
  });
  it("etkileşim > 1 uygunsuz; 0,9–1 sınırda", () => {
    expect(bulonKesmeCekmeEtkilesimi.compute({ ...g, fvEd_kN: 50, ftEd_kN: 70 }).verdict?.status).toBe("uygunsuz");
    expect(bulonKesmeCekmeEtkilesimi.compute({ ...g, fvEd_kN: 36, ftEd_kN: 40 }).verdict?.status).toBe("sinirda");
  });
});
