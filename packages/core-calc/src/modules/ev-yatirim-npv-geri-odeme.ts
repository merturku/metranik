import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji/tasarruf yatırımı için iskontolu değerlendirme (sabit yıllık tasarruf): NPV = −I + S·[1 − (1 + r)^(−n)]/r  (r > 0; r = 0'da S·n − I).
// Basit geri ödeme = I/S; iskontolu geri ödeme: (1 + r)^t... süre = −ln(1 − I·r/S)/ln(1 + r) (I·r < S ise). İç verim oranı (IRR) ikiye bölme ile bulunur.
// Tasarruf yıllık sabit ve yıl sonu ödemeli kabul edilir (enflasyon/fiyat artışı için reel iskonto oranı kullanın). Değer 'bugünkü' para birimidir.
export const evYatirimNpvGeriOdemeInputSchema = z.object({
  yatirim_TL: z.number().positive(),
  yillikTasarruf_TL: z.number().positive(),
  iskontoOrani_yuzde: z.number().min(0).max(100),
  omur_yil: z.number().int().min(1).max(60),
});

export type EvYatirimNpvGeriOdemeInput = z.infer<typeof evYatirimNpvGeriOdemeInputSchema>;

export interface EvYatirimNpvGeriOdemeOutput {
  netBugunkuDeger_TL: number;
}

function annuity(r: number, n: number): number {
  return r === 0 ? n : (1 - (1 + r) ** -n) / r;
}

function compute(input: EvYatirimNpvGeriOdemeInput): CalcResult<EvYatirimNpvGeriOdemeOutput> {
  const r = input.iskontoOrani_yuzde / 100;
  const npv = -input.yatirim_TL + input.yillikTasarruf_TL * annuity(r, input.omur_yil);
  const basit = input.yatirim_TL / input.yillikTasarruf_TL;
  const iskontoluGeriOdeme = r === 0 ? basit : input.yatirim_TL * r < input.yillikTasarruf_TL ? -Math.log(1 - (input.yatirim_TL * r) / input.yillikTasarruf_TL) / Math.log(1 + r) : null;
  // IRR: NPV(r) = 0
  const f = (x: number) => -input.yatirim_TL + input.yillikTasarruf_TL * annuity(x, input.omur_yil);
  let irr: number | null = null;
  if (f(0) > 0) {
    let lo = 0;
    let hi = 10;
    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2;
      if (f(mid) > 0) lo = mid; else hi = mid;
    }
    irr = ((lo + hi) / 2) * 100;
  }
  return {
    value: { netBugunkuDeger_TL: npv },
    intermediates: {
      basit_geri_odeme_yil: basit,
      iskontolu_geri_odeme_yil: iskontoluGeriOdeme ?? "iskontoyla geri dönmez",
      ic_verim_orani_yuzde: irr ?? "tanımsız (toplam tasarruf yatırımdan az)",
      karlilik_endeksi: (npv + input.yatirim_TL) / input.yatirim_TL,
      toplam_nominal_tasarruf_TL: input.yillikTasarruf_TL * input.omur_yil,
    },
    standardsUsed: ["Net bugünkü değer / iç verim oranı (mühendislik ekonomisi)"],
    verdict: npv > 0 ? { status: "uygun", note: "NPV > 0: yatırım iskonto oranının üstünde getiri sağlıyor." } : npv > -0.05 * input.yatirim_TL ? { status: "sinirda", note: "NPV sıfıra yakın/hafif negatif: marjinal yatırım." } : { status: "uygunsuz", note: "NPV < 0: yatırım ömrü boyunca iskontolu maliyetini çıkarmıyor." },
  };
}

export const evYatirimNpvGeriOdeme: CalcModule<EvYatirimNpvGeriOdemeInput, EvYatirimNpvGeriOdemeOutput> = {
  id: "ev-yatirim-npv-geri-odeme",
  title: "Yatırım Net Bugünkü Değer (NPV) ve İç Verim",
  discipline: "ev",
  standards: [],
  inputSchema: evYatirimNpvGeriOdemeInputSchema,
  compute,
};
