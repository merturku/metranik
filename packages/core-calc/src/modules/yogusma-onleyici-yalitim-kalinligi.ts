import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğuk akışkan taşıyan borunun yalıtım yüzeyinde yoğuşmayı önleyen asgari yalıtım
// kalınlığı (EN ISO 12241'deki silindirik ısı iletimi yaklaşımı). Birim boy için:
// Ryalıtım = ln(D2/D1)/(2π·λ), Rdış = 1/(he·π·D2),
// Tyüzey = Tortam − (Tortam − Takışkan)·Rdış/(Ryalıtım + Rdış).
// Hedef: Tyüzey = Tçiy + pay. Çiy noktası Psikrometrik Çiy Noktası modülüyle aynı
// Magnus katsayılarıyla bulunur. Tyüzey D2 ile monoton arttığından D2 ikiye bölme
// yöntemiyle çözülür. Boru cidarı ve iç taşınım direnci ihmal edilir (boru dış
// yüzeyi akışkan sıcaklığında kabul edilir — güvenli taraf).
const MAGNUS_A = 17.27;
const MAGNUS_B = 237.7;
const IKIYE_BOLME_ADIMI = 100;

function ciyNoktasi(sicaklikC: number, bagilNemYuzde: number): number {
  const alfa = Math.log(bagilNemYuzde / 100) + (MAGNUS_A * sicaklikC) / (MAGNUS_B + sicaklikC);
  return (MAGNUS_B * alfa) / (MAGNUS_A - alfa);
}

export const yogusmaOnleyiciYalitimKalinligiInputSchema = z
  .object({
    boruDisCapi_D1_mm: z.number().positive(),
    akiskanSicakligi_C: z.number(),
    ortamSicakligi_C: z.number(),
    bagilNem_yuzde: z.number().positive().lt(100),
    yalitimIletkenligi_lambda_WmK: z.number().positive(),
    disYuzeyIsiTasinim_he_Wm2K: z.number().positive(),
    guvenlikPayi_C: z.number().nonnegative(),
  })
  .refine((v) => v.akiskanSicakligi_C < v.ortamSicakligi_C, {
    message: "Akışkan ortamdan soğuk olmalı",
  })
  .refine((v) => ciyNoktasi(v.ortamSicakligi_C, v.bagilNem_yuzde) + v.guvenlikPayi_C < v.ortamSicakligi_C, {
    message: "Çiy noktası + güvenlik payı ortam sıcaklığından düşük olmalı",
  });

export type YogusmaOnleyiciYalitimKalinligiInput = z.infer<typeof yogusmaOnleyiciYalitimKalinligiInputSchema>;

export interface YogusmaOnleyiciYalitimKalinligiOutput {
  yalitimKalinligi_mm: number;
}

function compute(
  input: YogusmaOnleyiciYalitimKalinligiInput,
): CalcResult<YogusmaOnleyiciYalitimKalinligiOutput> {
  const d1 = input.boruDisCapi_D1_mm / 1000;
  const ta = input.ortamSicakligi_C;
  const tf = input.akiskanSicakligi_C;
  const lambda = input.yalitimIletkenligi_lambda_WmK;
  const he = input.disYuzeyIsiTasinim_he_Wm2K;

  const tCiy = ciyNoktasi(ta, input.bagilNem_yuzde);
  const tHedef = tCiy + input.guvenlikPayi_C;

  const direncler = (d2: number) => ({
    yalitim: Math.log(d2 / d1) / (2 * Math.PI * lambda),
    dis: 1 / (he * Math.PI * d2),
  });
  const yuzeySicakligi = (d2: number) => {
    const r = direncler(d2);
    return ta - ((ta - tf) * r.dis) / (r.yalitim + r.dis);
  };

  let d2 = d1;
  if (tf < tHedef) {
    let ust = d1 * 2;
    while (yuzeySicakligi(ust) < tHedef) ust *= 2;
    let alt = d1;
    for (let i = 0; i < IKIYE_BOLME_ADIMI; i++) {
      const orta = (alt + ust) / 2;
      if (yuzeySicakligi(orta) < tHedef) alt = orta;
      else ust = orta;
    }
    d2 = (alt + ust) / 2;
  }

  const r = direncler(d2);
  return {
    value: { yalitimKalinligi_mm: ((d2 - d1) / 2) * 1000 },
    intermediates: {
      ciy_noktasi_C: tCiy,
      hedef_yuzey_sicakligi_C: tHedef,
      yalitim_dis_capi_D2_mm: d2 * 1000,
      yuzey_sicakligi_C: yuzeySicakligi(d2),
      isi_kazanci_Wm: (ta - tf) / (r.yalitim + r.dis),
    },
    standardsUsed: ["EN ISO 12241"],
  };
}

export const yogusmaOnleyiciYalitimKalinligi: CalcModule<
  YogusmaOnleyiciYalitimKalinligiInput,
  YogusmaOnleyiciYalitimKalinligiOutput
> = {
  id: "yogusma-onleyici-yalitim-kalinligi",
  title: "Soğuk Boru Yoğuşma Önleyici Yalıtım Kalınlığı",
  discipline: "mekanik",
  standards: ["EN ISO 12241"],
  inputSchema: yogusmaOnleyiciYalitimKalinligiInputSchema,
  compute,
};
