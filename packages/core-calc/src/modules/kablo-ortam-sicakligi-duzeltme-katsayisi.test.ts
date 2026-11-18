import { describe, it, expect } from "vitest";
import { kabloOrtamSicakligiDuzeltmeKatsayisi } from "./kablo-ortam-sicakligi-duzeltme-katsayisi";

const k = (yalitim: "pvc" | "xlpe", ortam: "hava" | "toprak", sicaklik_C: number) =>
  kabloOrtamSicakligiDuzeltmeKatsayisi.compute({ yalitim, ortam, sicaklik_C }).value.k;

describe("Kablo Ortam Sıcaklığı Düzeltme Katsayısı", () => {
  it("PVC 40 °C havada √(30/40) = 0,8660 (tablo 0,87); XLPE 40 °C √(50/60) = 0,9129 (tablo 0,91)", () => {
    expect(k("pvc", "hava", 40)).toBeCloseTo(0.866025, 5);
    expect(k("xlpe", "hava", 40)).toBeCloseTo(0.912871, 5);
  });
  it("referans sıcaklıkta k = 1 (hava 30, toprak 20); toprak XLPE 25 °C = 0,9636 (tablo 0,96)", () => {
    expect(k("pvc", "hava", 30)).toBeCloseTo(1, 10);
    expect(k("xlpe", "toprak", 20)).toBeCloseTo(1, 10);
    expect(k("xlpe", "toprak", 25)).toBeCloseTo(0.963624, 5);
  });
  it("θmaks ve üstü → 0; düşük ortamda 1'in üstü (PVC 5 °C = 1,2748)", () => {
    expect(k("pvc", "hava", 70)).toBe(0);
    expect(k("pvc", "hava", 85)).toBe(0);
    expect(k("pvc", "hava", 5)).toBeCloseTo(1.274755, 5);
  });
});
