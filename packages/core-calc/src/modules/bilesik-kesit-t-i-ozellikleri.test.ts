import { describe, it, expect } from "vitest";
import { bilesikKesitTIOzellikleri } from "./bilesik-kesit-t-i-ozellikleri";

describe("Bileşik Kesit T / I", () => {
  it("I: bf = 100, tf = 10, hw = 180, tw = 6 → h = 200, A = 3080, I = 2,0983e7 mm⁴", () => {
    const r = bilesikKesitTIOzellikleri.compute({ sekil: "I", baslikGenisligi_bf_mm: 100, baslikKalinligi_tf_mm: 10, govdeYuksekligi_hw_mm: 180, govdeKalinligi_tw_mm: 6 });
    expect(r.intermediates.alan_mm2).toBe(3080);
    expect(r.value.atalet_mm4 / 1e7).toBeCloseTo(2.0983, 3);
  });
  it("T: bf = 200, tf = 20, hw = 180, tw = 20 → A = 7600, ȳ = 57,37 mm, I ≈ 28,80e6 mm⁴", () => {
    const r = bilesikKesitTIOzellikleri.compute({ sekil: "T", baslikGenisligi_bf_mm: 200, baslikKalinligi_tf_mm: 20, govdeYuksekligi_hw_mm: 180, govdeKalinligi_tw_mm: 20 });
    expect(r.intermediates.alan_mm2).toBe(7600);
    expect(r.intermediates.agirlik_merkezi_ust_mm as number).toBeCloseTo(57.368, 2);
    expect(r.value.atalet_mm4 / 1e6).toBeCloseTo(28.8, 1);
  });
  it("I'da gövde ve başlık aynı kalınlık/genişlikse dikdörtgene iner: I = b·h³/12", () => {
    const r = bilesikKesitTIOzellikleri.compute({ sekil: "I", baslikGenisligi_bf_mm: 50, baslikKalinligi_tf_mm: 10, govdeYuksekligi_hw_mm: 80, govdeKalinligi_tw_mm: 50 });
    expect(r.value.atalet_mm4).toBeCloseTo((50 * 100 ** 3) / 12, 4);
  });
});
