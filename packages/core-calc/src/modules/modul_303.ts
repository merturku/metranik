import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_303Schema = z.object({
  guc_kW: z.number().positive().default(10),
});

export type Modul_303Input = z.infer<typeof modul_303Schema>;

export interface Modul_303Output {
  sonuc: number;
}

export const modul_303: CalcModule<Modul_303Input, Modul_303Output> = {
  id: "modul_303",
  title: "Modül 303",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: modul_303Schema,

  compute(input: Modul_303Input): CalcResult<Modul_303Output> {
    return {
      value: { sonuc: input.guc_kW * 1.5 },
      intermediates: {},
      standardsUsed: ["—"],
    };
  },
};
