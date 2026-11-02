import { describe, it, expect } from "vitest";
import { betonCatlamaMomenti } from "./beton-catlama-momenti";

describe("Betonarme Kesit Çatlama Momenti", () => {
  const o = { fck_MPa: 30, genislik_mm: 300, yukseklik_mm: 500, servisMomenti_kNm: 30 };
  it("C30, 300×500: fctm = 2,896 MPa, Mcr = 36,2 kNm (EN 1992-1-1 Tablo 3.1: C30 fctm = 2,9)", () => {
    const r = betonCatlamaMomenti.compute(o);
    expect(r.intermediates.fctm_MPa as number).toBeCloseTo(2.9, 1);
    expect(r.value.Mcr_kNm).toBeCloseTo(36.2, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("Msd = 50 kNm > Mcr → çatlamış", () => {
    expect(betonCatlamaMomenti.compute({ ...o, servisMomenti_kNm: 50 }).verdict?.status).toBe("sinirda");
  });
});
