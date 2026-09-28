import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_236Schema = z.object({
  guc_kW: z.number().positive(),
  voltaj_V: z.number().positive().default(400),
  kosinus_phi: z.number().positive().default(0.9),
});

export type Modul_236Input = z.infer<typeof modul_236Schema>;

export interface Modul_236Output {
  akim_A: number;
}

export const modul_236: CalcModule<Modul_236Input, Modul_236Output> = {
  id: "modul_236",
  title: "Motor Nominal Akımı",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: modul_236Schema,

  compute(input: Modul_236Input): CalcResult<Modul_236Output> {
    const I = (input.guc_kW * 1000) / (Math.sqrt(3) * input.voltaj_V * input.kosinus_phi);

    return {
      value: { akim_A: Math.round(I * 10) / 10 },
      intermediates: { kosinus_phi: input.kosinus_phi },
      standardsUsed: ["IEC 60034-1"],
    };
  },
};
