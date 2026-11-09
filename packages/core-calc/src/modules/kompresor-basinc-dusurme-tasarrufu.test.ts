import { describe, it, expect } from "vitest";
import { kompresorBasincDusurmeTasarrufu } from "./kompresor-basinc-dusurme-tasarrufu";

const g = { mevcutBasinc_bar_g: 8, yeniBasinc_bar_g: 7, mevcutGuc_kW: 75, yillikSaat_h: 6000, birimFiyat_TLkWh: 3, isentropikUs_k: 1.4 };

describe("Kompresör Basıncı Düşürme Tasarrufu", () => {
  it("8 → 7 bar(g): güç oranı 0,9289; tasarruf ≈ %7,1 (pratik kural %6–7/bar)", () => {
    const r = kompresorBasincDusurmeTasarrufu.compute(g);
    expect(r.intermediates.guc_orani as number).toBeCloseTo(0.92885, 3);
    expect(r.value.tasarruf_yuzde).toBeCloseTo(7.1, 1);
  });
  it("75 kW, 6000 h: ΔP = 5,34 kW → 32 000 kWh; 96 000 ₺", () => {
    const r = kompresorBasincDusurmeTasarrufu.compute(g);
    expect(r.intermediates.yillik_tasarruf_kWh as number).toBeCloseTo((75 - (r.intermediates.yeni_guc_kW as number)) * 6000, 6);
    expect(r.intermediates.yillik_tasarruf_kWh as number).toBeGreaterThan(30000);
    expect(r.intermediates.yillik_tasarruf_kWh as number).toBeLessThan(34000);
  });
  it("aynı basınçta tasarruf 0; basıncı artırmak negatif tasarruf", () => {
    expect(kompresorBasincDusurmeTasarrufu.compute({ ...g, yeniBasinc_bar_g: 8 }).value.tasarruf_yuzde).toBeCloseTo(0, 10);
    expect(kompresorBasincDusurmeTasarrufu.compute({ ...g, yeniBasinc_bar_g: 9 }).value.tasarruf_yuzde).toBeLessThan(0);
  });
});
