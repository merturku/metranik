import { describe, it, expect } from "vitest";
import { sogutmaSerpantiniYuku, sogutmaSerpantiniYukuInputSchema } from "./sogutma-serpantini-yuku";

// Çengel & Boles, Termodinamik, Örnek 14-8: pencere tipi klima, 1 atm, giriş 30 °C %80 φ, 10 m³/dk,
// çıkış 14 °C doymuş; yoğuşan su 14 °C'de ayrılır. Kitap (diyagram/tablo): h1 = 85,4, ω1 = 0,0216,
// v1 = 0,889, h2 = 39,3 kJ/kg, ω2 = 0,0100 → ṁa = 11,25 kg/dk, ṁw = 0,131 kg/dk, Q = 511 kJ/dk.
const cengel = {
  havaDebisi_m3h: 600,
  girisSicakligi_C: 30,
  girisBagilNem_yuzde: 80,
  cikisSicakligi_C: 14,
  cikisBagilNem_yuzde: 100,
  atmosferBasinci_kPa: 101.325,
};

describe("Soğutma Serpantini Yükü (Nem Alma)", () => {
  it("Çengel Örnek 14-8: serpantin yükü 511 kJ/dk ≈ 8,51 kW (kitap değerine %0,1 içinde)", () => {
    const r = sogutmaSerpantiniYuku.compute(cengel);
    expect(r.value.serpantinYuku_kW).toBeCloseTo(8.5117, 3);
    expect(Math.abs(r.value.serpantinYuku_kW * 60 - 511) / 511).toBeLessThan(0.001);
  });

  it("Çengel Örnek 14-8 ara değerleri: ω1 = 21,6 g/kg, ω2 = 10,0 g/kg, h1 = 85,4, h2 = 39,3 kJ/kg, ṁa = 11,25 kg/dk", () => {
    const r = sogutmaSerpantiniYuku.compute(cengel);
    expect(r.intermediates.giris_nem_orani_W1_gkg).toBeCloseTo(21.6, 1);
    expect(r.intermediates.cikis_nem_orani_W2_gkg).toBeCloseTo(10.0, 1);
    expect(r.intermediates.giris_entalpisi_h1_kJkg).toBeCloseTo(85.4, 0);
    expect(r.intermediates.cikis_entalpisi_h2_kJkg).toBeCloseTo(39.3, 0);
    expect((r.intermediates.kuru_hava_debisi_kgs as number) * 60).toBeCloseTo(11.25, 2);
  });

  it("Çengel Örnek 14-8: yoğuşan su 0,131 kg/dk = 7,83 kg/h", () => {
    const r = sogutmaSerpantiniYuku.compute(cengel);
    expect((r.intermediates.yogusan_su_kgh as number) / 60).toBeCloseTo(0.131, 3);
    expect(r.intermediates.yogusan_su_kgh).toBeCloseTo(7.835, 2);
  });

  it("Duyulur + gizli − yoğuşan su entalpisi = toplam yük; SHR = 0,363", () => {
    const r = sogutmaSerpantiniYuku.compute(cengel);
    const d = r.intermediates.duyulur_yuk_kW as number;
    const g = r.intermediates.gizli_yuk_kW as number;
    const w = r.intermediates.yogusan_su_entalpi_payi_kW as number;
    expect(d + g - w).toBeCloseTo(r.value.serpantinYuku_kW, 10);
    expect(r.intermediates.duyulur_isi_orani_SHR).toBeCloseTo(0.3634, 4);
    expect(r.verdict).toBeUndefined();
  });

  it("Çıkış nemi girişten büyükse kuru soğutma kabul edilir: gizli yük ve yoğuşma sıfır, uygunsuz uyarısı", () => {
    const r = sogutmaSerpantiniYuku.compute({ ...cengel, girisBagilNem_yuzde: 20, cikisBagilNem_yuzde: 95 });
    expect(r.intermediates.gizli_yuk_kW).toBeCloseTo(0, 10);
    expect(r.intermediates.yogusan_su_kgh).toBeCloseTo(0, 10);
    expect(r.intermediates.duyulur_isi_orani_SHR).toBeCloseTo(1, 10);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Şema çıkış sıcaklığı girişten düşük değilse reddeder", () => {
    expect(sogutmaSerpantiniYukuInputSchema.safeParse({ ...cengel, cikisSicakligi_C: 30 }).success).toBe(false);
    expect(sogutmaSerpantiniYukuInputSchema.safeParse(cengel).success).toBe(true);
  });
});
