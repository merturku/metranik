import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const modul_302Schema = z.object({
  guc_kW: z.number().positive().default(10),
});

export type Modul_302Input = z.infer<typeof modul_302Schema>;

export interface Modul_302Output {
  sonuc: number;
}

export const modul_302: CalcModule<Modul_302Input, Modul_302Output> = {
  id: "modul_302",
  title: "Modül 302",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: modul_302Schema,

  compute(input: Modul_302Input): CalcResult<Modul_302Output> {
    return {
      value: { sonuc: input.guc_kW * 1.5 },
      intermediates: {},
      standardsUsed: ["—"],
    };
  },
};
