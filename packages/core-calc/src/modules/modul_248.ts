import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_248Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul248Input = z.infer<typeof modul_248Schema>;

export interface Modul248Output {
  sonuc: number;
}

export const modul_248: CalcModule<Modul248Input, Modul248Output> = {
  id: "modul_248",
  title: "Zemin Yaşlanma Etkisi",
  discipline: "insaat",
  standards: ['NCHRP'],
  inputSchema: modul_248Schema,

  compute(input: Modul248Input): CalcResult<Modul248Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['NCHRP'],
    };
  },
};
