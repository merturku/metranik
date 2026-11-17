import { describe, it, expect } from "vitest";
import { paratonerAyirmaMesafesi } from "./paratoner-ayirma-mesafesi";

describe("Paratoner Ayırma Mesafesi", () => {
  it("LPL III, 2 inen iletken, hava, l = 20 m: s = 0,04·0,66/1·20 = 0,528 m", () => {
    const r = paratonerAyirmaMesafesi.compute({ lpl: "3", inenIletkenSayisi: "2", ortam: "hava", l_m: 20 });
    expect(r.value.ayirmaMesafesi_m).toBeCloseTo(0.528, 10);
  });
  it("beton/tuğla ortamda (km = 0,5) hava değerinin iki katı; LPL I 1 iletken 10 m hava = 0,8 m", () => {
    const hava = paratonerAyirmaMesafesi.compute({ lpl: "2", inenIletkenSayisi: "1", ortam: "hava", l_m: 10 }).value.ayirmaMesafesi_m;
    const beton = paratonerAyirmaMesafesi.compute({ lpl: "2", inenIletkenSayisi: "1", ortam: "beton", l_m: 10 }).value.ayirmaMesafesi_m;
    expect(beton / hava).toBeCloseTo(2, 10);
    expect(paratonerAyirmaMesafesi.compute({ lpl: "1", inenIletkenSayisi: "1", ortam: "hava", l_m: 10 }).value.ayirmaMesafesi_m).toBeCloseTo(0.8, 10);
  });
});
