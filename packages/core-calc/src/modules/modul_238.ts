import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_238Schema = z.object({
  alan_m2: z.number().positive(),
  u_degeri_W_m2K: z.number().positive(),
  sicaklik_farki_K: z.number().positive(),
});

export type Modul_238Input = z.infer<typeof modul_238Schema>;

export interface Modul_238Output {
  isi_kaybi_W: number;
  isi_kaybi_kW: number;
}

export const modul_238: CalcModule<Modul_238Input, Modul_238Output> = {
  id: "modul_238",
  title: "Pencere İsı Kaybı (U-Değeri)",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: modul_238Schema,

  compute(input: Modul_238Input): CalcResult<Modul_238Output> {
    const Q = input.alan_m2 * input.u_degeri_W_m2K * input.sicaklik_farki_K;

    return {
      value: {
        isi_kaybi_W: Math.round(Q),
        isi_kaybi_kW: Math.round(Q / 1000 * 100) / 100,
      },
      intermediaries: {},
      standardsUsed: ["TS 825"],
    };
  },
};
