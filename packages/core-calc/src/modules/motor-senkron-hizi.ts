import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Asenkron/senkron motorun senkron devir sayısı: n = 120×f / p.
// f: şebeke frekansı (Hz), p: motorun kutup sayısı (2, 4, 6, 8...).
export const motorSenkronHiziInputSchema = z.object({
  sebekeFrekansi_f_Hz: z.number().positive(),
  kutupSayisi_p: z.number().positive(),
});

export type MotorSenkronHiziInput = z.infer<typeof motorSenkronHiziInputSchema>;

export interface MotorSenkronHiziOutput {
  senkronHiz_n_rpm: number;
}

function compute(input: MotorSenkronHiziInput): CalcResult<MotorSenkronHiziOutput> {
  const senkronHiz_n_rpm = (120 * input.sebekeFrekansi_f_Hz) / input.kutupSayisi_p;

  return {
    value: { senkronHiz_n_rpm },
    intermediates: {
      kutupSayisi_p: input.kutupSayisi_p,
    },
    standardsUsed: [],
  };
}

export const motorSenkronHizi: CalcModule<MotorSenkronHiziInput, MotorSenkronHiziOutput> = {
  id: "motor-senkron-hizi",
  title: "Motor Senkron Hızı",
  discipline: "elektrik",
  standards: [],
  inputSchema: motorSenkronHiziInputSchema,
  compute,
};
