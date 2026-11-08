import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Buhar sıkıştırmalı soğutma çevriminde devreye alma kontrolü: kızdırma (superheat) SH = T_emme − T_evap,
// aşırı soğutma (subcooling) SC = T_yoğuşma − T_sıvı hattı. Doyma sıcaklıkları manometre basıncından akışkan
// tablosuyla okunur (girdi). Kabul aralıkları cihaz/genleşme elemanına göre değişir (termostatik vanada tipik
// kızdırma 5–10 K, aşırı soğutma 3–8 K); üretici değerleri girdidir. Aralık dışı ≤ 2 K ise "sınırda".
export const sogutmaKizdirmaAsiriSogutmaKontroluInputSchema = z.object({
  emmeHattiSicakligi_C: z.number(),
  evaporasyonSicakligi_C: z.number(),
  yogusmaSicakligi_C: z.number(),
  sivi_hatti_sicakligi_C: z.number(),
  kizdirmaMin_K: z.number().min(0),
  kizdirmaMax_K: z.number().min(0),
  asiriSogutmaMin_K: z.number().min(0),
  asiriSogutmaMax_K: z.number().min(0),
});

export type SogutmaKizdirmaAsiriSogutmaKontroluInput = z.infer<typeof sogutmaKizdirmaAsiriSogutmaKontroluInputSchema>;

export interface SogutmaKizdirmaAsiriSogutmaKontroluOutput {
  kizdirma_K: number;
}

function sapma(v: number, min: number, max: number): number {
  return v < min ? min - v : v > max ? v - max : 0;
}

function compute(input: SogutmaKizdirmaAsiriSogutmaKontroluInput): CalcResult<SogutmaKizdirmaAsiriSogutmaKontroluOutput> {
  const sh = input.emmeHattiSicakligi_C - input.evaporasyonSicakligi_C;
  const sc = input.yogusmaSicakligi_C - input.sivi_hatti_sicakligi_C;
  const sSh = sapma(sh, input.kizdirmaMin_K, input.kizdirmaMax_K);
  const sSc = sapma(sc, input.asiriSogutmaMin_K, input.asiriSogutmaMax_K);
  const en = Math.max(sSh, sSc);
  const durum = en === 0 ? "uygun" : en <= 2 ? "sinirda" : "uygunsuz";
  const notlar: string[] = [];
  if (sSh > 0) notlar.push(sh < input.kizdirmaMin_K ? "kızdırma düşük (sıvı kaçağı/kompresöre sıvı riski)" : "kızdırma yüksek (evaporatör yetersiz beslenir)");
  if (sSc > 0) notlar.push(sc < input.asiriSogutmaMin_K ? "aşırı soğutma düşük (gaz kabarcığı/şarj eksik olabilir)" : "aşırı soğutma yüksek (aşırı şarj/kondenser dolması olabilir)");
  return {
    value: { kizdirma_K: sh },
    intermediates: { asiri_sogutma_K: sc, kizdirma_sapmasi_K: sSh, asiri_sogutma_sapmasi_K: sSc },
    standardsUsed: ["Soğutma çevrimi devreye alma uygulaması (üretici aralığına göre)"],
    verdict: { status: durum, note: durum === "uygun" ? "Kızdırma ve aşırı soğutma kabul aralığında." : notlar.join("; ") + "." },
  };
}

export const sogutmaKizdirmaAsiriSogutmaKontrolu: CalcModule<SogutmaKizdirmaAsiriSogutmaKontroluInput, SogutmaKizdirmaAsiriSogutmaKontroluOutput> = {
  id: "sogutma-kizdirma-asiri-sogutma-kontrolu",
  title: "Soğutma Çevrimi Kızdırma ve Aşırı Soğutma Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaKizdirmaAsiriSogutmaKontroluInputSchema,
  compute,
};
