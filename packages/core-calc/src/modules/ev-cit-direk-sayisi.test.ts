import { describe, it, expect } from "vitest";
import { evCitDirekSayisi } from "./ev-cit-direk-sayisi";

describe("Çit Direk ve Panel Sayısı", () => {
  it("kapalı çevre 100 m, aralık 2,5 m, kapı yok: 40 aralık → 40 direk, 40 panel; gerçek aralık 2,5", () => {
    const r = evCitDirekSayisi.compute({ toplamUzunluk_m: 100, direkAraligi_m: 2.5, hatTipi: "kapali", kapiSayisi: 0, kapiGenisligi_m: 0, koseSayisi: 0 });
    expect(r.value.toplamDirek).toBe(40);
    expect(r.intermediates.panel_sayisi).toBe(40);
    expect(r.intermediates.gercek_aralik_m).toBeCloseTo(2.5, 8);
  });
  it("açık hat 100 m → 41 direk; 1 kapı (3 m) → net 97 m → 39 aralık → 40 hat direği + 2 kapı kolonu = 42", () => {
    expect(evCitDirekSayisi.compute({ toplamUzunluk_m: 100, direkAraligi_m: 2.5, hatTipi: "acik", kapiSayisi: 0, kapiGenisligi_m: 0, koseSayisi: 0 }).value.toplamDirek).toBe(41);
    const r = evCitDirekSayisi.compute({ toplamUzunluk_m: 100, direkAraligi_m: 2.5, hatTipi: "acik", kapiSayisi: 1, kapiGenisligi_m: 3, koseSayisi: 0 });
    expect(r.intermediates.aralik_sayisi).toBe(39);
    expect(r.value.toplamDirek).toBe(42);
  });
  it("köşe direkleri eklenir; tam bölünen uzunlukta yuvarlama hatası yok (10 m / 2 m = 5)", () => {
    expect(evCitDirekSayisi.compute({ toplamUzunluk_m: 10, direkAraligi_m: 2, hatTipi: "acik", kapiSayisi: 0, kapiGenisligi_m: 0, koseSayisi: 2 }).value.toplamDirek).toBe(8);
  });
});
