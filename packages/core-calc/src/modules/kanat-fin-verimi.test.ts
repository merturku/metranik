import { describe, it, expect } from "vitest";
import { kanatFinVerimi } from "./kanat-fin-verimi";

const g = { tasinimKatsayisi_h: 25, iletkenlik_k: 200, kalinlik_mm: 1, boy_mm: 20, genislik_mm: 1000, sicaklikFarki_K: 40 };

describe("Kanat (Fin) Verimi", () => {
  it("h = 25, k = 200, t = 1 mm, L = 20 mm: m = 15,81, mL = 0,3162, η = tanh(mL)/mL = 0,968", () => {
    const r = kanatFinVerimi.compute(g);
    expect(r.intermediates.m_1_per_m as number).toBeCloseTo(15.811, 3);
    expect(r.value.kanatVerimi).toBeCloseTo(0.968, 3);
  });
  it("Q = η·h·2Lw·ΔT = 38,7 W; ideal 40 W; η < 1", () => {
    const r = kanatFinVerimi.compute(g);
    expect(r.intermediates.ideal_isi_transferi_W as number).toBeCloseTo(40, 8);
    expect(r.intermediates.kanat_isi_transferi_W as number).toBeCloseTo(38.72, 1);
  });
  it("uzun ince çelik kanatta verim düşer → sınırda; mL → 0'da η → 1", () => {
    const zayif = kanatFinVerimi.compute({ ...g, iletkenlik_k: 50, kalinlik_mm: 0.3, boy_mm: 60 });
    expect(zayif.verdict?.status).toBe("sinirda");
    expect(kanatFinVerimi.compute({ ...g, boy_mm: 0.01 }).value.kanatVerimi).toBeCloseTo(1, 6);
  });
});
