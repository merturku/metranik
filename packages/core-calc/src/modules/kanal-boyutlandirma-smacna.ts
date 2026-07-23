import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// SMACNA hız metodu: süreklilik denklemi Q = V · A (evrensel akışkanlar mekaniği,
// tablo değil). Hedef hız SMACNA'nın önerdiği aralıklardan mühendis tarafından
// seçilip girilir; bu modül o aralıkları gömmez, yalnız kesiti hesaplar.
export const kanalBoyutlandirmaInputSchema = z.object({
  debi: z.number().positive(),
  hiz: z.number().positive(),
});

export type KanalBoyutlandirmaInput = z.infer<typeof kanalBoyutlandirmaInputSchema>;

export interface KanalBoyutlandirmaOutput {
  capD_mm: number;
}

function compute(input: KanalBoyutlandirmaInput): CalcResult<KanalBoyutlandirmaOutput> {
  const kesitAlaniM2 = input.debi / input.hiz;
  const capDM = Math.sqrt((4 * kesitAlaniM2) / Math.PI);
  const capDMm = capDM * 1000;

  return {
    value: { capD_mm: capDMm },
    intermediates: {
      kesitAlani_m2: kesitAlaniM2,
      hedefHiz_m_s: input.hiz,
    },
    standardsUsed: ["SMACNA"],
  };
}

export const kanalBoyutlandirmaSmacna: CalcModule<
  KanalBoyutlandirmaInput,
  KanalBoyutlandirmaOutput
> = {
  id: "kanal-boyutlandirma-smacna",
  title: "Kanal Boyutlandırma",
  discipline: "mekanik",
  standards: ["SMACNA"],
  inputSchema: kanalBoyutlandirmaInputSchema,
  compute,
};
