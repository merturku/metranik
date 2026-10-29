import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yarım daire kesitli yağmur oluğunun Manning bağıntısıyla taşıma kapasitesi:
// Q = (1/n)·A·R^(2/3)·S^(1/2),  R = A/P.
// Dairesel segment (yarıçap r, su derinliği y ≤ r): θ = 2·acos(1 − y/r), A = r²(θ − sinθ)/2, P = r·θ.
// Çatıdan gelen debi (rasyonel yöntem): Qç = C·i·Aç  (i mm/h, Aç m² → m³/s için /3,6·10⁶).
// Kapasite ≥ çatı debisi ise oluk yeterlidir. EN 12056-3 oluk boyutlandırması kendi tablo/formül
// yöntemini verir; bu modül genel açık kanal hidroliğiyle ön kontroldür.
export const yagmurOluguKapasitesiInputSchema = z.object({
  olukYaricapi_mm: z.number().positive(),
  suDerinligi_orani: z.number().gt(0).max(1),
  egim_yuzde: z.number().positive(),
  manningN: z.number().positive(),
  catiAlani_m2: z.number().positive(),
  yagisSiddeti_mmh: z.number().positive(),
  akisKatsayisi: z.number().gt(0).max(1),
});

export type YagmurOluguKapasitesiInput = z.infer<typeof yagmurOluguKapasitesiInputSchema>;

export interface YagmurOluguKapasitesiOutput {
  olukKapasitesi_Ls: number;
}

function compute(input: YagmurOluguKapasitesiInput): CalcResult<YagmurOluguKapasitesiOutput> {
  const r = input.olukYaricapi_mm / 1000;
  const oran = input.suDerinligi_orani;
  const theta = 2 * Math.acos(1 - oran);
  const alan = (r * r * (theta - Math.sin(theta))) / 2;
  const cevre = r * theta;
  const hidrolikYaricap = alan / cevre;
  const egim = input.egim_yuzde / 100;
  const q = (alan * Math.pow(hidrolikYaricap, 2 / 3) * Math.sqrt(egim)) / input.manningN;
  const qLs = q * 1000;
  const catiDebisiLs = (input.akisKatsayisi * input.yagisSiddeti_mmh * input.catiAlani_m2) / 3.6e6 * 1000;
  const kullanim = catiDebisiLs / qLs;

  const verdict: CalcResult<YagmurOluguKapasitesiOutput>["verdict"] =
    kullanim <= 1
      ? { status: "uygun", note: `Çatı debisi ${catiDebisiLs.toFixed(2)} L/s ≤ oluk kapasitesi ${qLs.toFixed(2)} L/s (kullanım ${(kullanim * 100).toFixed(0)} %).` }
      : { status: "uygunsuz", note: `Çatı debisi ${catiDebisiLs.toFixed(2)} L/s > oluk kapasitesi ${qLs.toFixed(2)} L/s: oluk büyütülmeli, eğim artırılmalı veya ek iniş borusu/oluk bölümü yapılmalı.` };

  return {
    value: { olukKapasitesi_Ls: qLs },
    intermediates: {
      islak_alan_m2: alan,
      islak_cevre_m: cevre,
      hidrolik_yaricap_m: hidrolikYaricap,
      ortalama_hiz_ms: q / alan,
      cati_debisi_Ls: catiDebisiLs,
      kullanim_orani: kullanim,
    },
    standardsUsed: [],
    verdict,
  };
}

export const yagmurOluguKapasitesi: CalcModule<YagmurOluguKapasitesiInput, YagmurOluguKapasitesiOutput> = {
  id: "yagmur-olugu-kapasitesi",
  title: "Yağmur Oluğu Taşıma Kapasitesi (Manning)",
  discipline: "ev",
  standards: [],
  inputSchema: yagmurOluguKapasitesiInputSchema,
  compute,
};
