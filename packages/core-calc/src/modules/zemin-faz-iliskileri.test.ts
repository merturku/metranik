import { describe, it, expect } from "vitest";
import { zeminFazIliskileri } from "./zemin-faz-iliskileri";

describe("Zemin Faz İlişkileri", () => {
  it("Gs 2,65, e 0,7, w 0,2 → γ ≈ 18,35; γd ≈ 15,29 kN/m³; n ≈ 0,412; Sr ≈ 75,7 %", () => {
    const r = zeminFazIliskileri.compute({ ozgulAgirlikGs: 2.65, bosluk_orani_e: 0.7, su_muhtevasi_w: 0.2 });
    expect(r.value.dogalBirimHacimAgirlik_kNm3).toBeCloseTo(18.35, 2);
    expect(r.intermediates.kuru_birim_hacim_agirlik_kNm3 as number).toBeCloseTo(15.29, 2);
    expect(r.intermediates.porozite_n as number).toBeCloseTo(0.4118, 3);
    expect(r.intermediates.doygunluk_derecesi_Sr_yuzde as number).toBeCloseTo(75.71, 1);
  });
  it("Sr = %100 (w = e/Gs) iken γ = γsat; batık = γsat − 9,81", () => {
    const e = 0.6, gs = 2.7;
    const r = zeminFazIliskileri.compute({ ozgulAgirlikGs: gs, bosluk_orani_e: e, su_muhtevasi_w: e / gs });
    expect(r.value.dogalBirimHacimAgirlik_kNm3).toBeCloseTo(r.intermediates.doygun_birim_hacim_agirlik_kNm3 as number, 9);
    expect(r.intermediates.batik_birim_hacim_agirlik_kNm3 as number).toBeCloseTo((r.intermediates.doygun_birim_hacim_agirlik_kNm3 as number) - 9.81, 9);
  });
});
