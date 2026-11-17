import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Karşı ağırlıklı asansör: P = (1 − φ)·Q·g·v/(1000·η). Q anma yükü (kg), φ karşı ağırlık dengesi.
const G = 9.81;

export const asansorMotorGucuInputSchema = z.object({
  q_kg: z.number().positive(),
  v_ms: z.number().positive(),
  phi: z.number().min(0).max(1),
  eta: z.number().min(0.1).max(1),
});

export type AsansorMotorGucuInput = z.infer<typeof asansorMotorGucuInputSchema>;

export interface AsansorMotorGucuOutput {
  motorGucu_kW: number;
}

function compute(input: AsansorMotorGucuInput): CalcResult<AsansorMotorGucuOutput> {
  const dengesizlik = (1 - input.phi) * input.q_kg;
  const mekanik = (dengesizlik * G * input.v_ms) / 1000;
  return {
    value: { motorGucu_kW: mekanik / input.eta },
    intermediates: { dengesizlik_kg: dengesizlik, mekanik_guc_kW: mekanik },
    standardsUsed: ["Karşı ağırlık dengesi — EN 81-20 ilkesi"],
  };
}

export const asansorMotorGucu: CalcModule<AsansorMotorGucuInput, AsansorMotorGucuOutput> = {
  id: "asansor-motor-gucu",
  title: "Asansör Motor Gücü (Karşı Ağırlıklı)",
  discipline: "elektrik",
  standards: [],
  inputSchema: asansorMotorGucuInputSchema,
  compute,
};
