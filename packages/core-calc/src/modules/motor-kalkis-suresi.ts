import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Motor kalkış süresi: t = J_top·ω/T_ort,  ω = 2π·n/60.  T_ort = ortalama motor momenti − ortalama yük momenti
// (ivmelendirici moment; motor–yük eğrilerinden). J_top = motor + yük (motor miline indirgenmiş) atalet momenti.
export const motorKalkisSuresiInputSchema = z.object({
  toplamAtalet_kgm2: z.number().positive(),
  devir_rpm: z.number().positive(),
  ortalamaIvmeMomenti_Nm: z.number().positive(),
});

export type MotorKalkisSuresiInput = z.infer<typeof motorKalkisSuresiInputSchema>;

export interface MotorKalkisSuresiOutput {
  kalkisSuresi_s: number;
}

function compute(input: MotorKalkisSuresiInput): CalcResult<MotorKalkisSuresiOutput> {
  const omega = (2 * Math.PI * input.devir_rpm) / 60;
  const t = (input.toplamAtalet_kgm2 * omega) / input.ortalamaIvmeMomenti_Nm;
  return {
    value: { kalkisSuresi_s: t },
    intermediates: {
      acisal_hiz_rad_s: omega,
      kinetik_enerji_kJ: (0.5 * input.toplamAtalet_kgm2 * omega * omega) / 1000,
      ortalama_ivme_rad_s2: omega / t,
    },
    standardsUsed: ["Dönel hareket denklemi J·dω/dt = T_ivme"],
  };
}

export const motorKalkisSuresi: CalcModule<MotorKalkisSuresiInput, MotorKalkisSuresiOutput> = {
  id: "motor-kalkis-suresi",
  title: "Motor Kalkış (Hızlanma) Süresi",
  discipline: "elektrik",
  standards: [],
  inputSchema: motorKalkisSuresiInputSchema,
  compute,
};
