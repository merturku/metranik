import { describe, it, expect } from "vitest";
import { evYuksekYatakToprakHacmi } from "./ev-yuksek-yatak-toprak-hacmi";

describe("Yüksek Yatak Toprak Hacmi", () => {
  it("2×1×0,4 m = 0,8 m³ = 800 L; %10 oturma → 880 L; 50 L torba → 18 torba", () => {
    const r = evYuksekYatakToprakHacmi.compute({ uzunluk_m: 2, genislik_m: 1, derinlik_m: 0.4, oturmaPayiYuzde: 10, torbaHacmi_L: 50 });
    expect(r.intermediates.net_hacim_m3 as number).toBeCloseTo(0.8, 8);
    expect(r.intermediates.oturma_dahil_hacim_L as number).toBeCloseTo(880, 6);
    expect(r.value.torbaSayisi).toBe(18);
  });
  it("tam bölünme: 1×1×0,5 m, oturma 0, 50 L → 10 torba", () => {
    expect(evYuksekYatakToprakHacmi.compute({ uzunluk_m: 1, genislik_m: 1, derinlik_m: 0.5, oturmaPayiYuzde: 0, torbaHacmi_L: 50 }).value.torbaSayisi).toBe(10);
  });
});
