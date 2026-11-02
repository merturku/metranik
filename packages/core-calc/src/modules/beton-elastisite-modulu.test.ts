import { describe, it, expect } from "vitest";
import { betonElastisiteModulu } from "./beton-elastisite-modulu";

describe("Beton Elastisite Modülü", () => {
  it("C30: Ecm ≈ 32,8 GPa (EN 1992-1-1 Tablo 3.1: 33), TS 500 ≈ 31,8 GPa", () => {
    const r = betonElastisiteModulu.compute({ fck_MPa: 30 });
    expect(r.value.Ecm_MPa / 1000).toBeCloseTo(32.8, 1);
    expect(r.intermediates.Ec_TS500_MPa as number).toBeCloseTo(31801, 0);
    expect(r.intermediates.moduler_oran_EN as number).toBeCloseTo(6.09, 1);
  });
  it("C20 ve C50 tablo değerleri (30 / 37 GPa)", () => {
    expect(betonElastisiteModulu.compute({ fck_MPa: 20 }).value.Ecm_MPa / 1000).toBeCloseTo(30, 0);
    expect(betonElastisiteModulu.compute({ fck_MPa: 50 }).value.Ecm_MPa / 1000).toBeCloseTo(37, 0);
  });
});
