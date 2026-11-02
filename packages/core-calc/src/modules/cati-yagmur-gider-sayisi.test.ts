import { describe, it, expect } from "vitest";
import { catiYagmurGiderSayisi } from "./cati-yagmur-gider-sayisi";

describe("Çatı Yağmur Gideri Sayısı", () => {
  it("800 m², 150 mm/h, C 1 → 33,33 L/s; gider 8 L/s → 5 ana gider (+1 taşma = 6)", () => {
    const r = catiYagmurGiderSayisi.compute({ catiAlani_m2: 800, yagisSiddeti_mmh: 150, akisKatsayisi: 1, giderKapasitesi_Ls: 8 });
    expect(r.intermediates.yagmur_debisi_Ls as number).toBeCloseTo(33.333, 3);
    expect(r.value.giderSayisi).toBe(5);
    expect(r.intermediates.tasma_dahil_toplam_gider).toBe(6);
  });
  it("küçük çatıda en az 1 gider", () => {
    expect(catiYagmurGiderSayisi.compute({ catiAlani_m2: 5, yagisSiddeti_mmh: 100, akisKatsayisi: 0.9, giderKapasitesi_Ls: 8 }).value.giderSayisi).toBe(1);
  });
  it("tam kat: 40 L/s / 8 = 5 (tavanlanmaz)", () => {
    expect(catiYagmurGiderSayisi.compute({ catiAlani_m2: 960, yagisSiddeti_mmh: 150, akisKatsayisi: 1, giderKapasitesi_Ls: 8 }).value.giderSayisi).toBe(5);
  });
});
