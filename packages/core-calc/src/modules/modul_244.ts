import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_244Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul244Input = z.infer<typeof modul_244Schema>;

export interface Modul244Output {
  sonuc: number;
}

export const modul_244: CalcModule<Modul244Input, Modul244Output> = {
  id: "modul_244",
  title: "Kablo Direnci (Sıcaklık)",
  discipline: "elektrik",
  standards: ['IEC 60364'],
  inputSchema: modul_244Schema,

  compute(input: Modul244Input): CalcResult<Modul244Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['IEC 60364'],
    };
  },
};
