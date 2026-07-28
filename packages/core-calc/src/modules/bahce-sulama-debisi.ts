import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Peyzaj sulama debisi: 1 mm yağış/uygulama derinliği, 1 m² alan üzerinde
// 1 litre suya karşılık gelir (hacim = alan × derinlik). Gerekli debi,
// sistem verimini (damlama ~0.9, yağmurlama ~0.75) telafi etmek için
// uygulama oranına bölünerek büyütülür.
export const bahceSulamaDebisiInputSchema = z.object({
  sulanacakAlan_m2: z.number().positive(),
  uygulamaOrani_mm_saat: z.number().positive(),
  sistemVerimi: z.number().positive().max(1),
});

export type BahceSulamaDebisiInput = z.infer<typeof bahceSulamaDebisiInputSchema>;

export interface BahceSulamaDebisiOutput {
  gerekliDebi_L_saat: number;
}

function compute(input: BahceSulamaDebisiInput): CalcResult<BahceSulamaDebisiOutput> {
  const gerekliDebiLSaat =
    (input.sulanacakAlan_m2 * input.uygulamaOrani_mm_saat) / input.sistemVerimi;
  const gerekliDebiLDk = gerekliDebiLSaat / 60;

  return {
    value: { gerekliDebi_L_saat: gerekliDebiLSaat },
    intermediates: {
      gerekliDebi_L_dk: gerekliDebiLDk,
    },
    standardsUsed: [],
  };
}

export const bahceSulamaDebisi: CalcModule<
  BahceSulamaDebisiInput,
  BahceSulamaDebisiOutput
> = {
  id: "bahce-sulama-debisi",
  title: "Bahçe Sulama Debisi",
  discipline: "ev",
  standards: [],
  inputSchema: bahceSulamaDebisiInputSchema,
  compute,
};
