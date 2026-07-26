import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınçlı hava hattı iç çapı, hedef akış hızına göre süreklilik denkleminden
// belirlenir: D = √(4×Q / (π×v)).
// Q: hava debisi (L/s, serbest hava basıncında), v: hedef hat hızı (m/s, tipik
// ana hatlarda 6-10 m/s, dağıtım hatlarında 15-20 m/s arası tutulur).
export const basincliHavaBoruCapiInputSchema = z.object({
  debi_Q_Ls: z.number().positive(),
  hedefHiz_v_ms: z.number().positive(),
});

export type BasincliHavaBoruCapiInput = z.infer<typeof basincliHavaBoruCapiInputSchema>;

export interface BasincliHavaBoruCapiOutput {
  ic_cap_mm: number;
}

function compute(input: BasincliHavaBoruCapiInput): CalcResult<BasincliHavaBoruCapiOutput> {
  const debi_m3s = input.debi_Q_Ls / 1000;
  const cap_m = Math.sqrt((4 * debi_m3s) / (Math.PI * input.hedefHiz_v_ms));
  const ic_cap_mm = cap_m * 1000;

  return {
    value: { ic_cap_mm },
    intermediates: {
      debi_m3s: Number(debi_m3s.toFixed(5)),
      hedefHiz_v_ms: input.hedefHiz_v_ms,
    },
    standardsUsed: [],
  };
}

export const basincliHavaBoruCapi: CalcModule<
  BasincliHavaBoruCapiInput,
  BasincliHavaBoruCapiOutput
> = {
  id: "basincli-hava-boru-capi",
  title: "Basınçlı Hava Boru Çapı",
  discipline: "mekanik",
  standards: [],
  inputSchema: basincliHavaBoruCapiInputSchema,
  compute,
};
