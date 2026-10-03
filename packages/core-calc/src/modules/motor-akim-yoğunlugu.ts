import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const motorAkimYoğunluguSchema = z.object({
  guc_kW: z.number().positive(),
  voltaj_V: z.number().positive().optional(),
  verim_yuzde: z.number().positive().optional(),
  kosinus_phi: z.number().positive().optional(),
});

export type MotorAkimYoğunluguInput = z.infer<typeof motorAkimYoğunluguSchema>;

export interface MotorAkimYoğunluguOutput {
  akım_A: number;
  akım_yoğunluğu_Amm2: number;
}

export const motorAkimYoğunlugu: CalcModule<MotorAkimYoğunluguInput, MotorAkimYoğunluguOutput> = {
  id: "motor-akim-yoğunlugu",
  title: "Motor Akım Yoğunluğu",
  discipline: "elektrik",
  standards: ["IEC 60034"],
  inputSchema: motorAkimYoğunluguSchema,

  compute(input: MotorAkimYoğunluguInput): CalcResult<MotorAkimYoğunluguOutput> {
    const S_kVA = input.guc_kW / input.verim_yuzde * 100;
    const I_A = (S_kVA * 1000) / (Math.sqrt(3) * input.voltaj_V * input.kosinus_phi);
    const A_mm2 = 4; // reference cross-section
    const yoğunluk = I_A / A_mm2;

    return {
      value: {
        akım_A: Math.round(I_A * 10) / 10,
        akım_yoğunluğu_Amm2: Math.round(yoğunluk * 100) / 100,
      },
      intermediates: { görünür_guc_kVA: Math.round(S_kVA * 10) / 10 },
      standardsUsed: ["IEC 60034"],
    };
  },
};
