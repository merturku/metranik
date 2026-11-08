import { describe, it, expect } from "vitest";
import { dosemeOluYukuKatmanlar } from "./doseme-olu-yuku-katmanlar";

const g = {
  katman1_mm: 150, katman1_gamma: 25, katman2_mm: 50, katman2_gamma: 22, katman3_mm: 15, katman3_gamma: 27,
  katman4_mm: 20, katman4_gamma: 20, hareketliYuk_kNm2: 2,
};

describe("Döşeme Ölü Yükü (Katmanlar)", () => {
  it("150·25 + 50·22 + 15·27 + 20·20 (mm·kN/m³) = 3,75 + 1,10 + 0,405 + 0,40 = 5,655 kN/m²", () => {
    const r = dosemeOluYukuKatmanlar.compute(g);
    expect(r.value.oluYuk_kNm2).toBeCloseTo(5.655, 6);
  });
  it("q = 2: TS 500 1,4g + 1,6q = 11,117; EN 1990 1,35g + 1,5q = 10,634 kN/m²", () => {
    const r = dosemeOluYukuKatmanlar.compute(g);
    expect(r.intermediates.tasarim_yuku_TS500_kNm2 as number).toBeCloseTo(11.117, 3);
    expect(r.intermediates.tasarim_yuku_EN1990_kNm2 as number).toBeCloseTo(10.63425, 4);
  });
  it("boş katmanlar katkı vermez", () => {
    const r = dosemeOluYukuKatmanlar.compute({ ...g, katman2_mm: 0, katman3_mm: 0, katman4_mm: 0 });
    expect(r.value.oluYuk_kNm2).toBeCloseTo(3.75, 8);
  });
});
