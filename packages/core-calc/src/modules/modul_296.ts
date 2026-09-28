import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const modul_296Schema = z.object({ v: z.number().positive().default(1) });
export type Modul_296Input = z.infer<typeof modul_296Schema>;
export interface Modul_296Output { r: number; }
export const modul_296: CalcModule<Modul_296Input, Modul_296Output> = {
  id: "modul_296", title: "Modül 296", discipline: "mekanik", standards: ["—"],
  inputSchema: modul_296Schema,
  compute(i: Modul_296Input): CalcResult<Modul_296Output> {
    return { value: { r: i.v * 2 }, intermediates: {}, standardsUsed: ["—"] };
  },
};
