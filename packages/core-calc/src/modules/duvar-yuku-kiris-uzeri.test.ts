import { describe, it, expect } from "vitest";
import { duvarYukuKirisUzeri } from "./duvar-yuku-kiris-uzeri";

describe("Duvar Yükü", () => {
  it("t 0,19, h 2,8, γd 8, sıva 2×0,02·20, %20 boşluk: 2,32 kN/m²; 6,496 kN/m; 5,1968 kN/m", () => {
    const r = duvarYukuKirisUzeri.compute({ kalinlik_m: 0.19, yukseklik_m: 2.8, duvarGamma: 8, sivaKalinligi_m: 0.02, sivaGamma: 20, bosluk: 0.2 });
    expect(r.intermediates.birim_alan_yuku_kNm2 as number).toBeCloseTo(2.32, 10);
    expect(r.intermediates.bosluksuz_yuk_kNm as number).toBeCloseTo(6.496, 10);
    expect(r.value.duvarYuku_kNm).toBeCloseTo(5.1968, 10);
  });
  it("boşluk 0 → boşluksuz yük; sıva yok → yalnız γd·t·h", () => {
    const r = duvarYukuKirisUzeri.compute({ kalinlik_m: 0.2, yukseklik_m: 3, duvarGamma: 10, sivaKalinligi_m: 0, sivaGamma: 20, bosluk: 0 });
    expect(r.value.duvarYuku_kNm).toBeCloseTo(6, 10);
  });
});
