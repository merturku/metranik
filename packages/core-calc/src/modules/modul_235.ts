import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_235Schema = z.object({
  hava_debisi_m3s: z.number().positive(),
  kanal_genisligi_m: z.number().positive(),
  kanal_yuksekligi_m: z.number().positive(),
});

export type Modul_235Input = z.infer<typeof modul_235Schema>;

export interface Modul_235Output {
  hava_hizi_ms: number;
  onerilen_hizi_ms: number;
}

export const modul_235: CalcModule<Modul_235Input, Modul_235Output> = {
  id: "modul_235",
  title: "Kanal Tasarım Hava Hızı Kontrolü",
  discipline: "mekanik",
  standards: ["ASHRAE 90.1"],
  inputSchema: modul_235Schema,

  compute(input: Modul_235Input): CalcResult<Modul_235Output> {
    const A = input.kanal_genisligi_m * input.kanal_yuksekligi_m;
    const v = input.hava_debisi_m3s / A;
    const v_onerilen = 5; // 5 m/s standard

    return {
      value: {
        hava_hizi_ms: Math.round(v * 100) / 100,
        onerilen_hizi_ms: v_onerilen,
      },
      intermediates: { kesit_alani_m2: Math.round(A * 1000) / 1000 },
      standardsUsed: ["ASHRAE 90.1"],
    };
  },
};
