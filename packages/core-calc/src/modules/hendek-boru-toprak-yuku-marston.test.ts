import { describe, it, expect } from "vitest";
import { hendekBoruToprakYukuMarston } from "./hendek-boru-toprak-yuku-marston";

describe("Marston Hendek Yükü", () => {
  it("γ = 18, H = 3, B = 1, Kμ' = 0,165: Cd = (1 − e^−0,99)/0,33 = 1,9043; W = 34,28 kN/m", () => {
    const r = hendekBoruToprakYukuMarston.compute({ birimHacimAgirlik_kNm3: 18, dolguYuksekligi_H_m: 3, hendekGenisligi_B_m: 1, kMu: 0.165 });
    expect(r.intermediates.yuk_katsayisi_Cd as number).toBeCloseTo(1.9043, 3);
    expect(r.value.toprakYuku_kNm).toBeCloseTo(34.278, 2);
  });
  it("H/B → 0'da Cd → H/B (tam prizma), W → γ·H·B; derinleşince Cd → 1/(2Kμ') sınırına yaklaşır", () => {
    const s = hendekBoruToprakYukuMarston.compute({ birimHacimAgirlik_kNm3: 18, dolguYuksekligi_H_m: 0.001, hendekGenisligi_B_m: 1, kMu: 0.165 });
    expect(s.intermediates.marston_prizma_orani as number).toBeCloseTo(1, 3);
    const d = hendekBoruToprakYukuMarston.compute({ birimHacimAgirlik_kNm3: 18, dolguYuksekligi_H_m: 100, hendekGenisligi_B_m: 1, kMu: 0.165 });
    expect(d.intermediates.yuk_katsayisi_Cd as number).toBeCloseTo(1 / 0.33, 6);
  });
});
