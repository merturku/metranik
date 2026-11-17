import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Francis savak formülü: Q = (2/3)·Cd·√(2g)·(b − 0,1·n·H)·H^1,5.
const G = 9.80665;

export const dikdortgenSavakDebisiInputSchema = z
  .object({
    b_m: z.number().positive(),
    h_m: z.number().positive(),
    cd: z.number().positive().max(1),
    n: z.enum(["0", "1", "2"]),
  })
  .refine((v) => v.b_m - 0.1 * Number(v.n) * v.h_m > 0, { message: "Etkin genişlik pozitif olmalı" });

export type DikdortgenSavakDebisiInput = z.infer<typeof dikdortgenSavakDebisiInputSchema>;

export interface DikdortgenSavakDebisiOutput {
  debi_m3s: number;
}

function compute(input: DikdortgenSavakDebisiInput): CalcResult<DikdortgenSavakDebisiOutput> {
  const bEtkin = input.b_m - 0.1 * Number(input.n) * input.h_m;
  const Q = (2 / 3) * input.cd * Math.sqrt(2 * G) * bEtkin * Math.pow(input.h_m, 1.5);
  return {
    value: { debi_m3s: Q },
    intermediates: { etkin_genislik_m: bEtkin, debi_Ls: Q * 1000, h_b_orani: input.h_m / input.b_m },
    standardsUsed: ["Francis savak formülü"],
  };
}

export const dikdortgenSavakDebisi: CalcModule<DikdortgenSavakDebisiInput, DikdortgenSavakDebisiOutput> = {
  id: "dikdortgen-savak-debisi",
  title: "Dikdörtgen Keskin Kenarlı Savak Debisi (Francis)",
  discipline: "insaat",
  standards: [],
  inputSchema: dikdortgenSavakDebisiInputSchema,
  compute,
};
