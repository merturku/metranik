import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: Q = ṁ·cp·ΔT, ṁ = ρ·V. Hava için ρ=1.2 kg/m³, cp=1.006 kJ/kgK.
const HAVA_YOGUNLUGU_KG_M3 = 1.2;
const HAVA_OZGUL_ISI_KJ_KGK = 1.006;

export const fcuHavaTarafiKapasitesiInputSchema = z.object({
  havaDebisi_V_m3h: z.number().positive(),
  sicaklikFarki_dT_C: z.number().positive(),
});

export type FcuHavaTarafiKapasitesiInput = z.infer<
  typeof fcuHavaTarafiKapasitesiInputSchema
>;

export interface FcuHavaTarafiKapasitesiOutput {
  kapasite_kW: number;
}

function compute(
  input: FcuHavaTarafiKapasitesiInput,
): CalcResult<FcuHavaTarafiKapasitesiOutput> {
  const debiM3s = input.havaDebisi_V_m3h / 3600;
  const kapasiteKW =
    debiM3s * HAVA_YOGUNLUGU_KG_M3 * HAVA_OZGUL_ISI_KJ_KGK * input.sicaklikFarki_dT_C;

  return {
    value: { kapasite_kW: kapasiteKW },
    intermediates: {
      debi_m3s: debiM3s,
    },
    standardsUsed: [],
  };
}

export const fcuHavaTarafiKapasitesi: CalcModule<
  FcuHavaTarafiKapasitesiInput,
  FcuHavaTarafiKapasitesiOutput
> = {
  id: "fcu-hava-tarafi-kapasitesi",
  title: "FCU Hava Tarafı Kapasitesi",
  discipline: "mekanik",
  standards: [],
  inputSchema: fcuHavaTarafiKapasitesiInputSchema,
  compute,
};
