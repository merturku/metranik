import { describe, it, expect } from "vitest";
import { zemineOturanDosemeUDegeri } from "./zemine-oturan-doseme-u-degeri";

describe("Zemine Oturan Döşeme U Değeri", () => {
  it("A = 100 m², P = 40 m (B' = 5), w = 0,3, λ = 2, Rf = 0: dt = 0,72 → U = 0,7615 W/m²K", () => {
    const r = zemineOturanDosemeUDegeri.compute({ doseme_alani_m2: 100, cevre_uzunlugu_m: 40, duvarKalinligi_m: 0.3, zeminIletkenligi_WmK: 2, dosemeYalitimDirenci_m2KW: 0 });
    expect(r.intermediates.karakteristik_boyut_B_m).toBe(5);
    expect(r.intermediates.esdeger_kalinlik_dt_m as number).toBeCloseTo(0.72, 8);
    expect(r.value.uDegeri_WmK).toBeCloseTo(0.7615, 3);
  });
  it("Rf = 5 m²K/W → dt = 10,72 > B' → U = 2/(0,457·5 + 10,72) = 0,1538; yalıtım U'yu düşürür", () => {
    const r = zemineOturanDosemeUDegeri.compute({ doseme_alani_m2: 100, cevre_uzunlugu_m: 40, duvarKalinligi_m: 0.3, zeminIletkenligi_WmK: 2, dosemeYalitimDirenci_m2KW: 5 });
    expect(r.intermediates.hesap_kolu).toContain("iyi yalıtımlı");
    expect(r.value.uDegeri_WmK).toBeCloseTo(2 / (0.457 * 5 + 10.72), 8);
    expect(r.value.uDegeri_WmK).toBeLessThan(0.7615);
  });
  it("iki formül dt = B' sınırında süreklidir (yaklaşık)", () => {
    const a = zemineOturanDosemeUDegeri.compute({ doseme_alani_m2: 100, cevre_uzunlugu_m: 40, duvarKalinligi_m: 0.3, zeminIletkenligi_WmK: 2, dosemeYalitimDirenci_m2KW: 2.289 });
    const b = zemineOturanDosemeUDegeri.compute({ doseme_alani_m2: 100, cevre_uzunlugu_m: 40, duvarKalinligi_m: 0.3, zeminIletkenligi_WmK: 2, dosemeYalitimDirenci_m2KW: 2.291 });
    expect(Math.abs(a.value.uDegeri_WmK - b.value.uDegeri_WmK)).toBeLessThan(0.01);
  });
});
