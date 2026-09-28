import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_241Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul241Input = z.infer<typeof modul_241Schema>;

export interface Modul241Output {
  sonuc: number;
}

export const modul_241: CalcModule<Modul241Input, Modul241Output> = {
  id: "modul_241",
  title: "Radyatör Çıkış Sıcaklığı",
  discipline: "mekanik",
  standards: ['EN 442'],
  inputSchema: modul_241Schema,

  compute(input: Modul241Input): CalcResult<Modul241Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['EN 442'],
    };
  },
};
