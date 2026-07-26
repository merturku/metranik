import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: trafo kayıp ısısını taşımak için gerekli hava debisi
// Q = Pkayıp/(cp·ρ·ΔT).
const HAVA_OZGUL_ISI_KJ_KGK = 1.006;
const HAVA_YOGUNLUGU_KG_M3 = 1.2;

export const trafoOdasiHavalandirmaDebisiInputSchema = z.object({
  trafoKayipIsisi_Pkayip_kW: z.number().positive(),
  izinVerilenSicaklikArtisi_dT_C: z.number().positive(),
});

export type TrafoOdasiHavalandirmaDebisiInput = z.infer<
  typeof trafoOdasiHavalandirmaDebisiInputSchema
>;

export interface TrafoOdasiHavalandirmaDebisiOutput {
  havaDebisi_m3h: number;
}

function compute(
  input: TrafoOdasiHavalandirmaDebisiInput,
): CalcResult<TrafoOdasiHavalandirmaDebisiOutput> {
  const debiM3s =
    input.trafoKayipIsisi_Pkayip_kW /
    (HAVA_OZGUL_ISI_KJ_KGK * HAVA_YOGUNLUGU_KG_M3 * input.izinVerilenSicaklikArtisi_dT_C);

  return {
    value: { havaDebisi_m3h: debiM3s * 3600 },
    intermediates: {
      havaOzgulIsi_kJ_kgK: HAVA_OZGUL_ISI_KJ_KGK,
      havaYogunlugu_kg_m3: HAVA_YOGUNLUGU_KG_M3,
    },
    standardsUsed: [],
  };
}

export const trafoOdasiHavalandirmaDebisi: CalcModule<
  TrafoOdasiHavalandirmaDebisiInput,
  TrafoOdasiHavalandirmaDebisiOutput
> = {
  id: "trafo-odasi-havalandirma-debisi",
  title: "Trafo Odası Havalandırma Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: trafoOdasiHavalandirmaDebisiInputSchema,
  compute,
};
