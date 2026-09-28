import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_242Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul242Input = z.infer<typeof modul_242Schema>;

export interface Modul242Output {
  sonuc: number;
}

export const modul_242: CalcModule<Modul242Input, Modul242Output> = {
  id: "modul_242",
  title: "Fan Basınç Artışı",
  discipline: "mekanik",
  standards: ['ASHRAE'],
  inputSchema: modul_242Schema,

  compute(input: Modul242Input): CalcResult<Modul242Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['ASHRAE'],
    };
  },
};
