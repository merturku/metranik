import { describe, it, expect } from "vitest";
import { boruDirsegiBasincItmeKuvveti } from "./boru-dirsegi-basinc-itme-kuvveti";

describe("Boru Dirseği İtme Kuvveti", () => {
  it("10 bar, DN200 iç çap, 90°, v = 0: F = 2·10⁶·0,0314159·sin45° = 44 428,8 N; dayanak 0,4443 m² (100 kPa)", () => {
    const r = boruDirsegiBasincItmeKuvveti.compute({ basinc_bar: 10, icCap_mm: 200, aci_deg: 90, hiz_ms: 0, zeminGerilmesi_kPa: 100 });
    expect(r.value.itmeKuvveti_N).toBeCloseTo(44428.83, 1);
    expect(r.intermediates.dayanak_alani_m2 as number).toBeCloseTo(0.444288, 5);
  });
  it("v = 2 m/s momentum bileşeni: 2·ρ·A·v²·sin45° = 177,7 N", () => {
    const r = boruDirsegiBasincItmeKuvveti.compute({ basinc_bar: 10, icCap_mm: 200, aci_deg: 90, hiz_ms: 2, zeminGerilmesi_kPa: 100 });
    expect(r.intermediates.momentum_kuvveti_N as number).toBeCloseTo(2 * 1000 * (Math.PI * 0.04 / 4) * 4 * Math.SQRT1_2, 6);
  });
  it("θ = 180° (U dönüşü) → sin 90° = 1: F = 2pA", () => {
    const r = boruDirsegiBasincItmeKuvveti.compute({ basinc_bar: 10, icCap_mm: 200, aci_deg: 180, hiz_ms: 0, zeminGerilmesi_kPa: 100 });
    expect(r.value.itmeKuvveti_N).toBeCloseTo(2 * 1e6 * Math.PI * 0.01, 4);
  });
});
