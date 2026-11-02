import { describe, it, expect } from "vitest";
import { pompalamaSpesifikEnerjisi } from "./pompalama-spesifik-enerjisi";

describe("Pompalama Spesifik Enerjisi", () => {
  it("30 mSS, η 0,6 → 0,0817/0,6 = 0,1362 kWh/m³; 100 000 m³ × 3 ₺ = 40 861 ₺", () => {
    const r = pompalamaSpesifikEnerjisi.compute({ basma_mSS: 30, toplamVerim: 0.6, yillikHacim_m3: 100000, elektrikFiyati_TLkWh: 3 });
    expect(r.intermediates.hidrolik_enerji_kWhm3 as number).toBeCloseTo(0.081722, 5);
    expect(r.value.spesifikEnerji_kWhm3).toBeCloseTo(0.136203, 5);
    expect(r.intermediates.yillik_maliyet_TL as number).toBeCloseTo(40860.9, 0);
  });
});
