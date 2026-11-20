import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıl tasarruf Q = (U_eski − U_yeni)·A·DG·24/1000 kWh/yıl; yakıt = Q/η; geri ödeme = yatırım / yıllık tasarruf
export const pencereDegistirmeGeriOdemeInputSchema = z.object({
  pencereAlani_m2: z.number().positive(),
  eskiU_Wm2K: z.number().positive(),
  yeniU_Wm2K: z.number().positive(),
  derece_gun: z.number().positive(),
  sistemVerimi: z.number().gt(0).max(1),
  yakitFiyati_TLkWh: z.number().min(0),
  birimYatirim_TLm2: z.number().min(0),
});

export type PencereDegistirmeGeriOdemeInput = z.infer<typeof pencereDegistirmeGeriOdemeInputSchema>;
export interface PencereDegistirmeGeriOdemeOutput {
  geriOdemeSuresi_yil: number | null;
}

function compute(input: PencereDegistirmeGeriOdemeInput): CalcResult<PencereDegistirmeGeriOdemeOutput> {
  const dU = input.eskiU_Wm2K - input.yeniU_Wm2K;
  const yatirim = input.birimYatirim_TLm2 * input.pencereAlani_m2;
  if (dU <= 0) {
    return {
      value: { geriOdemeSuresi_yil: null },
      intermediates: { yatirim_TL: yatirim, uyari: "Yeni U değeri eskisinden küçük değil: tasarruf yok" },
      standardsUsed: ["TS 825 (Q = U·A·ΔT, derece-gün)"],
      verdict: { status: "uygunsuz", note: "Isıl tasarruf yok" },
    };
  }
  const Q = (dU * input.pencereAlani_m2 * input.derece_gun * 24) / 1000;
  const yakit = Q / input.sistemVerimi;
  const tasarruf = yakit * input.yakitFiyati_TLkWh;
  const sure = tasarruf > 0 ? yatirim / tasarruf : null;
  return {
    value: { geriOdemeSuresi_yil: sure },
    intermediates: {
      delta_U_Wm2K: dU,
      yillik_isil_tasarruf_kWh: Q,
      yillik_yakit_tasarrufu_kWh: yakit,
      yillik_parasal_tasarruf_TL: tasarruf,
      yatirim_TL: yatirim,
    },
    standardsUsed: ["TS 825 (Q = U·A·ΔT, derece-gün)"],
    verdict:
      sure === null
        ? { status: "uygunsuz", note: "Yakıt fiyatı sıfır: geri ödeme hesaplanamaz" }
        : { status: sure <= 10 ? "uygun" : sure <= 20 ? "sinirda" : "uygunsuz", note: `Basit geri ödeme ${sure.toFixed(1)} yıl (fiyat artışı ve enflasyon dahil değil)` },
  };
}

export const pencereDegistirmeGeriOdeme: CalcModule<PencereDegistirmeGeriOdemeInput, PencereDegistirmeGeriOdemeOutput> = {
  id: "pencere-degistirme-geri-odeme",
  title: "Pencere Değiştirme Enerji Tasarrufu ve Geri Ödeme",
  discipline: "ev",
  standards: ["TS 825 (Q = U·A·ΔT, derece-gün)"],
  inputSchema: pencereDegistirmeGeriOdemeInputSchema,
  compute,
};
