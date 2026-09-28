import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_246Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul246Input = z.infer<typeof modul_246Schema>;

export interface Modul246Output {
  sonuc: number;
}

export const modul_246: CalcModule<Modul246Input, Modul246Output> = {
  id: "modul_246",
  title: "Beton Örnek Sıkıştırma",
  discipline: "insaat",
  standards: ['TS EN 12390-3'],
  inputSchema: modul_246Schema,

  compute(input: Modul246Input): CalcResult<Modul246Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['TS EN 12390-3'],
    };
  },
};
