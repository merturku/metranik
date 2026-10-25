import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Paralel çalışan iki trafonun yük paylaşımı (IEC 60076-8 paralel çalışma esasları):
// aynı dönüştürme oranı, bağlantı grubu ve benzer X/R oranında yük, kısa devre
// empedanslarıyla ters orantılı paylaşılır: Si = Syük · (Sri/uki) / Σ(Srj/ukj).
// Hiçbir trafo aşırı yüklenmeden çekilebilecek en büyük toplam yük:
// Smaks = min(uki) · Σ(Srj/ukj) (en düşük uk'lu trafo önce anma gücüne ulaşır).
// uk değerleri arasındaki farkın %10'u aşmaması önerilir.
export const trafoParalelYukPaylasimiInputSchema = z.object({
  trafo1Guc_kVA: z.number().positive(),
  trafo1Uk_yuzde: z.number().positive().max(25),
  trafo2Guc_kVA: z.number().positive(),
  trafo2Uk_yuzde: z.number().positive().max(25),
  toplamYuk_kVA: z.number().positive(),
});

export type TrafoParalelYukPaylasimiInput = z.infer<typeof trafoParalelYukPaylasimiInputSchema>;

export interface TrafoParalelYukPaylasimiOutput {
  azamiToplamYuk_kVA: number;
}

function compute(input: TrafoParalelYukPaylasimiInput): CalcResult<TrafoParalelYukPaylasimiOutput> {
  const { trafo1Guc_kVA: S1, trafo1Uk_yuzde: uk1, trafo2Guc_kVA: S2, trafo2Uk_yuzde: uk2 } = input;
  const a1 = S1 / uk1;
  const a2 = S2 / uk2;
  const toplamA = a1 + a2;
  const yuk1 = (input.toplamYuk_kVA * a1) / toplamA;
  const yuk2 = (input.toplamYuk_kVA * a2) / toplamA;
  const oran1 = yuk1 / S1;
  const oran2 = yuk2 / S2;
  const sMaks = Math.min(uk1, uk2) * toplamA;
  const ukFarki = (Math.max(uk1, uk2) / Math.min(uk1, uk2) - 1) * 100;

  const verdict: CalcResult<TrafoParalelYukPaylasimiOutput>["verdict"] =
    oran1 > 1 || oran2 > 1
      ? {
          status: "uygunsuz",
          note: `${oran1 > 1 ? "T1" : "T2"} aşırı yükleniyor (T1 %${(oran1 * 100).toFixed(0)}, T2 %${(oran2 * 100).toFixed(0)}). Aşırı yük olmadan en fazla ${sMaks.toFixed(0)} kVA çekilebilir (toplam anma ${S1 + S2} kVA).`,
        }
      : ukFarki > 10
        ? {
            status: "sinirda",
            note: `Yükler sınırda değil (T1 %${(oran1 * 100).toFixed(0)}, T2 %${(oran2 * 100).toFixed(0)}) ama uk farkı %${ukFarki.toFixed(1)} > %10: kurulu güç tam kullanılamaz (en fazla ${sMaks.toFixed(0)} kVA).`,
          }
        : {
            status: "uygun",
            note: `T1 %${(oran1 * 100).toFixed(0)}, T2 %${(oran2 * 100).toFixed(0)} yüklü; uk farkı %${ukFarki.toFixed(1)}.`,
          };

  return {
    value: { azamiToplamYuk_kVA: sMaks },
    intermediates: {
      trafo1_yuku_kVA: yuk1,
      trafo1_yuklenme_yuzde: oran1 * 100,
      trafo2_yuku_kVA: yuk2,
      trafo2_yuklenme_yuzde: oran2 * 100,
      uk_farki_yuzde: ukFarki,
      kurulu_guc_kullanim_orani_yuzde: (sMaks / (S1 + S2)) * 100,
    },
    standardsUsed: ["IEC 60076-8"],
    verdict,
  };
}

export const trafoParalelYukPaylasimi: CalcModule<TrafoParalelYukPaylasimiInput, TrafoParalelYukPaylasimiOutput> = {
  id: "trafo-paralel-yuk-paylasimi",
  title: "Trafoların Paralel Çalışma Yük Paylaşımı",
  discipline: "elektrik",
  standards: ["IEC 60076-8"],
  inputSchema: trafoParalelYukPaylasimiInputSchema,
  compute,
};
