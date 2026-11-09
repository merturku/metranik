import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fotovoltaik sistem performans oranı (IEC 61724-1): PR = E_ac / (P_stc · H_düzlem / G_stc),  G_stc = 1 kW/m².
// E_ac şebekeye verilen enerji (kWh), P_stc kurulu DC güç (kWp), H_düzlem panel düzlemi toplam ışınımı (kWh/m²), aynı dönem için.
// Sıcaklık, kirlenme, kablo/invertör kayıpları ve kesintiler PR'ı düşürür. İyi kurulumlarda yıllık PR ≈ 0,75–0,85 (yaygın kıyas aralığı;
// proje beklentisi ve iklimle karşılaştırın). Kısa dönemde (günlük) ışınım ölçüm hatası PR'ı etkiler; aylık/yıllık değerlendirin.
export const gesPerformansOraniPrInputSchema = z.object({
  uretilenEnerji_kWh: z.number().min(0),
  kuruluGuc_kWp: z.number().positive(),
  duzlemIsinimi_kWhm2: z.number().positive(),
});

export type GesPerformansOraniPrInput = z.infer<typeof gesPerformansOraniPrInputSchema>;

export interface GesPerformansOraniPrOutput {
  performansOrani: number;
}

function compute(input: GesPerformansOraniPrInput): CalcResult<GesPerformansOraniPrOutput> {
  const referans = input.kuruluGuc_kWp * input.duzlemIsinimi_kWhm2;
  const pr = input.uretilenEnerji_kWh / referans;
  const durum = pr >= 0.8 ? "uygun" : pr >= 0.7 ? "sinirda" : "uygunsuz";
  return {
    value: { performansOrani: pr },
    intermediates: {
      referans_verim_kWh: referans,
      kayip_yuzde: (1 - pr) * 100,
      ozgul_verim_kWh_kWp: input.uretilenEnerji_kWh / input.kuruluGuc_kWp,
      esdeger_tam_guc_saati_h: input.duzlemIsinimi_kWhm2,
    },
    standardsUsed: ["IEC 61724-1 (PV sistem performans izleme)"],
    verdict: {
      status: durum,
      note:
        durum === "uygun"
          ? "PR ≥ 0,80: sistem beklenen performansta (yaygın kıyas)."
          : durum === "sinirda"
            ? "PR 0,70–0,80: kirlenme, gölgelenme, invertör sınırlaması veya kesinti araştırılmalı."
            : "PR < 0,70: arıza/gölgelenme/ölçüm hatası olasılığı yüksek; saha incelemesi gerekir.",
    },
  };
}

export const gesPerformansOraniPr: CalcModule<GesPerformansOraniPrInput, GesPerformansOraniPrOutput> = {
  id: "ges-performans-orani-pr",
  title: "GES Performans Oranı (PR) Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 61724-1"],
  inputSchema: gesPerformansOraniPrInputSchema,
  compute,
};
