import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit su fatura tahmini: Tutar = Tüketim (m³) × Birim Fiyat (TL/m³).
// Atık su/kanalizasyon bedeli ve kademeli tarife bu basit hesaba dahil değildir;
// gerçek fatura bu kalemlerle daha yüksek çıkar.
export const suFaturasiTahminiInputSchema = z.object({
  aylikTuketim_m3: z.number().positive(),
  birimFiyat_TLm3: z.number().positive(),
});

export type SuFaturasiTahminiInput = z.infer<typeof suFaturasiTahminiInputSchema>;

export interface SuFaturasiTahminiOutput {
  tahminiTutar_TL: number;
}

function compute(input: SuFaturasiTahminiInput): CalcResult<SuFaturasiTahminiOutput> {
  const tahminiTutar_TL = input.aylikTuketim_m3 * input.birimFiyat_TLm3;

  return {
    value: { tahminiTutar_TL },
    intermediates: {
      birimFiyat_TLm3: input.birimFiyat_TLm3,
    },
    standardsUsed: [],
  };
}

export const suFaturasiTahmini: CalcModule<
  SuFaturasiTahminiInput,
  SuFaturasiTahminiOutput
> = {
  id: "su-faturasi-tahmini",
  title: "Su Faturası Tahmini",
  discipline: "ev",
  standards: [],
  inputSchema: suFaturasiTahminiInputSchema,
  compute,
};
