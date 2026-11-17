import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nozul reaksiyonu (momentum): F = ρ·Q·v, v = Q/A.
const RHO = 1000; // kg/m³
const G = 9.80665;

export const nozulReaksiyonKuvvetiInputSchema = z.object({
  q_Lmin: z.number().positive(),
  d_mm: z.number().positive(),
});

export type NozulReaksiyonKuvvetiInput = z.infer<typeof nozulReaksiyonKuvvetiInputSchema>;

export interface NozulReaksiyonKuvvetiOutput {
  reaksiyon_N: number;
}

function compute(input: NozulReaksiyonKuvvetiInput): CalcResult<NozulReaksiyonKuvvetiOutput> {
  const Q = input.q_Lmin / 1000 / 60; // m³/s
  const A = (Math.PI * Math.pow(input.d_mm / 1000, 2)) / 4;
  const v = Q / A;
  const F = RHO * Q * v;
  return {
    value: { reaksiyon_N: F },
    intermediates: { jet_hizi_ms: v, reaksiyon_kgf: F / G, jet_dinamik_basinc_bar: (0.5 * RHO * v * v) / 1e5 },
    standardsUsed: ["Momentum denklemi"],
  };
}

export const nozulReaksiyonKuvveti: CalcModule<NozulReaksiyonKuvvetiInput, NozulReaksiyonKuvvetiOutput> = {
  id: "nozul-reaksiyon-kuvveti",
  title: "Yangın Hortumu Nozul Reaksiyon Kuvveti",
  discipline: "mekanik",
  standards: [],
  inputSchema: nozulReaksiyonKuvvetiInputSchema,
  compute,
};
