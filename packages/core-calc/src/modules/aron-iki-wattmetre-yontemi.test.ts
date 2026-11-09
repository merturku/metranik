import { describe, it, expect } from "vitest";
import { aronIkiWattmetreYontemi } from "./aron-iki-wattmetre-yontemi";

describe("İki Wattmetre (Aron) Yöntemi", () => {
  it("W1 = 1500, W2 = 500: P = 2000, Q = √3·1000 = 1732,05, S = 2645,75, cosφ = 0,7559", () => {
    const r = aronIkiWattmetreYontemi.compute({ w1_W: 1500, w2_W: 500 });
    expect(r.value.aktifGuc_W).toBe(2000);
    expect(r.intermediates.reaktif_guc_VAr as number).toBeCloseTo(1732.05, 1);
    expect(r.intermediates.gorunen_guc_VA as number).toBeCloseTo(2645.75, 1);
    expect(r.intermediates.guc_faktoru as number).toBeCloseTo(0.7559, 4);
  });
  it("W2 = 0 ise cosφ = 0,5 (φ = 60°); W1 = W2 ise cosφ = 1", () => {
    const a = aronIkiWattmetreYontemi.compute({ w1_W: 1000, w2_W: 0 });
    expect(a.intermediates.guc_faktoru as number).toBeCloseTo(0.5, 8);
    expect(a.intermediates.faz_acisi_derece as number).toBeCloseTo(60, 6);
    const b = aronIkiWattmetreYontemi.compute({ w1_W: 800, w2_W: 800 });
    expect(b.intermediates.guc_faktoru as number).toBeCloseTo(1, 8);
  });
  it("W2 negatifse cosφ < 0,5", () => {
    const r = aronIkiWattmetreYontemi.compute({ w1_W: 1000, w2_W: -200 });
    expect(r.intermediates.guc_faktoru as number).toBeLessThan(0.5);
  });
});
