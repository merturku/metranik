import { describe, expect, it } from "vitest";
import { zeminYatakKatsayisiDuzeltmesi } from "./zemin-yatak-katsayisi-duzeltmesi";

describe("zemin-yatak-katsayisi-duzeltmesi", () => {
  it("kohezyonsuz zemin: k1=20000kN/m³, B=1.5m → 7200 kN/m³", () => {
    const r = zeminYatakKatsayisiDuzeltmesi.compute({
      plakaYatakKatsayisi_k1_kNm3: 20000,
      temelGenisligi_B_m: 1.5,
      zeminTipi: "kohezyonsuz",
    });

    expect(r.intermediates.duzeltmeKatsayisi).toBeCloseTo(0.36, 5);
    expect(r.value.duzeltilmisYatakKatsayisi_k_kNm3).toBeCloseTo(7200, 5);
  });

  it("kohezyonlu zemin: k1=20000kN/m³, B=1.5m → 4000 kN/m³", () => {
    const r = zeminYatakKatsayisiDuzeltmesi.compute({
      plakaYatakKatsayisi_k1_kNm3: 20000,
      temelGenisligi_B_m: 1.5,
      zeminTipi: "kohezyonlu",
    });

    expect(r.value.duzeltilmisYatakKatsayisi_k_kNm3).toBeCloseTo(4000, 5);
  });
});
