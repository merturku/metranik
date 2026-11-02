import { describe, it, expect } from "vitest";
import { basitKirisKesitTesirleri } from "./basit-kiris-kesit-tesirleri";

describe("Basit Kiriş Kesit Tesirleri", () => {
  it("L 6 m, w 10 kN/m, P 20 kN: R = 40 kN, M = 45 + 30 = 75 kNm", () => {
    const r = basitKirisKesitTesirleri.compute({ aciklik_m: 6, yayiliYuk_kNm: 10, ortaTekilYuk_kN: 20 });
    expect(r.value.Mmaks_kNm).toBeCloseTo(75, 9);
    expect(r.intermediates.Vmaks_kN).toBeCloseTo(40, 9);
    expect(r.intermediates.toplam_yuk_kN).toBe(80);
  });
  it("yalnız yayılı: wL²/8 (Mevcut sehim modülleriyle aynı statik)", () => {
    expect(basitKirisKesitTesirleri.compute({ aciklik_m: 4, yayiliYuk_kNm: 8, ortaTekilYuk_kN: 0 }).value.Mmaks_kNm).toBeCloseTo(16, 9);
  });
});
