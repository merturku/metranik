import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: gerekli kollektör alanı A = Q_ihtiyaç / (I_ortalama × verim).
export const gunesKollektoruAlaniInputSchema = z.object({
  gunlukEnerjiIhtiyaci_Q_kWh: z.number().positive(),
  gunesRadyasyonu_I_kWhm2gun: z.number().positive(),
  kollektorVerimi: z.number().positive().max(1),
});

export type GunesKollektoruAlaniInput = z.infer<typeof gunesKollektoruAlaniInputSchema>;

export interface GunesKollektoruAlaniOutput {
  gerekliAlan_m2: number;
}

function compute(input: GunesKollektoruAlaniInput): CalcResult<GunesKollektoruAlaniOutput> {
  const gerekliAlanM2 =
    input.gunlukEnerjiIhtiyaci_Q_kWh /
    (input.gunesRadyasyonu_I_kWhm2gun * input.kollektorVerimi);

  return {
    value: { gerekliAlan_m2: gerekliAlanM2 },
    intermediates: {
      kollektorVerimi: input.kollektorVerimi,
    },
    standardsUsed: [],
  };
}

export const gunesKollektoruAlani: CalcModule<
  GunesKollektoruAlaniInput,
  GunesKollektoruAlaniOutput
> = {
  id: "gunes-kollektoru-alani",
  title: "Güneş Kollektörü Alanı",
  discipline: "mekanik",
  standards: [],
  inputSchema: gunesKollektoruAlaniInputSchema,
  compute,
};
