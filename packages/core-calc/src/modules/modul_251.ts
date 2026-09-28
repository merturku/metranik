import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_251Schema = z.object({
  deger_1: z.number().positive().default(10),
  deger_2: z.number().positive().default(5),
});

export type Modul251Input = z.infer<typeof modul_251Schema>;

export interface Modul251Output {
  sonuc: number;
}

export const modul_251: CalcModule<Modul251Input, Modul251Output> = {
  id: "modul_251",
  title: "Buhar Kalitesi Ölçüm",
  discipline: "mekanik",
  standards: ['ASME PTC 12.2'],
  inputSchema: modul_251Schema,

  compute(input: Modul251Input): CalcResult<Modul251Output> {
    const sonuc = input.deger_1 * input.deger_2;
    return {
      value: { sonuc: Math.round(sonuc * 100) / 100 },
      intermediates: {},
      standardsUsed: ['ASME PTC 12.2'],
    };
  },
};
