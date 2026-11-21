import { describe, it, expect } from "vitest";
import { lmtdDuzeltmeFaktoruF } from "./lmtd-duzeltme-faktoru-f";

describe("LMTD Düzeltme Faktörü F", () => {
  it("Th 150→90, Tc 30→70: P = 1/3, R = 1,5, F ≈ 0,9105, LMTD_cf ≈ 69,52 K", () => {
    const r = lmtdDuzeltmeFaktoruF.compute({ sicakGiris_C: 150, sicakCikis_C: 90, soguukGiris_C: 30, soguukCikis_C: 70 });
    expect(r.intermediates.P as number).toBeCloseTo(1 / 3, 10);
    expect(r.intermediates.R as number).toBeCloseTo(1.5, 10);
    expect(r.intermediates.lmtd_karsit_akis_K as number).toBeCloseTo(69.5212, 3);
    expect(r.value.F as number).toBeCloseTo(0.91048, 4);
    expect(r.value.lmtdDuzeltilmis_K as number).toBeCloseTo(63.2977, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("R = 1 özel kolu: Th 120→80, Tc 40→80 → F ≈ 0,8023", () => {
    const r = lmtdDuzeltmeFaktoruF.compute({ sicakGiris_C: 120, sicakCikis_C: 80, soguukGiris_C: 40, soguukCikis_C: 80 });
    expect(r.value.F as number).toBeCloseTo(0.80228, 4);
    expect(r.value.lmtdDuzeltilmis_K as number).toBeCloseTo(32.0911, 3);
  });
  it("R = 1 kolu R ≈ 1'e yakın değerle süreklidir (R = 1,0000001)", () => {
    const a = lmtdDuzeltmeFaktoruF.compute({ sicakGiris_C: 120, sicakCikis_C: 80, soguukGiris_C: 40, soguukCikis_C: 80 });
    const b = lmtdDuzeltmeFaktoruF.compute({ sicakGiris_C: 120, sicakCikis_C: 80, soguukGiris_C: 40, soguukCikis_C: 79.999996 });
    expect(Math.abs((a.value.F as number) - (b.value.F as number))).toBeLessThan(1e-4);
  });
  it("sıcaklık kesişmesi (Tc2 > Th2 ve yüksek P): F null + uygunsuz", () => {
    const r = lmtdDuzeltmeFaktoruF.compute({ sicakGiris_C: 100, sicakCikis_C: 40, soguukGiris_C: 30, soguukCikis_C: 90 });
    expect(r.value.F).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
