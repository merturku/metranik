import { describe, it, expect } from "vitest";
import { dogalHavalandirmaBacaEtkisi } from "./dogal-havalandirma-baca-etkisi";

describe("Doğal Havalandırma Debisi (Baca Etkisi)", () => {
  const g = { girisAlani_m2: 1, cikisAlani_m2: 1, yukseklikFarki_m: 5, icSicaklik_C: 22, disSicaklik_C: 10, cd: 0.6, hacim_m3: 200 };
  it("A1 = A2 = 1 m², H = 5 m, 22/10 °C, Cd 0,6: Q = 0,84716 m³/s; ACH = 15,25", () => {
    const r = dogalHavalandirmaBacaEtkisi.compute(g);
    expect(r.intermediates.etkin_alan_m2 as number).toBeCloseTo(Math.SQRT1_2, 10);
    expect(r.intermediates.debi_m3s as number).toBeCloseTo(0.8471607, 6);
    expect(r.value.debi_m3h).toBeCloseTo(0.8471607 * 3600, 2);
    expect(r.intermediates.hava_degisimi_1h as number).toBeCloseTo(15.2489, 3);
  });
  it("Q ∝ √H: yükseklik 4 katı → debi 2 katı", () => {
    const a = dogalHavalandirmaBacaEtkisi.compute(g).value.debi_m3h;
    const b = dogalHavalandirmaBacaEtkisi.compute({ ...g, yukseklikFarki_m: 20 }).value.debi_m3h;
    expect(b / a).toBeCloseTo(2, 10);
  });
  it("giriş alanı çok büyükse etkin alan çıkış alanına yaklaşır", () => {
    const r = dogalHavalandirmaBacaEtkisi.compute({ ...g, girisAlani_m2: 1e6 });
    expect(r.intermediates.etkin_alan_m2 as number).toBeCloseTo(1, 6);
  });
  it("iç sıcaklık ≤ dış sıcaklık reddedilir", () => {
    expect(dogalHavalandirmaBacaEtkisi.inputSchema.safeParse({ ...g, icSicaklik_C: 10 }).success).toBe(false);
  });
});
