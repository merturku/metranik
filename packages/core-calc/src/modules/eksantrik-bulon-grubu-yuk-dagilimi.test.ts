import { describe, it, expect } from "vitest";
import { eksantrikBulonGrubuYukDagilimi } from "./eksantrik-bulon-grubu-yuk-dagilimi";

describe("Eksantrik Bulon Grubu Yük Dağılımı", () => {
  const g = { nx: 2, ny: 3, sx_mm: 100, sy_mm: 100, V_kN: 100, e_mm: 150, FvRd_kN: 60 };
  it("2×3 grup, V = 100 kN, e = 150 mm: Σr² = 55 000; Fmaks = 40,769 kN", () => {
    const r = eksantrikBulonGrubuYukDagilimi.compute(g);
    expect(r.intermediates.sum_r2_mm2 as number).toBeCloseTo(55000, 6);
    expect(r.intermediates.yatay_bilesen_kN as number).toBeCloseTo(27.2727, 3);
    expect(r.intermediates.dusey_bilesen_kN as number).toBeCloseTo(30.303, 3);
    expect(r.value.enBuyukBulonKuvveti_kN).toBeCloseTo(40.7686, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("bulon koordinatları üzerinden doğrudan toplamla çapraz kontrol", () => {
    const xs = [-50, 50], ys = [-100, 0, 100];
    let s = 0, maks = 0;
    for (const x of xs) for (const y of ys) s += x * x + y * y;
    for (const x of xs) for (const y of ys) {
      const T = 100 * 150;
      const fx = (-T * y) / s, fy = 100 / 6 + (T * x) / s;
      maks = Math.max(maks, Math.hypot(fx, fy));
    }
    expect(eksantrikBulonGrubuYukDagilimi.compute(g).value.enBuyukBulonKuvveti_kN).toBeCloseTo(maks, 8);
  });
  it("e = 0 → tüm bulonlar V/n; dayanım aşılınca uygunsuz", () => {
    const r = eksantrikBulonGrubuYukDagilimi.compute({ ...g, e_mm: 0 });
    expect(r.value.enBuyukBulonKuvveti_kN).toBeCloseTo(100 / 6, 10);
    expect(eksantrikBulonGrubuYukDagilimi.compute({ ...g, FvRd_kN: 40 }).verdict?.status).toBe("uygunsuz");
  });
  it("tek bulon reddedilir", () => {
    expect(eksantrikBulonGrubuYukDagilimi.inputSchema.safeParse({ ...g, nx: 1, ny: 1 }).success).toBe(false);
  });
});
