import { describe, it, expect } from "vitest";
import {
  tbdyYatayElastikTasarimSpektrumu,
  tbdyYatayElastikTasarimSpektrumuInputSchema,
} from "./tbdy-yatay-elastik-tasarim-spektrumu";

// ideCAD TBDY 2018 spektrum örneği: SS = 0,927, S1 = 0,259, ZC → Tablo 2.1/2.2'den FS = 1,2, F1 = 1,5
const ornek = {
  kisaPeriyotHaritaIvmesi_SS: 0.927,
  birSaniyeHaritaIvmesi_S1: 0.259,
  zeminSinifi: "ZC" as const,
  dogalPeriyot_T_s: 0.5,
};

describe("TBDY 2018 Yatay Elastik Tasarım Spektrumu", () => {
  it("ZC, SS = 0,927, S1 = 0,259: FS = 1,2, F1 = 1,5 → SDS = 1,1124, SD1 = 0,3885", () => {
    const r = tbdyYatayElastikTasarimSpektrumu.compute(ornek);
    expect(r.intermediates.yerel_zemin_katsayisi_FS).toBeCloseTo(1.2, 10);
    expect(r.intermediates.yerel_zemin_katsayisi_F1).toBeCloseTo(1.5, 10);
    expect(r.intermediates.kisa_periyot_tasarim_ivmesi_SDS).toBeCloseTo(1.1124, 10);
    expect(r.intermediates.bir_saniye_tasarim_ivmesi_SD1).toBeCloseTo(0.3885, 10);
  });

  it("Köşe periyotları TA = 0,2·SD1/SDS = 0,0698 s, TB = SD1/SDS = 0,3492 s; T = 0,5 s → Sae = SD1/T = 0,777 g", () => {
    const r = tbdyYatayElastikTasarimSpektrumu.compute(ornek);
    expect(r.intermediates.kose_periyodu_TA_s).toBeCloseTo(0.069849, 6);
    expect(r.intermediates.kose_periyodu_TB_s).toBeCloseTo(0.349245, 6);
    expect(r.value.spektralIvme_Sae_g).toBeCloseTo(0.777, 10);
    expect(r.intermediates.spektral_yerdegistirme_Sde_m).toBeCloseTo(0.048269, 6);
  });

  it("Tablo ara değerinde doğrusal enterpolasyon: ZD, SS = 0,6 → FS = 1,32; S1 = 0,35 → F1 = 1,95", () => {
    const r = tbdyYatayElastikTasarimSpektrumu.compute({
      kisaPeriyotHaritaIvmesi_SS: 0.6,
      birSaniyeHaritaIvmesi_S1: 0.35,
      zeminSinifi: "ZD",
      dogalPeriyot_T_s: 0.5,
    });
    expect(r.intermediates.yerel_zemin_katsayisi_FS).toBeCloseTo(1.32, 10);
    expect(r.intermediates.yerel_zemin_katsayisi_F1).toBeCloseTo(1.95, 10);
    expect(r.value.spektralIvme_Sae_g).toBeCloseTo(0.792, 10); // TA < 0,5 < TB → SDS
  });

  it("Spektrum bölgeleri: T = 0 → 0,4·SDS; T = 0,1 s doğrusal; T = 1 s → SD1/T; T = 8 s → SD1·TL/T²", () => {
    const g = { kisaPeriyotHaritaIvmesi_SS: 0.6, birSaniyeHaritaIvmesi_S1: 0.35, zeminSinifi: "ZD" as const };
    const s = (T: number) => tbdyYatayElastikTasarimSpektrumu.compute({ ...g, dogalPeriyot_T_s: T }).value.spektralIvme_Sae_g;
    expect(s(0)).toBeCloseTo(0.4 * 0.792, 10);
    expect(s(0.1)).toBeCloseTo((0.4 + (0.6 * 0.1) / ((0.2 * 0.6825) / 0.792)) * 0.792, 10);
    expect(s(1)).toBeCloseTo(0.6825, 10);
    expect(s(8)).toBeCloseTo((0.6825 * 6) / 64, 10);
  });

  it("Spektrum köşe periyotlarında süreklidir (TB ve TL)", () => {
    const r = tbdyYatayElastikTasarimSpektrumu.compute(ornek);
    const TB = r.intermediates.kose_periyodu_TB_s as number;
    const s = (T: number) => tbdyYatayElastikTasarimSpektrumu.compute({ ...ornek, dogalPeriyot_T_s: T }).value.spektralIvme_Sae_g;
    expect(s(TB + 1e-9)).toBeCloseTo(s(TB), 6);
    expect(s(6 + 1e-9)).toBeCloseTo(s(6), 6);
  });

  it("Tablo sınırlarının dışında uç değerler kullanılır; şema ZF ve negatif periyodu reddeder", () => {
    const alt = tbdyYatayElastikTasarimSpektrumu.compute({
      kisaPeriyotHaritaIvmesi_SS: 0.1,
      birSaniyeHaritaIvmesi_S1: 0.8,
      zeminSinifi: "ZE",
      dogalPeriyot_T_s: 1,
    });
    expect(alt.intermediates.yerel_zemin_katsayisi_FS).toBe(2.4);
    expect(alt.intermediates.yerel_zemin_katsayisi_F1).toBe(2.0);
    const ust = tbdyYatayElastikTasarimSpektrumu.compute({ ...ornek, kisaPeriyotHaritaIvmesi_SS: 2, zeminSinifi: "ZE" });
    expect(ust.intermediates.yerel_zemin_katsayisi_FS).toBe(0.8);
    expect(tbdyYatayElastikTasarimSpektrumuInputSchema.safeParse({ ...ornek, zeminSinifi: "ZF" }).success).toBe(false);
    expect(tbdyYatayElastikTasarimSpektrumuInputSchema.safeParse({ ...ornek, dogalPeriyot_T_s: -1 }).success).toBe(false);
  });
});
