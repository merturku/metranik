import { describe, it, expect } from "vitest";
import { koseKaynagiGerekliBoy } from "./kose-kaynagi-gerekli-boy";

const g = { f_kN: 150, a_mm: 5, fu_MPa: 360, betaW: 0.8, gammaM2: 1.25 };

describe("Köşe Kaynağı Gerekli Boy", () => {
  it("S235 (fu 360, βw 0,8), a 5, F 150 kN: fvw,d 207,846 MPa; 1039,23 N/mm; Leff 144,34; L 154,34 mm", () => {
    const r = koseKaynagiGerekliBoy.compute(g);
    expect(r.intermediates.fvw_d_MPa as number).toBeCloseTo(207.846, 2);
    expect(r.intermediates.birim_kapasite_Nmm as number).toBeCloseTo(1039.23, 1);
    expect(r.intermediates.etkin_boy_mm as number).toBeCloseTo(144.3376, 3);
    expect(r.value.dikisBoyu_mm).toBeCloseTo(154.3376, 3);
  });
  it("küçük kuvvette asgari etkin boy 30 mm (a 5): L = 40 mm; a 8'de asgari 6a = 48 mm", () => {
    expect(koseKaynagiGerekliBoy.compute({ ...g, f_kN: 1 }).value.dikisBoyu_mm).toBeCloseTo(40, 8);
    expect(koseKaynagiGerekliBoy.compute({ ...g, f_kN: 1, a_mm: 8 }).intermediates.etkin_boy_mm as number).toBeCloseTo(48, 8);
  });
  it("ters kontrol: bulunan Leff ile kapasite = F", () => {
    const r = koseKaynagiGerekliBoy.compute(g);
    expect((r.intermediates.etkin_boy_mm as number) * (r.intermediates.birim_kapasite_Nmm as number)).toBeCloseTo(150000, 3);
  });
});
