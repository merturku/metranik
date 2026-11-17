import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dirsek itmesi: F = 2·(p·A + ρ·A·v²)·sin(θ/2); dayanak alanı A_d = F/σ.
const RHO = 1000;

export const boruDirsegiBasincItmeKuvvetiInputSchema = z.object({
  basinc_bar: z.number().positive(),
  icCap_mm: z.number().positive(),
  aci_deg: z.number().positive().max(180),
  hiz_ms: z.number().min(0),
  zeminGerilmesi_kPa: z.number().positive(),
});

export type BoruDirsegiBasincItmeKuvvetiInput = z.infer<typeof boruDirsegiBasincItmeKuvvetiInputSchema>;

export interface BoruDirsegiBasincItmeKuvvetiOutput {
  itmeKuvveti_N: number;
}

function compute(input: BoruDirsegiBasincItmeKuvvetiInput): CalcResult<BoruDirsegiBasincItmeKuvvetiOutput> {
  const A = (Math.PI * Math.pow(input.icCap_mm / 1000, 2)) / 4;
  const sin = Math.sin((input.aci_deg * Math.PI) / 360);
  const Fp = 2 * input.basinc_bar * 1e5 * A * sin;
  const Fm = 2 * RHO * A * input.hiz_ms * input.hiz_ms * sin;
  const F = Fp + Fm;
  return {
    value: { itmeKuvveti_N: F },
    intermediates: {
      basinc_kuvveti_N: Fp,
      momentum_kuvveti_N: Fm,
      dayanak_alani_m2: F / (input.zeminGerilmesi_kPa * 1000),
      itme_kN: F / 1000,
    },
    standardsUsed: ["AWWA M11 / EN 805"],
  };
}

export const boruDirsegiBasincItmeKuvveti: CalcModule<BoruDirsegiBasincItmeKuvvetiInput, BoruDirsegiBasincItmeKuvvetiOutput> = {
  id: "boru-dirsegi-basinc-itme-kuvveti",
  title: "Boru Dirseği Basınç İtme Kuvveti ve Dayanak Alanı",
  discipline: "mekanik",
  standards: ["AWWA M11"],
  inputSchema: boruDirsegiBasincItmeKuvvetiInputSchema,
  compute,
};
