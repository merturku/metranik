import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İzentropik (adyabatik) sıkıştırma bağıntısı: T2 = T1·(P2/P1)^((k-1)/k).
// Hava için özgül ısı oranı k≈1.4.
const HAVA_OZGUL_ISI_ORANI_K = 1.4;

export const kompresorSikistirmaSicakligiInputSchema = z.object({
  girisSicakligi_T1_C: z.number(),
  girisBasinci_P1_bar: z.number().positive(),
  cikisBasinci_P2_bar: z.number().positive(),
});

export type KompresorSikistirmaSicakligiInput = z.infer<
  typeof kompresorSikistirmaSicakligiInputSchema
>;

export interface KompresorSikistirmaSicakligiOutput {
  cikisSicakligi_C: number;
}

function compute(
  input: KompresorSikistirmaSicakligiInput,
): CalcResult<KompresorSikistirmaSicakligiOutput> {
  const girisSicakligiK = input.girisSicakligi_T1_C + 273.15;
  const basincOrani = input.cikisBasinci_P2_bar / input.girisBasinci_P1_bar;
  const cikisSicakligiK =
    girisSicakligiK * Math.pow(basincOrani, (HAVA_OZGUL_ISI_ORANI_K - 1) / HAVA_OZGUL_ISI_ORANI_K);

  return {
    value: { cikisSicakligi_C: cikisSicakligiK - 273.15 },
    intermediates: {
      basincOrani,
      girisSicakligi_K: girisSicakligiK,
    },
    standardsUsed: ["İzentropik Sıkıştırma Bağıntısı"],
  };
}

export const kompresorSikistirmaSicakligi: CalcModule<
  KompresorSikistirmaSicakligiInput,
  KompresorSikistirmaSicakligiOutput
> = {
  id: "kompresor-sikistirma-sicakligi",
  title: "Kompresör Sıkıştırma Sıcaklığı",
  discipline: "mekanik",
  standards: ["İzentropik Sıkıştırma Bağıntısı"],
  inputSchema: kompresorSikistirmaSicakligiInputSchema,
  compute,
};
