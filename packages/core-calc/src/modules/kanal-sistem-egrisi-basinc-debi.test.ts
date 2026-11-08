import { describe, it, expect } from "vitest";
import { kanalSistemEgrisiBasincDebi } from "./kanal-sistem-egrisi-basinc-debi";

describe("Sistem Eğrisi Basınç–Debi", () => {
  it("1000 → 1200 m³/h, 200 Pa, n = 2: ΔP = 200·1,44 = 288 Pa; güç oranı 1,2³ = 1,728", () => {
    const r = kanalSistemEgrisiBasincDebi.compute({ referansDebi: 1000, referansBasincKaybi: 200, yeniDebi: 1200, us_n: 2 });
    expect(r.value.yeniBasincKaybi).toBeCloseTo(288, 8);
    expect(r.intermediates.guc_orani_P2_P1 as number).toBeCloseTo(1.728, 8);
  });
  it("debi yarıya → basınç 1/4, güç 1/8", () => {
    const r = kanalSistemEgrisiBasincDebi.compute({ referansDebi: 1000, referansBasincKaybi: 200, yeniDebi: 500, us_n: 2 });
    expect(r.value.yeniBasincKaybi).toBeCloseTo(50, 8);
    expect(r.intermediates.guc_orani_P2_P1 as number).toBeCloseTo(0.125, 8);
  });
  it("k katsayısı referans noktayı geri verir: k·Q1^n = ΔP1", () => {
    const r = kanalSistemEgrisiBasincDebi.compute({ referansDebi: 800, referansBasincKaybi: 150, yeniDebi: 900, us_n: 1.9 });
    expect((r.intermediates.direnc_katsayisi_k as number) * 800 ** 1.9).toBeCloseTo(150, 8);
  });
});
