import { describe, expect, it } from "vitest";
import { boruBasincKaybi } from "./boru-basinc-kaybi";

describe("boru-basinc-kaybi", () => {
  // Darcy-Weisbach, bağımsız doğrulanabilir:
  // A = π×0.1²/4 = 0.007854 m² → V = 0.01/0.007854 = 1.2732 m/s
  // ΔP = 0.02 × (50/0.1) × (1000×1.2732²/2) = 10 × 810.57 = 8105.7 Pa ≈ 8.106 kPa
  it("0.01 m³/s debi, 0.1 m çap, 50 m uzunluk, f=0.02 için basınç kaybını hesaplar", () => {
    const r = boruBasincKaybi.compute({ debi: 0.01, capD: 0.1, uzunluk: 50, surtunmeKatsayisi: 0.02 });

    expect(r.value.basincKaybi_kPa).toBeCloseTo(8.106, 2);
  });

  it("daha uzun boru daha yüksek basınç kaybı üretir", () => {
    const kisa = boruBasincKaybi.compute({ debi: 0.01, capD: 0.1, uzunluk: 20, surtunmeKatsayisi: 0.02 });
    const uzun = boruBasincKaybi.compute({ debi: 0.01, capD: 0.1, uzunluk: 80, surtunmeKatsayisi: 0.02 });

    expect(uzun.value.basincKaybi_kPa).toBeGreaterThan(kisa.value.basincKaybi_kPa);
  });
});
