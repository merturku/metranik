import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const modul_278Schema = z.object({ v: z.number().positive().default(1) });
export type Modul_278Input = z.infer<typeof modul_278Schema>;
export interface Modul_278Output { r: number; }
export const modul_278: CalcModule<Modul_278Input, Modul_278Output> = {
  id: "modul_278", title: "Modül 278", discipline: "mekanik", standards: ["—"],
  inputSchema: modul_278Schema,
  compute(i: Modul_278Input): CalcResult<Modul_278Output> {
    return { value: { r: i.v * 2 }, intermediates: {}, standardsUsed: ["—"] };
  },
};
