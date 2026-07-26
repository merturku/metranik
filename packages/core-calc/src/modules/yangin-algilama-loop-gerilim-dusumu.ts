import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 54 / NFPA 72: yangın algılama loop hattında gidiş-dönüş iki iletken üzerinden
// gerilim düşümü ΔU = 2·ρ·L·I/A. Hat sonu eleman gerilimi, asgari çalışma
// gerilimini (24V sistemlerde tipik ≥17V) sağlamalıdır.
const BAKIR_OZGUL_DIRENC_OHM_MM2_M = 0.0175;

export const yanginAlgilamaLoopGerilimDusumuInputSchema = z.object({
  kaynakGerilimi_V: z.number().positive(),
  hatUzunlugu_m: z.number().positive(),
  akim_A: z.number().positive(),
  kesit_mm2: z.number().positive(),
  minimumUcElemanGerilimi_V: z.number().positive(),
});

export type YanginAlgilamaLoopGerilimDusumuInput = z.infer<
  typeof yanginAlgilamaLoopGerilimDusumuInputSchema
>;

export interface YanginAlgilamaLoopGerilimDusumuOutput {
  ucElemanGerilimi_V: number;
}

function compute(
  input: YanginAlgilamaLoopGerilimDusumuInput,
): CalcResult<YanginAlgilamaLoopGerilimDusumuOutput> {
  const gerilimDusumuV =
    (2 * BAKIR_OZGUL_DIRENC_OHM_MM2_M * input.hatUzunlugu_m * input.akim_A) /
    input.kesit_mm2;
  const ucElemanGerilimiV = input.kaynakGerilimi_V - gerilimDusumuV;
  const marjV = ucElemanGerilimiV - input.minimumUcElemanGerilimi_V;
  const uygun = marjV >= 0;

  return {
    value: { ucElemanGerilimi_V: ucElemanGerilimiV },
    intermediates: {
      gerilimDusumu_V: gerilimDusumuV,
      minimumUcElemanGerilimi_V: input.minimumUcElemanGerilimi_V,
      marj_V: marjV,
    },
    standardsUsed: ["EN 54", "NFPA 72"],
    verdict: uygun
      ? { status: "uygun", note: "Hat sonu eleman gerilimi asgari değerin üzerinde." }
      : { status: "uygunsuz", note: "Hat sonu eleman gerilimi asgari değerin altında." },
  };
}

export const yanginAlgilamaLoopGerilimDusumu: CalcModule<
  YanginAlgilamaLoopGerilimDusumuInput,
  YanginAlgilamaLoopGerilimDusumuOutput
> = {
  id: "yangin-algilama-loop-gerilim-dusumu",
  title: "Yangın Algılama Loop Gerilim Düşümü",
  discipline: "elektrik",
  standards: ["EN 54", "NFPA 72"],
  inputSchema: yanginAlgilamaLoopGerilimDusumuInputSchema,
  compute,
};
