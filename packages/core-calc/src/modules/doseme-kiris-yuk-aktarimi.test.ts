import { describe, it, expect } from "vitest";
import { dosemeKirisYukAktarimi } from "./doseme-kiris-yuk-aktarimi";

describe("Döşemeden Kirişe Yük Aktarımı", () => {
  it("q = 10, lx = 4, ly = 6 (m = 2/3): kısa 13,33; uzun (20)(1 − 0,148) = 17,04 kN/m (moment eşdeğeri)", () => {
    const r = dosemeKirisYukAktarimi.compute({ dosemeYuku_kNm2: 10, kisaKenar_lx_m: 4, uzunKenar_ly_m: 6 });
    expect(r.intermediates.kisa_kiris_moment_esdegeri_kNm as number).toBeCloseTo(13.333, 3);
    expect(r.value.uzunKirisEsdegerYuk_kNm).toBeCloseTo(17.037, 3);
  });
  it("kesme eşdeğerleri: kısa 10, uzun 13,33; toplam yük dengesi: 2·(kısa·lx + uzun·ly) = q·lx·ly", () => {
    const r = dosemeKirisYukAktarimi.compute({ dosemeYuku_kNm2: 10, kisaKenar_lx_m: 4, uzunKenar_ly_m: 6 });
    const ks = r.intermediates.kisa_kiris_kesme_esdegeri_kNm as number;
    const us = r.intermediates.uzun_kiris_kesme_esdegeri_kNm as number;
    expect(ks).toBeCloseTo(10, 8);
    expect(us).toBeCloseTo(13.3333, 3);
    expect(2 * (ks * 4 + us * 6)).toBeCloseTo(10 * 4 * 6, 6); // kısa kenar kirişi lx, uzun kenar kirişi ly boyunda
  });
  it("kare döşemede (m = 1) uzun = kısa = q·lx/3; ly/lx > 2 → tek doğrultu q·lx/2", () => {
    const k = dosemeKirisYukAktarimi.compute({ dosemeYuku_kNm2: 10, kisaKenar_lx_m: 4, uzunKenar_ly_m: 4 });
    expect(k.value.uzunKirisEsdegerYuk_kNm).toBeCloseTo(13.333, 3);
    const t = dosemeKirisYukAktarimi.compute({ dosemeYuku_kNm2: 10, kisaKenar_lx_m: 3, uzunKenar_ly_m: 7 });
    expect(t.value.uzunKirisEsdegerYuk_kNm).toBeCloseTo(15, 8);
  });
});
