import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Soğutma kulesi kapasitesi: enerji dengesiyle atılan ısı Q = ṁ×cp×Range
// (Range = giriş-çıkış su sıcaklık farkı). Yaklaşma sıcaklığı (Approach),
// çıkış su sıcaklığının yaş termometre sıcaklığına ne kadar yaklaştığını
// gösterir (Approach = Tçıkış - Tyaş); fiziksel olarak negatif olamaz ve
// pratikte ~2-3°C altına inmesi ekonomik/teknik olarak zorlaşır.
export const sogutmaKulesiKapasitesiInputSchema = z.object({
  suDebisi_m3h: z.number().positive(),
  girisSuSicakligi_C: z.number(),
  cikisSuSicakligi_C: z.number(),
  yasTermometreSicakligi_C: z.number(),
});

export type SogutmaKulesiKapasitesiInput = z.infer<
  typeof sogutmaKulesiKapasitesiInputSchema
>;

export interface SogutmaKulesiKapasitesiOutput {
  atilanIsi_kW: number;
}

const SU_YOGUNLUGU_KG_M3 = 1000;
const SU_OZGUL_ISI_KJ_KGK = 4.186;

function compute(
  input: SogutmaKulesiKapasitesiInput,
): CalcResult<SogutmaKulesiKapasitesiOutput> {
  const rangeC = input.girisSuSicakligi_C - input.cikisSuSicakligi_C;
  const approachC = input.cikisSuSicakligi_C - input.yasTermometreSicakligi_C;
  const kutleselDebiKgS = (input.suDebisi_m3h * SU_YOGUNLUGU_KG_M3) / 3600;
  const atilanIsiKW = kutleselDebiKgS * SU_OZGUL_ISI_KJ_KGK * rangeC;

  return {
    value: { atilanIsi_kW: atilanIsiKW },
    intermediates: {
      range_C: rangeC,
      approach_C: approachC,
      kutleselDebi_kgs: kutleselDebiKgS,
    },
    standardsUsed: [],
    verdict:
      approachC >= 2
        ? { status: "uygun", note: "Yaklaşma sıcaklığı pratik alt sınırın üzerinde." }
        : approachC >= 0
          ? { status: "sinirda", note: "Yaklaşma sıcaklığı düşük, kule kapasitesi zorlanabilir." }
          : { status: "uygunsuz", note: "Çıkış suyu yaş termometre sıcaklığının altında — fiziksel olarak mümkün değil." },
  };
}

export const sogutmaKulesiKapasitesi: CalcModule<
  SogutmaKulesiKapasitesiInput,
  SogutmaKulesiKapasitesiOutput
> = {
  id: "sogutma-kulesi-kapasitesi",
  title: "Soğutma Kulesi Kapasitesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaKulesiKapasitesiInputSchema,
  compute,
};
