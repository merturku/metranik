import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı gerçek güç (şebekeden çekilen giriş gücü): P = √3 × V × I × cosφ.
// Mil (çıkış) gücü isteniyorsa bu değer ayrıca motor verimiyle çarpılmalıdır.
export const motorGirisGucuInputSchema = z.object({
  hatGerilimi_V_V: z.number().positive(),
  hatAkimi_I_A: z.number().positive(),
  gucFaktoru_cosfi: z.number().positive().max(1),
});

export type MotorGirisGucuInput = z.infer<typeof motorGirisGucuInputSchema>;

export interface MotorGirisGucuOutput {
  girisGucu_kW: number;
}

function compute(input: MotorGirisGucuInput): CalcResult<MotorGirisGucuOutput> {
  const girisGucuW =
    Math.sqrt(3) * input.hatGerilimi_V_V * input.hatAkimi_I_A * input.gucFaktoru_cosfi;

  return {
    value: { girisGucu_kW: girisGucuW / 1000 },
    intermediates: {
      gucFaktoru_cosfi: input.gucFaktoru_cosfi,
    },
    standardsUsed: [],
  };
}

export const motorGirisGucu: CalcModule<MotorGirisGucuInput, MotorGirisGucuOutput> = {
  id: "motor-giris-gucu",
  title: "Motor Giriş Gücü",
  discipline: "elektrik",
  standards: [],
  inputSchema: motorGirisGucuInputSchema,
  compute,
};
