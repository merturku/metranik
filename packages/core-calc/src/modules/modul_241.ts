import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_241Schema = z.object({
  isi_yuku_W: z.number().positive(),
  kutlesel_debi_kgs: z.number().positive(),
  ozgul_isi_JkgK: z.number().positive().default(4186),
});

export type Modul_241Input = z.infer<typeof modul_241Schema>;

export interface Modul_241Output {
  sicaklik_farki_K: number;
}

export const modul_241: CalcModule<Modul_241Input, Modul_241Output> = {
  id: "modul_241",
  title: "Akışkan Sıcaklık Farkı (Q=mcΔT)",
  discipline: "mekanik",
  standards: ["EN 442"],
  inputSchema: modul_241Schema,

  compute(input: Modul_241Input): CalcResult<Modul_241Output> {
    const deltaT = input.isi_yuku_W / (input.kutlesel_debi_kgs * input.ozgul_isi_JkgK);

    return {
      value: {
        sicaklik_farki_K: Math.round(deltaT * 100) / 100,
      },
      intermediates: { ozgul_isi: input.ozgul_isi_JkgK },
      standardsUsed: ["EN 442"],
    };
  },
};
