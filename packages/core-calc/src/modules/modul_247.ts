import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_247Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul247Input = z.infer<typeof modul_247Schema>;

export interface Modul247Output {
  sonuc: number;
}

export const modul_247: CalcModule<Modul247Input, Modul247Output> = {
  id: "modul_247",
  title: "Çelik Uzama Yüzdesi Kontrolü",
  discipline: "insaat",
  standards: ['TS EN 10002'],
  inputSchema: modul_247Schema,

  compute(input: Modul247Input): CalcResult<Modul247Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['TS EN 10002'],
    };
  },
};
