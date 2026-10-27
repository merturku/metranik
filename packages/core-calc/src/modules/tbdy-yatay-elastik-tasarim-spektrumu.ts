import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TBDY 2018 §2.3 yatay elastik tasarım spektrumu:
// SDS = SS·FS, SD1 = S1·F1 (FS: Tablo 2.1, F1: Tablo 2.2; ara değerlerde doğrusal enterpolasyon).
// TA = 0,2·SD1/SDS, TB = SD1/SDS, TL = 6 s.
// Sae(T) = (0,4 + 0,6·T/TA)·SDS (T ≤ TA);  SDS (TA–TB);  SD1/T (TB–TL);  SD1·TL/T² (T > TL).
// Elastik tasarım spektral yerdeğiştirmesi Sde(T) = T²/(4π²)·g·Sae(T).
// ZF zeminde sahaya özel zemin davranış analizi gerektiğinden tablo kullanılmaz.
const SS_SUTUNLARI = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5];
const S1_SUTUNLARI = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
type ZeminSinifi = "ZA" | "ZB" | "ZC" | "ZD" | "ZE";
const FS_TABLOSU: Record<ZeminSinifi, number[]> = {
  ZA: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
  ZB: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
  ZC: [1.3, 1.3, 1.2, 1.2, 1.2, 1.2],
  ZD: [1.6, 1.4, 1.2, 1.1, 1.0, 1.0],
  ZE: [2.4, 1.7, 1.3, 1.1, 0.9, 0.8],
};
const F1_TABLOSU: Record<ZeminSinifi, number[]> = {
  ZA: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
  ZB: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
  ZC: [1.5, 1.5, 1.5, 1.5, 1.5, 1.4],
  ZD: [2.4, 2.2, 2.0, 1.9, 1.8, 1.7],
  ZE: [4.2, 3.3, 2.8, 2.4, 2.2, 2.0],
};
const TL = 6;
const G = 9.81;

function enterpolasyon(x: number, xs: number[], ys: number[]): number {
  if (x <= xs[0]!) return ys[0]!;
  for (let i = 1; i < xs.length; i++) {
    const x1 = xs[i]!;
    if (x <= x1) {
      const x0 = xs[i - 1]!;
      const y0 = ys[i - 1]!;
      return y0 + ((ys[i]! - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return ys[ys.length - 1]!;
}

export const tbdyYatayElastikTasarimSpektrumuInputSchema = z.object({
  kisaPeriyotHaritaIvmesi_SS: z.number().positive(),
  birSaniyeHaritaIvmesi_S1: z.number().positive(),
  zeminSinifi: z.enum(["ZA", "ZB", "ZC", "ZD", "ZE"]),
  dogalPeriyot_T_s: z.number().min(0),
});

export type TbdyYatayElastikTasarimSpektrumuInput = z.infer<typeof tbdyYatayElastikTasarimSpektrumuInputSchema>;

export interface TbdyYatayElastikTasarimSpektrumuOutput {
  spektralIvme_Sae_g: number;
}

function compute(
  input: TbdyYatayElastikTasarimSpektrumuInput,
): CalcResult<TbdyYatayElastikTasarimSpektrumuOutput> {
  const T = input.dogalPeriyot_T_s;
  const FS = enterpolasyon(input.kisaPeriyotHaritaIvmesi_SS, SS_SUTUNLARI, FS_TABLOSU[input.zeminSinifi]);
  const F1 = enterpolasyon(input.birSaniyeHaritaIvmesi_S1, S1_SUTUNLARI, F1_TABLOSU[input.zeminSinifi]);
  const SDS = input.kisaPeriyotHaritaIvmesi_SS * FS;
  const SD1 = input.birSaniyeHaritaIvmesi_S1 * F1;
  const TA = (0.2 * SD1) / SDS;
  const TB = SD1 / SDS;

  let sae: number;
  let bolge: string;
  if (T <= TA) {
    sae = (0.4 + (0.6 * T) / TA) * SDS;
    bolge = "Doğrusal artan (0 ≤ T ≤ TA)";
  } else if (T <= TB) {
    sae = SDS;
    bolge = "Sabit ivme (TA < T ≤ TB)";
  } else if (T <= TL) {
    sae = SD1 / T;
    bolge = "Sabit hız (TB < T ≤ TL)";
  } else {
    sae = (SD1 * TL) / T ** 2;
    bolge = "Sabit yerdeğiştirme (T > TL)";
  }

  return {
    value: { spektralIvme_Sae_g: sae },
    intermediates: {
      yerel_zemin_katsayisi_FS: FS,
      yerel_zemin_katsayisi_F1: F1,
      kisa_periyot_tasarim_ivmesi_SDS: SDS,
      bir_saniye_tasarim_ivmesi_SD1: SD1,
      kose_periyodu_TA_s: TA,
      kose_periyodu_TB_s: TB,
      uzun_periyot_TL_s: TL,
      spektrum_bolgesi: bolge,
      spektral_ivme_m_s2: sae * G,
      spektral_yerdegistirme_Sde_m: ((T ** 2) / (4 * Math.PI ** 2)) * G * sae,
    },
    standardsUsed: ["TBDY 2018"],
  };
}

export const tbdyYatayElastikTasarimSpektrumu: CalcModule<
  TbdyYatayElastikTasarimSpektrumuInput,
  TbdyYatayElastikTasarimSpektrumuOutput
> = {
  id: "tbdy-yatay-elastik-tasarim-spektrumu",
  title: "TBDY 2018 Yatay Elastik Tasarım Spektrumu",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: tbdyYatayElastikTasarimSpektrumuInputSchema,
  compute,
};
