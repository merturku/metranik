import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const modul_265Schema = z.object({ v: z.number().positive().default(1) });
export type Modul_265Input = z.infer<typeof modul_265Schema>;
export interface Modul_265Output { r: number; }
export const modul_265: CalcModule<Modul_265Input, Modul_265Output> = {
  id: "modul_265", title: "Modül 265", discipline: "mekanik", standards: ["—"],
  inputSchema: modul_265Schema,
  compute(i: Modul_265Input): CalcResult<Modul_265Output> {
    return { value: { r: i.v * 2 }, intermediates: {}, standardsUsed: ["—"] };
  },
};
