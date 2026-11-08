import { describe, it, expect } from "vitest";
import { armaturEsdegerBoruUzunlugu } from "./armatur-esdeger-boru-uzunlugu";

describe("Armatür Eşdeğer Boru Uzunluğu", () => {
  it("K = 0,75, D = 50 mm, f = 0,02: L/D = 37,5, Le = 1,875 m; 4 adet = 7,5 m", () => {
    const r = armaturEsdegerBoruUzunlugu.compute({ kayipKatsayisi_K: 0.75, icCap_mm: 50, surtunmeKatsayisi_f: 0.02, adet: 4, duzBoruUzunlugu_m: 30 });
    expect(r.intermediates.L_D_orani as number).toBeCloseTo(37.5, 8);
    expect(r.intermediates.tek_parca_Le_m as number).toBeCloseTo(1.875, 8);
    expect(r.value.toplamEsdegerUzunluk_m).toBeCloseTo(7.5, 8);
    expect(r.intermediates.toplam_hesap_uzunlugu_m as number).toBeCloseTo(37.5, 8);
  });
  it("Darcy tutarlılığı: K·V²/2g = f·(Le/D)·V²/2g", () => {
    const r = armaturEsdegerBoruUzunlugu.compute({ kayipKatsayisi_K: 10, icCap_mm: 100, surtunmeKatsayisi_f: 0.025, adet: 1, duzBoruUzunlugu_m: 0 });
    expect(0.025 * (r.value.toplamEsdegerUzunluk_m / 0.1)).toBeCloseTo(10, 8);
  });
});
