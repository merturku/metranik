import { describe, it, expect } from "vitest";
import { dumanTuyuKutleDebisi } from "./duman-tuyu-kutle-debisi";

// Qc = 1000 kW (Q = 1428,6 kW × 0,7), z = 5 m
const g = { yanginGucu_kW: 1000 / 0.7, konvektifOran: 0.7, temizYukseklik_m: 5, ortamSicakligi_C: 20 };

describe("Duman Tüyü Kütle Debisi (NFPA 92)", () => {
  it("Qc = 1000 kW, z = 5 m: zl = 2,63 m (alev üstü); m = 0,071·10·14,62 + 1,8 = 12,18 kg/s", () => {
    const r = dumanTuyuKutleDebisi.compute(g);
    expect(r.intermediates.alev_yuksekligi_m as number).toBeCloseTo(2.63, 1);
    expect(r.value.dumanKutleDebisi_kgs).toBeCloseTo(12.18, 2);
  });
  it("duman sıcaklığı T = 293,15 + 1000/12,18 = 375,3 K; ρ = 353/T; V = m/ρ ≈ 13,0 m³/s", () => {
    const r = dumanTuyuKutleDebisi.compute(g);
    expect(r.intermediates.duman_sicakligi_C as number).toBeCloseTo(375.26 - 273.15, 1);
    expect(r.intermediates.tahliye_debisi_m3s as number).toBeCloseTo(12.18 / (353 / 375.26), 1);
  });
  it("alev içinde (z < zl) m = 0,032·Qc^0,6·z; yükseklik arttıkça debi artar", () => {
    const r = dumanTuyuKutleDebisi.compute({ ...g, temizYukseklik_m: 1 });
    expect(r.intermediates.bolge).toBe("alev içi");
    expect(r.value.dumanKutleDebisi_kgs).toBeCloseTo(0.032 * 1000 ** 0.6, 6);
    expect(dumanTuyuKutleDebisi.compute({ ...g, temizYukseklik_m: 8 }).value.dumanKutleDebisi_kgs).toBeGreaterThan(12.18);
  });
});
