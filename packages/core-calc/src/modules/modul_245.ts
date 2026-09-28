import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_245Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul245Input = z.infer<typeof modul_245Schema>;

export interface Modul245Output {
  sonuc: number;
}

export const modul_245: CalcModule<Modul245Input, Modul245Output> = {
  id: "modul_245",
  title: "İzolatör Erozyon Hızı",
  discipline: "elektrik",
  standards: ['IEC 60815'],
  inputSchema: modul_245Schema,

  compute(input: Modul245Input): CalcResult<Modul245Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['IEC 60815'],
    };
  },
};
