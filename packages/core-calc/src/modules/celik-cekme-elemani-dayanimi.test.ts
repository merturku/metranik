import { describe, it, expect } from "vitest";
import { celikCekmeElemaniDayanimi, celikCekmeElemaniDayanimiInputSchema } from "./celik-cekme-elemani-dayanimi";

// S355 (fy 355, fu 490), A = 2000 mm², Anet = 1700 mm²:
// Npl,Rd = 2000·355/1,0 = 710 kN;  Nu,Rd = 0,9·1700·490/1,25 = 599,76 kN → NRd = 599,76 kN.
const ornek = {
  brutAlan_mm2: 2000,
  netAlan_mm2: 1700,
  akmaDayanimi_fy_MPa: 355,
  cekmeDayanimi_fu_MPa: 490,
  tasarimCekmeKuvveti_NEd_kN: 500,
};

describe("Çelik Çekme Elemanı Dayanımı", () => {
  it("Npl,Rd = 710 kN, Nu,Rd = 599,76 kN, NRd net kesit kopması", () => {
    const r = celikCekmeElemaniDayanimi.compute(ornek);
    expect(r.intermediates.Npl_Rd_kN).toBeCloseTo(710, 6);
    expect(r.intermediates.Nu_Rd_kN).toBeCloseTo(599.76, 6);
    expect(r.value.cekmeDayanimi_NRd_kN).toBeCloseTo(599.76, 6);
    expect(r.intermediates.belirleyici).toMatch(/Net kesit/);
  });

  it("NEd = 500 kN uygun; 650 kN uygunsuz", () => {
    expect(celikCekmeElemaniDayanimi.compute(ornek).verdict?.status).toBe("uygun");
    expect(celikCekmeElemaniDayanimi.compute({ ...ornek, tasarimCekmeKuvveti_NEd_kN: 650 }).verdict?.status).toBe("uygunsuz");
  });

  it("delik yoksa (Anet = A) brüt kesit akması belirleyici: 710 vs 0,9·2000·490/1,25 = 705,6 → 705,6 kN", () => {
    const r = celikCekmeElemaniDayanimi.compute({ ...ornek, netAlan_mm2: 2000 });
    expect(r.value.cekmeDayanimi_NRd_kN).toBeCloseTo(705.6, 6);
  });

  it("net alan brüt alandan büyükse reddedilir", () => {
    expect(celikCekmeElemaniDayanimiInputSchema.safeParse({ ...ornek, netAlan_mm2: 2500 }).success).toBe(false);
  });
});
