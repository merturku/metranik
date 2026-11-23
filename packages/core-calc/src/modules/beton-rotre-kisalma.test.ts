import { describe, it, expect } from "vitest";
import { betonRotreKisalma, khKatsayisi } from "./beton-rotre-kisalma";

describe("Beton Rötre", () => {
  it("C30, h0 = 200 mm (kh 0,85), εcd,0 = 0,45‰ → εcd 0,3825‰ + εca 0,05‰ = 0,4325‰; 10 m → 4,325 mm", () => {
    const r = betonRotreKisalma.compute({ fck_MPa: 30, h0_mm: 200, epsCd0_promil: 0.45, uzunluk_m: 10 });
    expect(r.intermediates.kuruma_rotresi_promil as number).toBeCloseTo(0.3825, 10);
    expect(r.intermediates.otojen_rotre_promil as number).toBeCloseTo(0.05, 10);
    expect(r.value.toplamRotre_promil).toBeCloseTo(0.4325, 10);
    expect(r.intermediates.boy_kisalmasi_mm as number).toBeCloseTo(4.325, 8);
  });
  it("kh tablo noktaları ve enterpolasyon", () => {
    expect(khKatsayisi(100)).toBe(1);
    expect(khKatsayisi(250)).toBeCloseTo(0.8, 10);
    expect(khKatsayisi(300)).toBe(0.75);
    expect(khKatsayisi(400)).toBeCloseTo(0.725, 10);
    expect(khKatsayisi(800)).toBe(0.7);
  });
});
