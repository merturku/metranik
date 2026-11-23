import { describe, it, expect } from "vitest";
import { donatiBindirmeBoyu } from "./donati-bindirme-boyu";

const g = { temelKenetlenmeBoyu_mm: 600, capi_mm: 16, bindirilenOrani_yuzde: 50, digerKatsayilarCarpimi: 1 };

describe("Donatı Bindirme Boyu", () => {
  it("ρ1 = %50 → α6 = √2 = 1,414; l0 = 848,5 mm (asgari 254,6 / 240 / 200 mm'den büyük)", () => {
    const r = donatiBindirmeBoyu.compute(g);
    expect(r.intermediates.alfa6 as number).toBeCloseTo(Math.SQRT2, 10);
    expect(r.value.bindirmeBoyu_mm).toBeCloseTo(600 * Math.SQRT2, 8);
  });
  it("ρ1 ≤ %25 → α6 = 1; ρ1 = %100 → 1,5 ile sınırlı", () => {
    expect(donatiBindirmeBoyu.compute({ ...g, bindirilenOrani_yuzde: 10 }).intermediates.alfa6).toBe(1);
    expect(donatiBindirmeBoyu.compute({ ...g, bindirilenOrani_yuzde: 100 }).intermediates.alfa6).toBe(1.5);
  });
  it("küçük kenetlenme boyunda asgari değer belirleyici: lb = 100, φ = 20 → 15φ = 300 mm", () => {
    const r = donatiBindirmeBoyu.compute({ ...g, temelKenetlenmeBoyu_mm: 100, capi_mm: 20, bindirilenOrani_yuzde: 25, digerKatsayilarCarpimi: 0.7 });
    expect(r.value.bindirmeBoyu_mm).toBeCloseTo(300, 10);
    expect(r.intermediates.asgari_belirleyici).toBe("asgari");
  });
});
