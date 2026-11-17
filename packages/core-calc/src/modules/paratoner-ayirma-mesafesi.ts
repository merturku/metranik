import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 62305-3 §6.3: s = ki·(kc/km)·l. ki: LPL I 0,08; II 0,06; III–IV 0,04. kc: 1 / 0,66 / 0,44. km: hava 1, beton-tuğla 0,5.
const KI: Record<"1" | "2" | "3" | "4", number> = { "1": 0.08, "2": 0.06, "3": 0.04, "4": 0.04 };
const KC: Record<"1" | "2" | "3", number> = { "1": 1, "2": 0.66, "3": 0.44 };
const KM: Record<"hava" | "beton", number> = { hava: 1, beton: 0.5 };

export const paratonerAyirmaMesafesiInputSchema = z.object({
  lpl: z.enum(["1", "2", "3", "4"]),
  inenIletkenSayisi: z.enum(["1", "2", "3"]),
  ortam: z.enum(["hava", "beton"]),
  l_m: z.number().positive(),
});

export type ParatonerAyirmaMesafesiInput = z.infer<typeof paratonerAyirmaMesafesiInputSchema>;

export interface ParatonerAyirmaMesafesiOutput {
  ayirmaMesafesi_m: number;
}

function compute(input: ParatonerAyirmaMesafesiInput): CalcResult<ParatonerAyirmaMesafesiOutput> {
  const ki = KI[input.lpl];
  const kc = KC[input.inenIletkenSayisi];
  const km = KM[input.ortam];
  return {
    value: { ayirmaMesafesi_m: (ki * kc * input.l_m) / km },
    intermediates: { ki, kc, km },
    standardsUsed: ["TS EN 62305-3 §6.3"],
  };
}

export const paratonerAyirmaMesafesi: CalcModule<ParatonerAyirmaMesafesiInput, ParatonerAyirmaMesafesiOutput> = {
  id: "paratoner-ayirma-mesafesi",
  title: "Paratoner Ayırma (Emniyet) Mesafesi",
  discipline: "elektrik",
  standards: ["TS EN 62305-3"],
  inputSchema: paratonerAyirmaMesafesiInputSchema,
  compute,
};
