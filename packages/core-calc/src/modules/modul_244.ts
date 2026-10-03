import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_244Schema = z.object({
  akim_A: z.number().positive(),
  direnc_Ω: z.number().positive(),
  temp_artisi_K: z.number().optional(),
});

export type Modul_244Input = z.infer<typeof modul_244Schema>;

export interface Modul_244Output {
  guc_kaybi_W: number;
  sonda_sicakligi_C: number;
}

export const modul_244: CalcModule<Modul_244Input, Modul_244Output> = {
  id: "modul_244",
  title: "Kablo I²R Kaybı ve Sıcaklığı",
  discipline: "elektrik",
  standards: ["IEC 60364"],
  inputSchema: modul_244Schema,

  compute(input: Modul_244Input): CalcResult<Modul_244Output> {
    const P_kaybi = input.akim_A * input.akim_A * input.direnc_Ω;
    const T_sonda = 20 + input.temp_artisi_K;

    return {
      value: {
        guc_kaybi_W: Math.round(P_kaybi * 10) / 10,
        sonda_sicakligi_C: T_sonda,
      },
      intermediates: { I2R: Math.round(P_kaybi * 100) / 100 },
      standardsUsed: ["IEC 60364"],
    };
  },
};
