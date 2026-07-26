import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 12056-2 (Frost formülü): Q = K × √(ΣDU). K katsayısı kullanım sıklığına göre
// değişir (aralıklı kullanım ~0.5, sık kullanım ~0.7, sürekli akış ~1.0).
// DU: her tesisat elemanının deşarj birimi (fixture unit), toplamı kullanıcı girer.
export const atikSuDebisiInputSchema = z.object({
  kullanimKatsayisi_K: z.number().positive(),
  toplamDesarjBirimi_DU: z.number().positive(),
});

export type AtikSuDebisiInput = z.infer<typeof atikSuDebisiInputSchema>;

export interface AtikSuDebisiOutput {
  debi_Ls: number;
}

function compute(input: AtikSuDebisiInput): CalcResult<AtikSuDebisiOutput> {
  const debiLs = input.kullanimKatsayisi_K * Math.sqrt(input.toplamDesarjBirimi_DU);

  return {
    value: { debi_Ls: debiLs },
    intermediates: {
      kullanimKatsayisi_K: input.kullanimKatsayisi_K,
    },
    standardsUsed: ["EN 12056-2"],
  };
}

export const atikSuDebisi: CalcModule<AtikSuDebisiInput, AtikSuDebisiOutput> = {
  id: "atik-su-debisi",
  title: "Atık Su Debisi (Deşarj Birimi Yöntemi)",
  discipline: "mekanik",
  standards: ["EN 12056-2"],
  inputSchema: atikSuDebisiInputSchema,
  compute,
};
