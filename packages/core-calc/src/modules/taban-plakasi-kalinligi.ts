import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// AISC DG1 (LRFD, φ = 0,90): m = (N − 0,95d)/2; n = (B − 0,8bf)/2; n' = √(d·bf)/4; l = max(m, n, λn'), λ = 1 (tutucu);
// t = l·√(2·Pu/(0,9·Fy·B·N)).
export const tabanPlakasiKalinligiInputSchema = z.object({
  pu_kN: z.number().positive(),
  d_mm: z.number().positive(),
  bf_mm: z.number().positive(),
  N_mm: z.number().positive(),
  B_mm: z.number().positive(),
  fy_MPa: z.number().positive(),
});

export type TabanPlakasiKalinligiInput = z.infer<typeof tabanPlakasiKalinligiInputSchema>;

export interface TabanPlakasiKalinligiOutput {
  kalinlik_mm: number;
}

function compute(input: TabanPlakasiKalinligiInput): CalcResult<TabanPlakasiKalinligiOutput> {
  const m = (input.N_mm - 0.95 * input.d_mm) / 2;
  const n = (input.B_mm - 0.8 * input.bf_mm) / 2;
  const nPrime = Math.sqrt(input.d_mm * input.bf_mm) / 4;
  const l = Math.max(m, n, nPrime);
  const t = l * Math.sqrt((2 * input.pu_kN * 1000) / (0.9 * input.fy_MPa * input.B_mm * input.N_mm));
  return {
    value: { kalinlik_mm: t },
    intermediates: { m_mm: m, n_mm: n, n_prime_mm: nPrime, kritik_konsol_mm: l, kalinlik_yukari_mm: Math.ceil(t - 1e-9) },
    standardsUsed: ["AISC Design Guide 1 (LRFD)"],
  };
}

export const tabanPlakasiKalinligi: CalcModule<TabanPlakasiKalinligiInput, TabanPlakasiKalinligiOutput> = {
  id: "taban-plakasi-kalinligi",
  title: "Kolon Taban Plakası Kalınlığı (AISC Design Guide 1)",
  discipline: "insaat",
  standards: ["AISC Design Guide 1"],
  inputSchema: tabanPlakasiKalinligiInputSchema,
  compute,
};
