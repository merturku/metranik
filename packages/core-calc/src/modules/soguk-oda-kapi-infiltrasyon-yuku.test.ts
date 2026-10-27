import { describe, it, expect } from "vitest";
import { sogukOdaKapiInfiltrasyonYuku, sogukOdaKapiInfiltrasyonYukuInputSchema } from "./soguk-oda-kapi-infiltrasyon-yuku";

const depo = {
  kapiGenisligi_m: 1.2,
  kapiYuksekligi_m: 2.2,
  odaSicakligi_C: -20,
  odaBagilNem_yuzde: 90,
  disSicaklik_C: 25,
  disBagilNem_yuzde: 50,
  kapiAcikSure_dkSaat: 6,
  akisFaktoru_Df: 0.8,
  koruyucuEtkinlik_E: 0,
};

describe("Soğuk Oda Kapı İnfiltrasyon Yükü", () => {
  it("Psikrometri: −20 °C %90 → h = −18,72 kJ/kg, ρ = 1,3931 kg/m³; 25 °C %50 → h = 50,30 kJ/kg, ρ = 1,1655 kg/m³", () => {
    const r = sogukOdaKapiInfiltrasyonYuku.compute(depo);
    expect(r.intermediates.oda_havasi_entalpisi_hr_kJkg).toBeCloseTo(-18.7204, 3);
    expect(r.intermediates.oda_havasi_yogunlugu_rhor_kgm3).toBeCloseTo(1.393146, 5);
    expect(r.intermediates.dis_hava_entalpisi_hi_kJkg).toBeCloseTo(50.2954, 3);
    expect(r.intermediates.dis_hava_yogunlugu_rhoi_kgm3).toBeCloseTo(1.165462, 5);
  });

  it("Fm = [2/(1 + (ρr/ρi)^(1/3))]^1,5 = 0,9557; sürekli açık kapı q = 0,221·A·Δh·ρr·√(1 − ρi/ρr)·√(gH)·Fm = 100,69 kW", () => {
    const r = sogukOdaKapiInfiltrasyonYuku.compute(depo);
    expect(r.intermediates.yogunluk_katsayisi_Fm).toBeCloseTo(0.955734, 5);
    expect(r.intermediates.surekli_acik_kapi_yuku_kW).toBeCloseTo(100.6914, 3);
  });

  it("Saatte 6 dk açık (Dt = 0,1), Df = 0,8, koruma yok: qt = 100,69 × 0,1 × 0,8 = 8,055 kW", () => {
    const r = sogukOdaKapiInfiltrasyonYuku.compute(depo);
    expect(r.intermediates.acik_kalma_orani_Dt).toBeCloseTo(0.1, 10);
    expect(r.value.ortalamaYuk_kW).toBeCloseTo(8.05531, 4);
  });

  it("ASHRAE IP formülüyle (795,6 katsayısı, Btu/h) çapraz kontrol: fark < %0,1", () => {
    const r = sogukOdaKapiInfiltrasyonYuku.compute(depo);
    const ip_kW = 100.6743;
    expect(Math.abs(r.intermediates.surekli_acik_kapi_yuku_kW as number - ip_kW) / ip_kW).toBeLessThan(0.001);
  });

  it("Şerit perde (E = 0,9) yükü 10'da birine indirir; şema oda sıcaklığı dış sıcaklıktan yüksekse reddeder", () => {
    const r = sogukOdaKapiInfiltrasyonYuku.compute({ ...depo, koruyucuEtkinlik_E: 0.9 });
    expect(r.value.ortalamaYuk_kW).toBeCloseTo(0.805531, 5);
    expect(sogukOdaKapiInfiltrasyonYukuInputSchema.safeParse({ ...depo, odaSicakligi_C: 30 }).success).toBe(false);
  });
});
