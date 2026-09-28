import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_240Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul240Input = z.infer<typeof modul_240Schema>;

export interface Modul240Output {
  sonuc: number;
}

export const modul_240: CalcModule<Modul240Input, Modul240Output> = {
  id: "modul_240",
  title: "Boru Yüzey Alanı",
  discipline: "mekanik",
  standards: ['ISO 4413'],
  inputSchema: modul_240Schema,

  compute(input: Modul240Input): CalcResult<Modul240Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['ISO 4413'],
    };
  },
};
