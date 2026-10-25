import { describe, it, expect } from "vitest";
import { hazenWilliamsSurtunmeKaybi, hazenWilliamsSurtunmeKaybiInputSchema } from "./hazen-williams-surtunme-kaybi";

const hat = { debi_Lmin: 500, boruIcCapi_mm: 52.5, puruzlulukKatsayisi_C: 120, esdegerBoruBoyu_m: 30 };

describe("Hazen-Williams Sürtünme Kaybı (Yangın Tesisatı)", () => {
  it("Bağımsız kontrol: 100 gpm, 2,067 inç, C = 120 → ABD formülü 0,09396 psi/ft = 0,021254 bar/m; SI formülü aynı sonucu (%0,02 içinde) verir", () => {
    const psiFt = (4.52 * 100 ** 1.85) / (120 ** 1.85 * 2.067 ** 4.87);
    const abdBarM = (psiFt * 0.0689476) / 0.3048;
    const r = hazenWilliamsSurtunmeKaybi.compute({
      debi_Lmin: 100 * 3.785411784,
      boruIcCapi_mm: 2.067 * 25.4,
      puruzlulukKatsayisi_C: 120,
      esdegerBoruBoyu_m: 1,
    });
    expect(psiFt).toBeCloseTo(0.09396, 5);
    expect(Math.abs((r.intermediates.birim_kayip_bar_m as number) / abdBarM - 1)).toBeLessThan(0.0005);
  });

  it("500 L/dk, DN50 (iç çap 52,5 mm), C = 120: 0,03558 bar/m × 30 m = 1,067 bar; hız 3,85 m/s", () => {
    const r = hazenWilliamsSurtunmeKaybi.compute(hat);
    expect(r.intermediates.birim_kayip_bar_m).toBeCloseTo(0.0355786, 6);
    expect(r.value.toplamSurtunmeKaybi_bar).toBeCloseTo(1.06736, 4);
    expect(r.intermediates.akis_hizi_ms).toBeCloseTo(3.8496, 4);
  });

  it("Kuru sistem (C = 100) kaybı (120/100)^1,85 = 1,401 katına çıkarır", () => {
    const r = hazenWilliamsSurtunmeKaybi.compute({ ...hat, puruzlulukKatsayisi_C: 100 });
    expect(r.intermediates.birim_kayip_bar_m).toBeCloseTo(0.0355786 * 1.2 ** 1.85, 6);
  });

  it("C katsayısı 60–160 aralığı dışında reddedilir", () => {
    expect(hazenWilliamsSurtunmeKaybiInputSchema.safeParse({ ...hat, puruzlulukKatsayisi_C: 200 }).success).toBe(false);
  });
});
