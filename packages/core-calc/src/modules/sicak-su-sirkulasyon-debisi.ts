import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: sirkülasyon hattındaki ısı kaybını karşılamak için gerekli
// debi ṁ = Qkayıp/(cp·ΔT).
const SU_OZGUL_ISI_KJ_KGK = 4.186;

export const sicakSuSirkulasyonDebisiInputSchema = z.object({
  hatIsiKaybi_Qkayip_kW: z.number().positive(),
  izinVerilenSicaklikDususu_dT_C: z.number().positive(),
});

export type SicakSuSirkulasyonDebisiInput = z.infer<
  typeof sicakSuSirkulasyonDebisiInputSchema
>;

export interface SicakSuSirkulasyonDebisiOutput {
  sirkulasyonDebisi_Ls: number;
}

function compute(
  input: SicakSuSirkulasyonDebisiInput,
): CalcResult<SicakSuSirkulasyonDebisiOutput> {
  const debiLs =
    input.hatIsiKaybi_Qkayip_kW / (SU_OZGUL_ISI_KJ_KGK * input.izinVerilenSicaklikDususu_dT_C);

  return {
    value: { sirkulasyonDebisi_Ls: debiLs },
    intermediates: {
      suOzgulIsi_kJ_kgK: SU_OZGUL_ISI_KJ_KGK,
    },
    standardsUsed: [],
  };
}

export const sicakSuSirkulasyonDebisi: CalcModule<
  SicakSuSirkulasyonDebisiInput,
  SicakSuSirkulasyonDebisiOutput
> = {
  id: "sicak-su-sirkulasyon-debisi",
  title: "Sıcak Su Sirkülasyon Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: sicakSuSirkulasyonDebisiInputSchema,
  compute,
};
