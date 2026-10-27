import { describe, it, expect } from "vitest";
import { havuzBuharlasmaIsiKaybi, havuzBuharlasmaIsiKaybiInputSchema } from "./havuz-buharlasma-isi-kaybi";

const havuz = {
  havuzAlani_m2: 32,
  suSicakligi_C: 28,
  havaSicakligi_C: 29,
  bagilNem_yuzde: 60,
  aktiviteKatsayisi_Fa: 0.5,
};

describe("Kapalı Havuz Buharlaşma ve Isı Kaybı", () => {
  it("pw(28 °C) = 3,7777 kPa, pa = 0,60 × psat(29 °C) = 2,4020 kPa (TS EN ISO 13788 Ek E)", () => {
    const r = havuzBuharlasmaIsiKaybi.compute(havuz);
    expect(r.intermediates.su_yuzeyi_doyma_basinci_pw_kPa).toBeCloseTo(3.777675, 5);
    expect(r.intermediates.havadaki_buhar_basinci_pa_kPa).toBeCloseTo(2.401965, 5);
  });

  it("wp = 4·10⁻⁵ × 32 × 1,3757 × 0,5 = 8,8045·10⁻⁴ kg/s = 3,170 kg/h; günde 76,07 L", () => {
    const r = havuzBuharlasmaIsiKaybi.compute(havuz);
    expect(r.value.buharlasma_kgh).toBeCloseTo(3.169637, 5);
    expect(r.intermediates.gunluk_su_kaybi_L).toBeCloseTo(76.0713, 3);
  });

  it("Gizli ısı kaybı = wp × hfg(28 °C) = 8,8045·10⁻⁴ × 2434,9 = 2,144 kW", () => {
    const r = havuzBuharlasmaIsiKaybi.compute(havuz);
    expect(r.intermediates.buharlasma_gizli_isisi_hfg_kJkg).toBeCloseTo(2434.892, 3);
    expect(r.intermediates.buharlasma_isi_kaybi_kW).toBeCloseTo(2.143812, 5);
  });

  it("ASHRAE IP formülüyle çapraz kontrol: 0,1 × A(ft²) × Δp(inHg) × Fa lb/h ile fark < %0,5", () => {
    const r = havuzBuharlasmaIsiKaybi.compute(havuz);
    const dp_inHg = (3.777675 - 2.401965) * 0.2952998;
    const ip_kgh = 0.1 * 32 * 10.7639104 * dp_inHg * 0.5 * 0.45359237;
    expect(Math.abs(r.value.buharlasma_kgh - ip_kgh) / ip_kgh).toBeLessThan(0.005);
  });

  it("Kullanılan havuz (Fa = 1,0) buharlaşmayı iki katına çıkarır; hava suya göre çok nemliyse buharlaşma 0", () => {
    const kullanilan = havuzBuharlasmaIsiKaybi.compute({ ...havuz, aktiviteKatsayisi_Fa: 1 });
    expect(kullanilan.value.buharlasma_kgh).toBeCloseTo(2 * 3.169637, 5);
    const yogusma = havuzBuharlasmaIsiKaybi.compute({ ...havuz, suSicakligi_C: 20, bagilNem_yuzde: 90 });
    expect(yogusma.value.buharlasma_kgh).toBe(0);
    expect(havuzBuharlasmaIsiKaybiInputSchema.safeParse({ ...havuz, bagilNem_yuzde: 120 }).success).toBe(false);
  });
});
