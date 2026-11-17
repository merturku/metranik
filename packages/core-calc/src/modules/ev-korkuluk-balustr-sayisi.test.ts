import { describe, it, expect } from "vitest";
import { evKorkulukBalustrSayisi } from "./ev-korkuluk-balustr-sayisi";

describe("Korkuluk Balüstr Sayısı", () => {
  it("L = 2,4 m, w = 20 mm, g ≤ 100 mm: n ≥ 19,17 → 20; boşluk = 2000/21 = 95,238 mm", () => {
    const r = evKorkulukBalustrSayisi.compute({ aciklik_m: 2.4, balustrKalinligi_mm: 20, azamiBosluk_mm: 100 });
    expect(r.value.balustrSayisi).toBe(20);
    expect(r.intermediates.net_bosluk_mm as number).toBeCloseTo(95.2381, 3);
    expect(r.intermediates.balustr_aksi_mm as number).toBeCloseTo(115.2381, 3);
  });
  it("n−1 balüstrle boşluk aşılır (19 → 101 mm); açıklık ≤ azami boşluksa 0 balüstr", () => {
    expect((2400 - 19 * 20) / 20).toBeGreaterThan(100);
    expect(evKorkulukBalustrSayisi.compute({ aciklik_m: 0.09, balustrKalinligi_mm: 20, azamiBosluk_mm: 100 }).value.balustrSayisi).toBe(0);
  });
});
