import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: buhar hattındaki ısı kaybı, buharın yoğuşma gizli ısısıyla
// karşılanır → kondens debisi ṁ = Qkayıp/hfg.
export const kondensDebisiInputSchema = z.object({
  hatIsiKaybi_Qkayip_kW: z.number().positive(),
  yogusmaGizliIsisi_hfg_kJkg: z.number().positive(),
});

export type KondensDebisiInput = z.infer<typeof kondensDebisiInputSchema>;

export interface KondensDebisiOutput {
  kondensDebisi_kgh: number;
}

function compute(input: KondensDebisiInput): CalcResult<KondensDebisiOutput> {
  const debiKgs = input.hatIsiKaybi_Qkayip_kW / input.yogusmaGizliIsisi_hfg_kJkg;

  return {
    value: { kondensDebisi_kgh: debiKgs * 3600 },
    intermediates: {
      kondensDebisi_kgs: debiKgs,
    },
    standardsUsed: [],
  };
}

export const kondensDebisi: CalcModule<KondensDebisiInput, KondensDebisiOutput> = {
  id: "kondens-debisi",
  title: "Kondens Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: kondensDebisiInputSchema,
  compute,
};
