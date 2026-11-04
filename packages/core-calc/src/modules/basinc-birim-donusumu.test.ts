import { describe, it, expect } from "vitest";
import { basincBirimDonusumu } from "./basinc-birim-donusumu";

describe("Basınç Birim Dönüşümü", () => {
  it("1 bar = 100 kPa = 14,504 psi = 10,197 mSS = 0,987 atm", () => {
    const r = basincBirimDonusumu.compute({ basinc_bar: 1 });
    expect(r.value.basinc_kPa).toBeCloseTo(100, 9);
    expect(r.intermediates.basinc_psi as number).toBeCloseTo(14.5038, 3);
    expect(r.intermediates.basinc_mSS as number).toBeCloseTo(10.1972, 3);
    expect(r.intermediates.basinc_atm as number).toBeCloseTo(0.98692, 4);
  });
});
