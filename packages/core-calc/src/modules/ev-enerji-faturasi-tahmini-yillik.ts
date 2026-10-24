import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const evEnerjiTahminSchema = z.object({
  ortalama_tüketim_kwh_ay: z.number().positive(),
  birim_fiyat_tlkwh: z.number().positive(),
  peşin_indirim_yuzde: z.number().min(0).max(100),
});

export type EvEnerjiTahminInput = z.infer<typeof evEnerjiTahminSchema>;

export interface EvEnerjiTahminOutput {
  net_fatura_TL: number;
}

function compute(input: EvEnerjiTahminInput): CalcResult<EvEnerjiTahminOutput> {
  const yillikTuketimKWh = input.ortalama_tüketim_kwh_ay * 12;
  const brutFaturaTL = yillikTuketimKWh * input.birim_fiyat_tlkwh;
  const netFaturaTL = brutFaturaTL * (1 - input.peşin_indirim_yuzde / 100);

  return {
    value: { net_fatura_TL: netFaturaTL },
    intermediates: {
      yillik_tuketim_kWh: yillikTuketimKWh,
      brut_fatura_TL: brutFaturaTL,
      indirim_yuzde: input.peşin_indirim_yuzde,
    },
    standardsUsed: [],
  };
}

export const evEnerjiTahminYillik: CalcModule<EvEnerjiTahminInput, EvEnerjiTahminOutput> = {
  id: "ev-enerji-faturasi-tahmini-yillik",
  title: "Yıllık Enerji Faturası Tahmini",
  discipline: "ev",
  standards: [],
  inputSchema: evEnerjiTahminSchema,
  compute,
};
