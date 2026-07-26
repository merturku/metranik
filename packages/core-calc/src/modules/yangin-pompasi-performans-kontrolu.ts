import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// NFPA 20 kabul testi kriteri: anma debisinde ölçülen basınç, gerekli (anma)
// basıncını karşılamalı. Tam churn/overload eğrisi bu modülde gömülü değildir,
// yalnız anma noktası karşılaştırılır.
export const yanginPompasiPerformansKontroluInputSchema = z.object({
  olculenBasinc_bar: z.number().positive(),
  gerekliBasinc_bar: z.number().positive(),
});

export type YanginPompasiPerformansKontroluInput = z.infer<
  typeof yanginPompasiPerformansKontroluInputSchema
>;

export interface YanginPompasiPerformansKontroluOutput {
  marj_bar: number;
}

function compute(
  input: YanginPompasiPerformansKontroluInput,
): CalcResult<YanginPompasiPerformansKontroluOutput> {
  const marjBar = input.olculenBasinc_bar - input.gerekliBasinc_bar;
  const uygun = marjBar >= 0;

  return {
    value: { marj_bar: marjBar },
    intermediates: {
      olculenBasinc_bar: input.olculenBasinc_bar,
      gerekliBasinc_bar: input.gerekliBasinc_bar,
    },
    standardsUsed: ["NFPA 20"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen basınç anma noktasında gerekli basıncı karşılıyor." }
      : { status: "uygunsuz", note: "Ölçülen basınç anma noktasında yetersiz." },
  };
}

export const yanginPompasiPerformansKontrolu: CalcModule<
  YanginPompasiPerformansKontroluInput,
  YanginPompasiPerformansKontroluOutput
> = {
  id: "yangin-pompasi-performans-kontrolu",
  title: "Yangın Pompası Performans Kontrolü",
  discipline: "mekanik",
  standards: ["NFPA 20"],
  inputSchema: yanginPompasiPerformansKontroluInputSchema,
  compute,
};
