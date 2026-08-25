import { describe, expect, it } from "vitest";
import { depremYatayYukDagilimi } from "./deprem-yatay-yuk-dagilimi";

describe("deprem-yatay-yuk-dagilimi", () => {
  it("Vt=1000 kN, ΔFN=50 kN, wihi=8000 kNm, Σwjhj=40000 kNm, en üst kat → Fi=240 kN", () => {
    const r = depremYatayYukDagilimi.compute({
      tabanKesmeKuvveti_Vt_kN: 1000,
      enUstKatEkKuvveti_DeltaFN_kN: 50,
      katAgirlikYukseklikCarpimi_wihi_kNm: 8000,
      toplamAgirlikYukseklikCarpimi_kNm: 40000,
      buKatEnUstKatMi: "evet",
    });

    expect(r.intermediates.kalanKuvvet_kN).toBeCloseTo(950, 5);
    expect(r.intermediates.katPayOrani).toBeCloseTo(0.2, 5);
    expect(r.value.katKesmeKuvveti_Fi_kN).toBeCloseTo(240, 5);
  });
});
