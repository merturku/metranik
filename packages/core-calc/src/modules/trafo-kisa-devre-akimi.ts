import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Trafo nominal akımı In = Sn/(√3·Vn); kısa devre akımı Ikk = In/(Ucc%/100)
// (Ucc: trafo kısa devre gerilimi yüzdesi, etiketten alınır).
export const trafoKisaDevreAkimiInputSchema = z.object({
  trafoGucu_Sn_kVA: z.number().positive(),
  nominalGerilim_Vn_V: z.number().positive(),
  kisaDevreGerilimYuzdesi_Ucc: z.number().positive(),
});

export type TrafoKisaDevreAkimiInput = z.infer<typeof trafoKisaDevreAkimiInputSchema>;

export interface TrafoKisaDevreAkimiOutput {
  kisaDevreAkimi_kA: number;
}

function compute(input: TrafoKisaDevreAkimiInput): CalcResult<TrafoKisaDevreAkimiOutput> {
  const nominalAkimA =
    (input.trafoGucu_Sn_kVA * 1000) / (Math.sqrt(3) * input.nominalGerilim_Vn_V);
  const kisaDevreAkimiA = nominalAkimA / (input.kisaDevreGerilimYuzdesi_Ucc / 100);

  return {
    value: { kisaDevreAkimi_kA: kisaDevreAkimiA / 1000 },
    intermediates: {
      nominalAkim_A: nominalAkimA,
    },
    standardsUsed: [],
  };
}

export const trafoKisaDevreAkimi: CalcModule<
  TrafoKisaDevreAkimiInput,
  TrafoKisaDevreAkimiOutput
> = {
  id: "trafo-kisa-devre-akimi",
  title: "Trafo Kısa Devre Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: trafoKisaDevreAkimiInputSchema,
  compute,
};
