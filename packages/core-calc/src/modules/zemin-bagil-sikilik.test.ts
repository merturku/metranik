import { describe, it, expect } from "vitest";
import { zeminBagilSikilik } from "./zemin-bagil-sikilik";

describe("Zemin Bağıl Sıkılık", () => {
  it("Gs 2,65, γd 16,5 kN/m³, emaks 0,80, emin 0,45: e = 0,5756, Dr = %64,1 → Orta sıkı", () => {
    const r = zeminBagilSikilik.compute({ ozgulAgirlikGs: 2.65, kuruBirimHacimAgirlik_kNm3: 16.5, emaks: 0.8, emin: 0.45 });
    expect(r.intermediates.bosluk_orani_e as number).toBeCloseTo(0.5756, 3);
    expect(r.value.bagilSikilik_yuzde).toBeCloseTo(64.13, 1);
    expect(r.intermediates.sinif).toBe("Orta sıkı");
  });
  it("e = emin → %100; e = emaks → %0", () => {
    const gd = (e: number) => (2.65 * 9.81) / (1 + e);
    expect(zeminBagilSikilik.compute({ ozgulAgirlikGs: 2.65, kuruBirimHacimAgirlik_kNm3: gd(0.45), emaks: 0.8, emin: 0.45 }).value.bagilSikilik_yuzde).toBeCloseTo(100, 6);
    expect(zeminBagilSikilik.compute({ ozgulAgirlikGs: 2.65, kuruBirimHacimAgirlik_kNm3: gd(0.8), emaks: 0.8, emin: 0.45 }).value.bagilSikilik_yuzde).toBeCloseTo(0, 6);
  });
  it("emaks ≤ emin reddedilir", () => {
    expect(zeminBagilSikilik.inputSchema.safeParse({ ozgulAgirlikGs: 2.65, kuruBirimHacimAgirlik_kNm3: 16, emaks: 0.4, emin: 0.5 }).success).toBe(false);
  });
});
