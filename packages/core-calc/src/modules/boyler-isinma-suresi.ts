import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji dengesi: Enerji(kJ) = m·cp·ΔT, süre(saat) = Enerji/(P·3600).
const SU_OZGUL_ISI_KJ_KGK = 4.186;

export const boylerIsinmaSuresiInputSchema = z.object({
  suKutlesi_m_kg: z.number().positive(),
  sicaklikFarki_dT_C: z.number().positive(),
  isiticiGucu_P_kW: z.number().positive(),
});

export type BoylerIsinmaSuresiInput = z.infer<typeof boylerIsinmaSuresiInputSchema>;

export interface BoylerIsinmaSuresiOutput {
  isinmaSuresi_saat: number;
}

function compute(input: BoylerIsinmaSuresiInput): CalcResult<BoylerIsinmaSuresiOutput> {
  const enerjiKJ = input.suKutlesi_m_kg * SU_OZGUL_ISI_KJ_KGK * input.sicaklikFarki_dT_C;
  const isinmaSuresiSaat = enerjiKJ / (input.isiticiGucu_P_kW * 3600);

  return {
    value: { isinmaSuresi_saat: isinmaSuresiSaat },
    intermediates: {
      gerekliEnerji_kJ: enerjiKJ,
    },
    standardsUsed: [],
  };
}

export const boylerIsinmaSuresi: CalcModule<
  BoylerIsinmaSuresiInput,
  BoylerIsinmaSuresiOutput
> = {
  id: "boyler-isinma-suresi",
  title: "Boyler Isınma Süresi",
  discipline: "mekanik",
  standards: [],
  inputSchema: boylerIsinmaSuresiInputSchema,
  compute,
};
