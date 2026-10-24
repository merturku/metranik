import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı motor anma akımı: I = Pmil / (√3 × U × cosφ × η); iletkendeki akım
// yoğunluğu J = I / S.
export const motorAkimYoğunluguSchema = z.object({
  guc_kW: z.number().positive(),
  voltaj_V: z.number().positive(),
  verim_yuzde: z.number().positive().max(100),
  kosinus_phi: z.number().positive().max(1),
  kesit_mm2: z.number().positive(),
});

export type MotorAkimYoğunluguInput = z.infer<typeof motorAkimYoğunluguSchema>;

export interface MotorAkimYoğunluguOutput {
  akım_A: number;
  akım_yoğunluğu_Amm2: number;
}

function compute(input: MotorAkimYoğunluguInput): CalcResult<MotorAkimYoğunluguOutput> {
  const girisGucuKW = input.guc_kW / (input.verim_yuzde / 100);
  const akimA = (girisGucuKW * 1000) / (Math.sqrt(3) * input.voltaj_V * input.kosinus_phi);

  return {
    value: { akım_A: akimA, akım_yoğunluğu_Amm2: akimA / input.kesit_mm2 },
    intermediates: { giris_gucu_kW: girisGucuKW },
    standardsUsed: ["IEC 60034-1"],
  };
}

export const motorAkimYoğunlugu: CalcModule<MotorAkimYoğunluguInput, MotorAkimYoğunluguOutput> = {
  id: "motor-akim-yoğunlugu",
  title: "Motor Akım Yoğunluğu",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: motorAkimYoğunluguSchema,
  compute,
};
