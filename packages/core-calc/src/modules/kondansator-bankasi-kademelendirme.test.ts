import { describe, it, expect } from "vitest";
import { kondansatorBankasiKademelendirme } from "./kondansator-bankasi-kademelendirme";

describe("Kondansatör Bankası Kademelendirme", () => {
  const g = { aktifGuc_kW: 200, mevcutCosPhi: 0.75, hedefCosPhi: 0.95, kademeSayisi: 8 };
  it("200 kW, 0,75→0,95: Qc = 110,65 kvar; 8 kademe → 13,83 → 15 kvar; kurulu 120 kvar", () => {
    const r = kondansatorBankasiKademelendirme.compute(g);
    expect(r.value.gerekliQc_kvar).toBeCloseTo(200 * (Math.tan(Math.acos(0.75)) - Math.tan(Math.acos(0.95))), 8);
    expect(r.value.gerekliQc_kvar).toBeCloseTo(110.65, 1);
    expect(r.intermediates.secilen_standart_kademe_kvar).toBe(15);
    expect(r.intermediates.kurulu_guc_kvar).toBe(120);
    expect(r.intermediates.gerceklesen_cosPhi as number).toBeCloseTo(0.9625, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("aşırı kurulu güç kapasitif çalışma → uygunsuz", () => {
    const r = kondansatorBankasiKademelendirme.compute({ aktifGuc_kW: 2, mevcutCosPhi: 0.9, hedefCosPhi: 0.95, kademeSayisi: 1 });
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("hedef cosφ ≤ mevcut reddedilir", () => {
    expect(kondansatorBankasiKademelendirme.inputSchema.safeParse({ ...g, hedefCosPhi: 0.7 }).success).toBe(false);
  });
});
