import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğuk oda kapısından hava infiltrasyon yükü (ASHRAE Refrigeration, Gosney-Olama):
// q = 0,221·A·(hi − hr)·ρr·(1 − ρi/ρr)^0,5·(g·H)^0,5·Fm  [kW; A m², h kJ/kg, ρ kg/m³, H m]
// Fm = [2/(1 + (ρr/ρi)^(1/3))]^1,5 (yoğunluk katsayısı)
// Ortalama yük qt = q·Dt·Df·(1 − E); Dt açık kalma oranı, Df kapı akış faktörü, E koruyucu etkinliği.
// Psikrometri (ASHRAE Fundamentals, p = 101,325 kPa): W = 0,621945·pv/(p − pv),
// h = 1,006·t + W·(2501 + 1,86·t), ρ (kuru hava) = p/(287,042·T·(1 + 1,607858·W)).
// psat TS EN ISO 13788 Ek E: su üstü (θ ≥ 0) ve buz üstü (θ < 0) bağıntıları.
const ATMOSFER_BASINCI_PA = 101325;
const G = 9.81;

export const sogukOdaKapiInfiltrasyonYukuInputSchema = z
  .object({
    kapiGenisligi_m: z.number().positive(),
    kapiYuksekligi_m: z.number().positive(),
    odaSicakligi_C: z.number().min(-50).max(30),
    odaBagilNem_yuzde: z.number().min(0).max(100),
    disSicaklik_C: z.number().min(-30).max(50),
    disBagilNem_yuzde: z.number().min(0).max(100),
    kapiAcikSure_dkSaat: z.number().min(0).max(60),
    akisFaktoru_Df: z.number().positive().max(1.5),
    koruyucuEtkinlik_E: z.number().min(0).max(1),
  })
  .refine((v) => v.disSicaklik_C > v.odaSicakligi_C, {
    message: "Dış (kapı önü) sıcaklığı soğuk oda sıcaklığından yüksek olmalı",
  });

export type SogukOdaKapiInfiltrasyonYukuInput = z.infer<typeof sogukOdaKapiInfiltrasyonYukuInputSchema>;

export interface SogukOdaKapiInfiltrasyonYukuOutput {
  ortalamaYuk_kW: number;
}

function doymaBasinci_Pa(t: number): number {
  return t >= 0 ? 610.5 * Math.exp((17.269 * t) / (237.3 + t)) : 610.5 * Math.exp((21.875 * t) / (265.5 + t));
}

function havaDurumu(t: number, bagilNem: number): { h: number; rho: number; W: number } {
  const pv = (bagilNem / 100) * doymaBasinci_Pa(t);
  const W = (0.621945 * pv) / (ATMOSFER_BASINCI_PA - pv);
  const h = 1.006 * t + W * (2501 + 1.86 * t);
  const rho = ATMOSFER_BASINCI_PA / (287.042 * (t + 273.15) * (1 + 1.607858 * W));
  return { h, rho, W };
}

function compute(input: SogukOdaKapiInfiltrasyonYukuInput): CalcResult<SogukOdaKapiInfiltrasyonYukuOutput> {
  const oda = havaDurumu(input.odaSicakligi_C, input.odaBagilNem_yuzde);
  const dis = havaDurumu(input.disSicaklik_C, input.disBagilNem_yuzde);
  const A = input.kapiGenisligi_m * input.kapiYuksekligi_m;
  const H = input.kapiYuksekligi_m;

  const Fm = (2 / (1 + Math.cbrt(oda.rho / dis.rho))) ** 1.5;
  const yogunlukFarki = Math.max(0, 1 - dis.rho / oda.rho);
  const debi = 0.221 * A * Math.sqrt(yogunlukFarki) * Math.sqrt(G * H) * Fm;
  const qAcik = debi * (dis.h - oda.h) * oda.rho;
  const Dt = input.kapiAcikSure_dkSaat / 60;
  const qt = qAcik * Dt * input.akisFaktoru_Df * (1 - input.koruyucuEtkinlik_E);

  return {
    value: { ortalamaYuk_kW: qt },
    intermediates: {
      kapi_alani_m2: A,
      oda_havasi_entalpisi_hr_kJkg: oda.h,
      oda_havasi_yogunlugu_rhor_kgm3: oda.rho,
      dis_hava_entalpisi_hi_kJkg: dis.h,
      dis_hava_yogunlugu_rhoi_kgm3: dis.rho,
      yogunluk_katsayisi_Fm: Fm,
      acik_kapi_hava_debisi_m3s: debi,
      surekli_acik_kapi_yuku_kW: qAcik,
      acik_kalma_orani_Dt: Dt,
      gunluk_enerji_kWh: qt * 24,
    },
    standardsUsed: ["ASHRAE Refrigeration Handbook", "TS EN ISO 13788"],
  };
}

export const sogukOdaKapiInfiltrasyonYuku: CalcModule<SogukOdaKapiInfiltrasyonYukuInput, SogukOdaKapiInfiltrasyonYukuOutput> = {
  id: "soguk-oda-kapi-infiltrasyon-yuku",
  title: "Soğuk Oda Kapı İnfiltrasyon Yükü",
  discipline: "mekanik",
  standards: ["ASHRAE Refrigeration Handbook", "TS EN ISO 13788"],
  inputSchema: sogukOdaKapiInfiltrasyonYukuInputSchema,
  compute,
};
