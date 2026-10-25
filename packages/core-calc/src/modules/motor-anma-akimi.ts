import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı asenkron motor anma akımı. IEC 60034-1'e göre etiket gücü mildeki
// mekanik güçtür; şebekeden çekilen elektriksel güç Pgiriş = Pmil/η ve
// I = Pgiriş / (√3 × U × cosφ). Sonuç Motor Yol Verme Akımı modülünün girdisidir.
export const motorAnmaAkimiInputSchema = z.object({
  milGucu_kW: z.number().positive(),
  gerilim_V: z.number().positive(),
  verim_yuzde: z.number().positive().max(100),
  gucFaktoru_cosfi: z.number().positive().max(1),
});

export type MotorAnmaAkimiInput = z.infer<typeof motorAnmaAkimiInputSchema>;

export interface MotorAnmaAkimiOutput {
  anmaAkimi_A: number;
}

function compute(input: MotorAnmaAkimiInput): CalcResult<MotorAnmaAkimiOutput> {
  const girisGucuKW = input.milGucu_kW / (input.verim_yuzde / 100);
  const gorunurGucKVA = girisGucuKW / input.gucFaktoru_cosfi;
  const anmaAkimiA = (gorunurGucKVA * 1000) / (Math.sqrt(3) * input.gerilim_V);

  return {
    value: { anmaAkimi_A: anmaAkimiA },
    intermediates: {
      giris_gucu_kW: girisGucuKW,
      gorunur_guc_kVA: gorunurGucKVA,
    },
    standardsUsed: ["IEC 60034-1"],
  };
}

export const motorAnmaAkimi: CalcModule<MotorAnmaAkimiInput, MotorAnmaAkimiOutput> = {
  id: "motor-anma-akimi",
  title: "Motor Anma Akımı",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: motorAnmaAkimiInputSchema,
  compute,
};
