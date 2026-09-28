import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_243Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul243Input = z.infer<typeof modul_243Schema>;

export interface Modul243Output {
  sonuc: number;
}

export const modul_243: CalcModule<Modul243Input, Modul243Output> = {
  id: "modul_243",
  title: "Transformatör I²R Kaybı",
  discipline: "elektrik",
  standards: ['IEC 60076'],
  inputSchema: modul_243Schema,

  compute(input: Modul243Input): CalcResult<Modul243Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['IEC 60076'],
    };
  },
};
