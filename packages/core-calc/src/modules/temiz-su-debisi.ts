import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 806-3 (Frost formülü): Q = K × √(ΣLU). LU: her armatürün yükleme birimi
// (loading unit), toplamı kullanıcı girer. K katsayısı kullanım sıklığına göre değişir.
export const temizSuDebisiInputSchema = z.object({
  kullanimKatsayisi_K: z.number().positive(),
  toplamYuklemeBirimi_LU: z.number().positive(),
});

export type TemizSuDebisiInput = z.infer<typeof temizSuDebisiInputSchema>;

export interface TemizSuDebisiOutput {
  debi_Ls: number;
}

function compute(input: TemizSuDebisiInput): CalcResult<TemizSuDebisiOutput> {
  const debiLs = input.kullanimKatsayisi_K * Math.sqrt(input.toplamYuklemeBirimi_LU);

  return {
    value: { debi_Ls: debiLs },
    intermediates: {
      kullanimKatsayisi_K: input.kullanimKatsayisi_K,
    },
    standardsUsed: ["EN 806-3"],
  };
}

export const temizSuDebisi: CalcModule<TemizSuDebisiInput, TemizSuDebisiOutput> = {
  id: "temiz-su-debisi",
  title: "Temiz Su Debisi (Yükleme Birimi Yöntemi)",
  discipline: "mekanik",
  standards: ["EN 806-3"],
  inputSchema: temizSuDebisiInputSchema,
  compute,
};
