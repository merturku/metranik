import { describe, it, expect } from "vitest";
import { zeminKaymaDalgasiRijitlikSinifi } from "./zemin-kayma-dalgasi-rijitlik-sinifi";

describe("Kayma Dalgası Hızından Rijitlik ve Zemin Sınıfı", () => {
  it("ρ = 1900, Vs = 250: G = 118,75 MPa; ν = 0,3 → E = 308,75 MPa; Vp = 250·√(1,4/0,4) = 467,7 m/s", () => {
    const r = zeminKaymaDalgasiRijitlikSinifi.compute({ kaymaDalgasiHizi_Vs_ms: 250, yogunluk_kgm3: 1900, poisson_nu: 0.3, vs30_ms: 250 });
    expect(r.value.kaymaModulu_MPa).toBeCloseTo(118.75, 8);
    expect(r.intermediates.elastisite_modulu_MPa as number).toBeCloseTo(308.75, 8);
    expect(r.intermediates.sikisma_dalgasi_hizi_Vp_ms as number).toBeCloseTo(467.7, 1);
    expect(r.intermediates.zemin_sinifi).toBe("ZD");
  });
  it("Vs30 sınıf eşikleri: 2000 → ZA; 1000 → ZB; 500 → ZC; 250 → ZD; 150 → ZE", () => {
    const f = (v: number) => zeminKaymaDalgasiRijitlikSinifi.compute({ kaymaDalgasiHizi_Vs_ms: 200, yogunluk_kgm3: 1800, poisson_nu: 0.3, vs30_ms: v }).intermediates.zemin_sinifi;
    expect([f(2000), f(1000), f(500), f(250), f(150)]).toEqual(["ZA", "ZB", "ZC", "ZD", "ZE"]);
  });
  it("G, Vs'nin karesiyle orantılı (Vs ×2 → G ×4)", () => {
    const a = zeminKaymaDalgasiRijitlikSinifi.compute({ kaymaDalgasiHizi_Vs_ms: 100, yogunluk_kgm3: 1800, poisson_nu: 0.3, vs30_ms: 100 }).value.kaymaModulu_MPa;
    const b = zeminKaymaDalgasiRijitlikSinifi.compute({ kaymaDalgasiHizi_Vs_ms: 200, yogunluk_kgm3: 1800, poisson_nu: 0.3, vs30_ms: 100 }).value.kaymaModulu_MPa;
    expect(b / a).toBeCloseTo(4, 10);
  });
});
