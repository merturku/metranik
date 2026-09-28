import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_250Schema = z.object({
  guc_kW: z.number().positive().default(10),
});

export type Modul_250Input = z.infer<typeof modul_250Schema>;

export interface Modul_250Output {
  sonuc: number;
}

export const modul_250: CalcModule<Modul_250Input, Modul_250Output> = {
  id: "modul_250",
  title: "Modül 250",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: modul_250Schema,

  compute(input: Modul_250Input): CalcResult<Modul_250Output> {
    return {
      value: { sonuc: input.guc_kW * 1.5 },
      intermediates: {},
      standardsUsed: ["—"],
    };
  },
};
