import { describe, it, expect } from "vitest";
import { yatayDikSilindirikTank } from "./yatay-silindirik-tank-kismi-hacim";

describe("Yatay Silindirik Tank Kısmi Hacim", () => {
  it("D = 2, L = 2, h = 1 (yarı dolu): V = π/2·... = 3,1416 m³ (toplamın %50'si)", () => {
    const r = yatayDikSilindirikTank.compute({ cap_D_m: 2, boy_L_m: 2, sivi_yuksekligi_h_m: 1 });
    expect(r.value.dolu_hacim_m3 as number).toBeCloseTo(Math.PI, 8);
    expect(r.intermediates.doluluk_yuzde as number).toBeCloseTo(50, 8);
  });
  it("tam dolu h = D → π·r²·L; boş h = 0 → 0; D = 2: %25 seviye → %19,55 doluluk", () => {
    expect(yatayDikSilindirikTank.compute({ cap_D_m: 2, boy_L_m: 2, sivi_yuksekligi_h_m: 2 }).intermediates.doluluk_yuzde as number).toBeCloseTo(100, 6);
    expect(yatayDikSilindirikTank.compute({ cap_D_m: 2, boy_L_m: 2, sivi_yuksekligi_h_m: 0 }).value.dolu_hacim_m3).toBeCloseTo(0, 10);
    expect(yatayDikSilindirikTank.compute({ cap_D_m: 2, boy_L_m: 2, sivi_yuksekligi_h_m: 0.5 }).intermediates.doluluk_yuzde as number).toBeCloseTo(19.55, 1);
  });
  it("h > D → null + uygunsuz", () => {
    const r = yatayDikSilindirikTank.compute({ cap_D_m: 2, boy_L_m: 2, sivi_yuksekligi_h_m: 2.5 });
    expect(r.value.dolu_hacim_m3).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
