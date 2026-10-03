import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_237Schema = z.object({
  alan_m2: z.number().positive(),
  kW_m2_baslangic: z.number().positive().optional(),
  kW_m2_final: z.number().positive().optional(),
});

export type Modul_237Input = z.infer<typeof modul_237Schema>;

export interface Modul_237Output {
  tasarrufu_kW: number;
  tasarrufu_yuzde: number;
}

export const modul_237: CalcModule<Modul_237Input, Modul_237Output> = {
  id: "modul_237",
  title: "Aydınlatma Enerji Tasarrufu",
  discipline: "elektrik",
  standards: ["ASHRAE 90.1"],
  inputSchema: modul_237Schema,

  compute(input: Modul_237Input): CalcResult<Modul_237Output> {
    const P_baslangic = input.alan_m2 * input.kW_m2_baslangic;
    const P_final = input.alan_m2 * input.kW_m2_final;
    const tasarruf = P_baslangic - P_final;
    const tasarruf_yuzde = (tasarruf / P_baslangic) * 100;

    return {
      value: {
        tasarrufu_kW: Math.round(tasarruf * 10) / 10,
        tasarrufu_yuzde: Math.round(tasarruf_yuzde),
      },
      intermediates: {},
      standardsUsed: ["ASHRAE 90.1"],
    };
  },
};
