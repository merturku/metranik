import { describe, it, expect } from "vitest";
import { boruYalitimMetraji } from "./boru-yalitim-metraji";

describe("Boru Yalıtımı Metrajı", () => {
  it("D 114,3, t 30, L 100 m → 1,360 m³; dış yüzey π·0,1743·100 = 54,76 m²", () => {
    const r = boruYalitimMetraji.compute({ boruDisCapi_mm: 114.3, yalitimKalinligi_mm: 30, boruUzunlugu_m: 100, fireYuzde: 0 });
    expect(r.value.yalitimHacmi_m3).toBeCloseTo(1.36, 3);
    expect(r.intermediates.dis_yuzey_alani_m2 as number).toBeCloseTo(54.76, 2);
    expect(r.intermediates.yalitim_dis_capi_mm as number).toBeCloseTo(174.3, 6);
  });
  it("%10 fire hacmi 1,1 katına çıkarır", () => {
    const a = boruYalitimMetraji.compute({ boruDisCapi_mm: 114.3, yalitimKalinligi_mm: 30, boruUzunlugu_m: 100, fireYuzde: 0 }).value.yalitimHacmi_m3;
    const b = boruYalitimMetraji.compute({ boruDisCapi_mm: 114.3, yalitimKalinligi_mm: 30, boruUzunlugu_m: 100, fireYuzde: 10 }).value.yalitimHacmi_m3;
    expect(b / a).toBeCloseTo(1.1, 9);
  });
});
