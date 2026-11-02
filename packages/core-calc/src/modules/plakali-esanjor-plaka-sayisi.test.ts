import { describe, it, expect } from "vitest";
import { plakaliEsanjorPlakaSayisi } from "./plakali-esanjor-plaka-sayisi";

describe("Plakalı Eşanjör Plaka Sayısı", () => {
  it("500 kW, U 4000, LMTD 5 → 25 m²; +%10 = 27,5 m²; 0,3 m² plaka → 92 + 1 = 93 plaka", () => {
    const r = plakaliEsanjorPlakaSayisi.compute({ isiYuku_kW: 500, U_Wm2K: 4000, LMTD_K: 5, plakaAlani_m2: 0.3, guvenlikPayiYuzde: 10 });
    expect(r.intermediates.net_alan_m2 as number).toBeCloseTo(25, 9);
    expect(r.intermediates.isi_transfer_plaka_sayisi).toBe(92);
    expect(r.value.toplamPlakaSayisi).toBe(93);
  });
  it("tam katı: 24 m² / 0,3 = 80 plaka (tavanlanmaz) → 81 toplam", () => {
    const r = plakaliEsanjorPlakaSayisi.compute({ isiYuku_kW: 480, U_Wm2K: 4000, LMTD_K: 5, plakaAlani_m2: 0.3, guvenlikPayiYuzde: 0 });
    expect(r.value.toplamPlakaSayisi).toBe(81);
  });
});
