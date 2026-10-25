import { describe, it, expect } from "vitest";
import { radyatorDilimSayisi, radyatorDilimSayisiInputSchema } from "./radyator-dilim-sayisi";

const oda = {
  odaIsiKaybi_W: 1500,
  birimKapasitesiDT50_W: 120,
  radyatorUssu_n: 1.3,
  gidisSicakligi_C: 70,
  donusSicakligi_C: 55,
  odaSicakligi_C: 20,
};

describe("Radyatör Dilim Sayısı", () => {
  it("EN 442 nominal 75/65/20 koşulunda ΔTln = 10/ln(55/45) = 49,83 K ≈ 50 K", () => {
    const r = radyatorDilimSayisi.compute({ ...oda, gidisSicakligi_C: 75, donusSicakligi_C: 65 });
    expect(r.intermediates.logaritmik_sicaklik_farki_K).toBeCloseTo(49.8329, 4);
  });

  it("70/55/20: ΔTln = 15/ln(50/35) = 42,06 K, katsayı (42,06/50)^1,3 = 0,7986 → dilim 95,83 W → 1500/95,83 = 15,65 → 16 dilim", () => {
    const r = radyatorDilimSayisi.compute(oda);
    expect(r.intermediates.logaritmik_sicaklik_farki_K).toBeCloseTo(42.0551, 4);
    expect(r.intermediates.kapasite_duzeltme_katsayisi).toBeCloseTo(0.79855, 5);
    expect(r.intermediates.isletmede_birim_kapasitesi_W).toBeCloseTo(95.8263, 4);
    expect(r.value.dilimSayisi).toBe(16);
  });

  it("Düşük sıcaklıklı sistem 55/45/20 (ısı pompası): dilim 61,0 W → 25 dilim", () => {
    const r = radyatorDilimSayisi.compute({ ...oda, gidisSicakligi_C: 55, donusSicakligi_C: 45 });
    expect(r.intermediates.isletmede_birim_kapasitesi_W).toBeCloseTo(61.022, 3);
    expect(r.value.dilimSayisi).toBe(25);
  });

  it("Dönüş sıcaklığı oda sıcaklığının altında olamaz", () => {
    expect(radyatorDilimSayisiInputSchema.safeParse({ ...oda, donusSicakligi_C: 18 }).success).toBe(false);
  });
});
