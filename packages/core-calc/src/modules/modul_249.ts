import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_249Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul249Input = z.infer<typeof modul_249Schema>;

export interface Modul249Output {
  sonuc: number;
}

export const modul_249: CalcModule<Modul249Input, Modul249Output> = {
  id: "modul_249",
  title: "Ev Pik Elektrik Talebi",
  discipline: "ev",
  standards: ['TS 13830'],
  inputSchema: modul_249Schema,

  compute(input: Modul249Input): CalcResult<Modul249Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['TS 13830'],
    };
  },
};
