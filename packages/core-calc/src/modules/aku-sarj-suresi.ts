import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kapasite dengesi: t = C / (I × η).
export const akuSarjSuresiInputSchema = z.object({
  bataryaKapasitesi_C_Ah: z.number().positive(),
  sarjAkimi_I_A: z.number().positive(),
  sarjVerimi_eta: z.number().positive().max(1),
});

export type AkuSarjSuresiInput = z.infer<typeof akuSarjSuresiInputSchema>;

export interface AkuSarjSuresiOutput {
  sarjSuresi_saat: number;
}

function compute(input: AkuSarjSuresiInput): CalcResult<AkuSarjSuresiOutput> {
  const sarjSuresiSaat =
    input.bataryaKapasitesi_C_Ah / (input.sarjAkimi_I_A * input.sarjVerimi_eta);

  return {
    value: { sarjSuresi_saat: sarjSuresiSaat },
    intermediates: {
      sarjVerimi_eta: input.sarjVerimi_eta,
    },
    standardsUsed: [],
  };
}

export const akuSarjSuresi: CalcModule<AkuSarjSuresiInput, AkuSarjSuresiOutput> = {
  id: "aku-sarj-suresi",
  title: "Akü Şarj Süresi",
  discipline: "elektrik",
  standards: [],
  inputSchema: akuSarjSuresiInputSchema,
  compute,
};
