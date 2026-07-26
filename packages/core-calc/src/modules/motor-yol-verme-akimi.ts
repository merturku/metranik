import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğrudan yol verme (DOL) kalkış akımı: Ikalkış = Inom × başlama oranı.
// Başlama oranı motor tipine/yol verme yöntemine göre değişir (DOL ~6-8, yıldız-üçgen ~2-3).
export const motorYolVermeAkimiInputSchema = z.object({
  nominalAkim_A: z.number().positive(),
  baslamaOrani: z.number().positive(),
});

export type MotorYolVermeAkimiInput = z.infer<typeof motorYolVermeAkimiInputSchema>;

export interface MotorYolVermeAkimiOutput {
  kalkisAkimi_A: number;
}

function compute(input: MotorYolVermeAkimiInput): CalcResult<MotorYolVermeAkimiOutput> {
  const kalkisAkimiA = input.nominalAkim_A * input.baslamaOrani;

  return {
    value: { kalkisAkimi_A: kalkisAkimiA },
    intermediates: {
      baslamaOrani: input.baslamaOrani,
    },
    standardsUsed: [],
  };
}

export const motorYolVermeAkimi: CalcModule<
  MotorYolVermeAkimiInput,
  MotorYolVermeAkimiOutput
> = {
  id: "motor-yol-verme-akimi",
  title: "Motor Yol Verme Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: motorYolVermeAkimiInputSchema,
  compute,
};
