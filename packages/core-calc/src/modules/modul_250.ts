import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_250Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul250Input = z.infer<typeof modul_250Schema>;

export interface Modul250Output {
  sonuc: number;
}

export const modul_250: CalcModule<Modul250Input, Modul250Output> = {
  id: "modul_250",
  title: "Rüzgarda Pompa Çalışması",
  discipline: "mekanik",
  standards: ['ISO 9906'],
  inputSchema: modul_250Schema,

  compute(input: Modul250Input): CalcResult<Modul250Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['ISO 9906'],
    };
  },
};
