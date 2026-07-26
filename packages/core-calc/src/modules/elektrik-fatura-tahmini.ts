import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit elektrik fatura tahmini: Tutar = Tüketim (kWh) × Birim Fiyat (TL/kWh).
// Dağıtım bedeli, vergiler (BTV, KDV) ve kademeli tarife bu basit hesaba dahil
// değildir; gerçek fatura bu kalemlerle daha yüksek çıkar.
export const elektrikFaturaTahminiInputSchema = z.object({
  aylikTuketim_kWh: z.number().positive(),
  birimFiyat_TLkWh: z.number().positive(),
});

export type ElektrikFaturaTahminiInput = z.infer<typeof elektrikFaturaTahminiInputSchema>;

export interface ElektrikFaturaTahminiOutput {
  tahminiTutar_TL: number;
}

function compute(input: ElektrikFaturaTahminiInput): CalcResult<ElektrikFaturaTahminiOutput> {
  const tahminiTutar_TL = input.aylikTuketim_kWh * input.birimFiyat_TLkWh;

  return {
    value: { tahminiTutar_TL },
    intermediates: {
      birimFiyat_TLkWh: input.birimFiyat_TLkWh,
    },
    standardsUsed: [],
  };
}

export const elektrikFaturaTahmini: CalcModule<
  ElektrikFaturaTahminiInput,
  ElektrikFaturaTahminiOutput
> = {
  id: "elektrik-fatura-tahmini",
  title: "Elektrik Fatura Tahmini",
  discipline: "ev",
  standards: [],
  inputSchema: elektrikFaturaTahminiInputSchema,
  compute,
};
