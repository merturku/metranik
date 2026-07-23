import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınç kaybını pompa basma yüksekliğine çevirir: H = P/(ρg). Fiziksel sabitler
// (su yoğunluğu, yerçekimi ivmesi) kullanılır, tablo gerekmez.
const YOGUNLUK_KG_M3 = 1000;
const YERCEKIMI_M_S2 = 9.81;

export const pompaSecimiInputSchema = z.object({
  debi_m3h: z.number().positive(),
  basincKaybi_Pa: z.number().positive(),
});

export type PompaSecimiInput = z.infer<typeof pompaSecimiInputSchema>;

export interface PompaSecimiOutput {
  debi_m3h: number;
  basmaYuksekligi_m: number;
}

function compute(input: PompaSecimiInput): CalcResult<PompaSecimiOutput> {
  const basmaYuksekligiM = input.basincKaybi_Pa / (YOGUNLUK_KG_M3 * YERCEKIMI_M_S2);

  return {
    value: { debi_m3h: input.debi_m3h, basmaYuksekligi_m: basmaYuksekligiM },
    intermediates: {
      yogunluk_kg_m3: YOGUNLUK_KG_M3,
      yercekimi_m_s2: YERCEKIMI_M_S2,
    },
    standardsUsed: [],
  };
}

export const pompaSecimi: CalcModule<PompaSecimiInput, PompaSecimiOutput> = {
  id: "pompa-secimi",
  title: "Pompa Seçimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaSecimiInputSchema,
  compute,
};
