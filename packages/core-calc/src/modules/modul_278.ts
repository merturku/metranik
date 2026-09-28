import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_278Schema = z.object({
  guc_kW: z.number().positive().default(10),
});

export type Modul_278Input = z.infer<typeof modul_278Schema>;

export interface Modul_278Output {
  sonuc: number;
}

export const modul_278: CalcModule<Modul_278Input, Modul_278Output> = {
  id: "modul_278",
  title: "Modül 278",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: modul_278Schema,

  compute(input: Modul_278Input): CalcResult<Modul_278Output> {
    return {
      value: { sonuc: input.guc_kW * 1.5 },
      intermediates: {},
      standardsUsed: ["—"],
    };
  },
};
