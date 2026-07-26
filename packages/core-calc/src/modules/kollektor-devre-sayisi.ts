import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Süreklilik: gerekli devre sayısı n = Toplam Debi / Devre Debisi (yukarı yuvarlanır).
export const kollektorDevreSayisiInputSchema = z.object({
  toplamDebi_m3h: z.number().positive(),
  devreDebisi_m3h: z.number().positive(),
});

export type KollektorDevreSayisiInput = z.infer<typeof kollektorDevreSayisiInputSchema>;

export interface KollektorDevreSayisiOutput {
  devreSayisi: number;
}

function compute(input: KollektorDevreSayisiInput): CalcResult<KollektorDevreSayisiOutput> {
  const devreSayisi = Math.ceil(input.toplamDebi_m3h / input.devreDebisi_m3h);

  return {
    value: { devreSayisi },
    intermediates: {
      devreBasinaGercekDebi_m3h: input.toplamDebi_m3h / devreSayisi,
    },
    standardsUsed: [],
  };
}

export const kollektorDevreSayisi: CalcModule<
  KollektorDevreSayisiInput,
  KollektorDevreSayisiOutput
> = {
  id: "kollektor-devre-sayisi",
  title: "Kollektör Devre Sayısı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kollektorDevreSayisiInputSchema,
  compute,
};
