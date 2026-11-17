import { describe, it, expect } from "vitest";
import { yolAydinlatmaDirekAraligi } from "./yol-aydinlatma-direk-araligi";

describe("Yol Aydınlatması Direk Aralığı", () => {
  it("15 000 lm, UF 0,45, MF 0,8, 15 lx, w 7 m: s = 5400/105 = 51,43 m; geri doğrulama Eort = 15 lx", () => {
    const r = yolAydinlatmaDirekAraligi.compute({ aki_lm: 15000, uf: 0.45, mf: 0.8, hedefLux: 15, yolGenisligi_m: 7 });
    expect(r.value.direkAraligi_m).toBeCloseTo(51.42857, 4);
    expect(r.intermediates.armatur_basina_aydinlik_lx as number).toBeCloseTo(15, 8);
  });
  it("hedef aydınlık iki katı → aralık yarısı; yol genişliği iki katı → aralık yarısı", () => {
    const a = yolAydinlatmaDirekAraligi.compute({ aki_lm: 15000, uf: 0.45, mf: 0.8, hedefLux: 15, yolGenisligi_m: 7 }).value.direkAraligi_m;
    expect(yolAydinlatmaDirekAraligi.compute({ aki_lm: 15000, uf: 0.45, mf: 0.8, hedefLux: 30, yolGenisligi_m: 7 }).value.direkAraligi_m / a).toBeCloseTo(0.5, 10);
    expect(yolAydinlatmaDirekAraligi.compute({ aki_lm: 15000, uf: 0.45, mf: 0.8, hedefLux: 15, yolGenisligi_m: 14 }).value.direkAraligi_m / a).toBeCloseTo(0.5, 10);
  });
});
