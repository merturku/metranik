import { describe, it, expect } from "vitest";
import { betonarmeKalipAlani } from "./betonarme-kalip-alani";

describe("Betonarme Kalıp Alanı", () => {
  const o = { adet: 20, boyut1_m: 0.4, boyut2_m: 0.6, boy_m: 3, fireYuzde: 0 };
  it("kolon 0,4×0,6, H 3 m, 20 adet → 2·1,0·3·20 = 120 m²; beton 14,4 m³", () => {
    const r = betonarmeKalipAlani.compute({ ...o, tip: "kolon" });
    expect(r.value.kalipAlani_m2).toBeCloseTo(120, 9);
    expect(r.intermediates.beton_hacmi_m3 as number).toBeCloseTo(14.4, 9);
  });
  it("kiriş 0,3×0,5, L 5 m, 10 adet → (0,3+1,0)·5·10 = 65 m²; %10 fire → 71,5", () => {
    const r = betonarmeKalipAlani.compute({ ...o, tip: "kiris", boyut1_m: 0.3, boyut2_m: 0.5, boy_m: 5, adet: 10, fireYuzde: 10 });
    expect(r.intermediates.net_kalip_m2 as number).toBeCloseTo(65, 9);
    expect(r.value.kalipAlani_m2).toBeCloseTo(71.5, 9);
  });
  it("döşeme 5×4 m, 1 adet → 20 m² (boy kullanılmaz)", () => {
    expect(betonarmeKalipAlani.compute({ ...o, tip: "doseme", boyut1_m: 5, boyut2_m: 4, adet: 1, boy_m: 0 }).value.kalipAlani_m2).toBeCloseTo(20, 9);
  });
});
