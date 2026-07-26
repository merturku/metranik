import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Paralel bara/iletkenler arasında kısa devre akımı sırasında oluşan
// elektrodinamik kuvvet (IEC 60865-1): F = (μ0 × I² × L) / (2π × d).
// μ0: boşluğun manyetik geçirgenliği (4π×10⁻⁷ H/m), I: tepe kısa devre akımı (A),
// L: destekler arası bara açıklığı (m), d: iletkenler arası eksen mesafesi (m).
const MU0_HM = 4 * Math.PI * 1e-7;

export const baraElektrodinamikKuvvetInputSchema = z.object({
  tepeKisaDevreAkimi_Ip_A: z.number().positive(),
  destekAcikligi_L_m: z.number().positive(),
  iletkenlerArasiMesafe_d_m: z.number().positive(),
});

export type BaraElektrodinamikKuvvetInput = z.infer<
  typeof baraElektrodinamikKuvvetInputSchema
>;

export interface BaraElektrodinamikKuvvetOutput {
  kuvvet_F_N: number;
}

function compute(
  input: BaraElektrodinamikKuvvetInput,
): CalcResult<BaraElektrodinamikKuvvetOutput> {
  const kuvvet_F_N =
    (MU0_HM * input.tepeKisaDevreAkimi_Ip_A ** 2 * input.destekAcikligi_L_m) /
    (2 * Math.PI * input.iletkenlerArasiMesafe_d_m);

  return {
    value: { kuvvet_F_N },
    intermediates: {
      destekAcikligi_L_m: input.destekAcikligi_L_m,
      iletkenlerArasiMesafe_d_m: input.iletkenlerArasiMesafe_d_m,
    },
    standardsUsed: ["IEC 60865-1"],
  };
}

export const baraElektrodinamikKuvvet: CalcModule<
  BaraElektrodinamikKuvvetInput,
  BaraElektrodinamikKuvvetOutput
> = {
  id: "bara-elektrodinamik-kuvvet",
  title: "Bara Elektrodinamik Kuvvet",
  discipline: "elektrik",
  standards: ["IEC 60865-1"],
  inputSchema: baraElektrodinamikKuvvetInputSchema,
  compute,
};
