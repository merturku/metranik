import { describe, it, expect } from "vitest";
import { tabanPlakasiKalinligi } from "./taban-plakasi-kalinligi";

describe("Taban Plakası Kalınlığı", () => {
  it("d 290, bf 300, N = B = 400, Pu 1200 kN, Fy 275: m 62,25; n 80; n' 73,74; l 80; t = 19,695 mm → 20 mm", () => {
    const r = tabanPlakasiKalinligi.compute({ pu_kN: 1200, d_mm: 290, bf_mm: 300, N_mm: 400, B_mm: 400, fy_MPa: 275 });
    expect(r.intermediates.m_mm as number).toBeCloseTo(62.25, 8);
    expect(r.intermediates.n_mm as number).toBeCloseTo(80, 8);
    expect(r.intermediates.n_prime_mm as number).toBeCloseTo(73.7394, 3);
    expect(r.value.kalinlik_mm).toBeCloseTo(19.6946, 3);
    expect(r.intermediates.kalinlik_yukari_mm).toBe(20);
  });
  it("yük dört katı → kalınlık iki katı", () => {
    const g = { d_mm: 290, bf_mm: 300, N_mm: 400, B_mm: 400, fy_MPa: 275 };
    const a = tabanPlakasiKalinligi.compute({ ...g, pu_kN: 1200 }).value.kalinlik_mm;
    expect(tabanPlakasiKalinligi.compute({ ...g, pu_kN: 4800 }).value.kalinlik_mm / a).toBeCloseTo(2, 10);
  });
});
