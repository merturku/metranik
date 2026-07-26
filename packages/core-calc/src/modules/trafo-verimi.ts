import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güç trafosu verimi: η = Pçıkış / (Pçıkış + Pfe + Pcu).
// Pçıkış: yükte teslim edilen aktif güç (kW), Pfe: demir (boşta) kaybı (kW),
// Pcu: bakır (yük) kaybı (kW) — trafo etiketindeki boşta/kısa devre deney
// değerleridir.
export const trafoVerimiInputSchema = z.object({
  cikisGucu_Pout_kW: z.number().positive(),
  demirKaybi_Pfe_kW: z.number().nonnegative(),
  bakirKaybi_Pcu_kW: z.number().nonnegative(),
});

export type TrafoVerimiInput = z.infer<typeof trafoVerimiInputSchema>;

export interface TrafoVerimiOutput {
  verim_yuzde: number;
}

function compute(input: TrafoVerimiInput): CalcResult<TrafoVerimiOutput> {
  const toplamKayip_kW = input.demirKaybi_Pfe_kW + input.bakirKaybi_Pcu_kW;
  const verim_yuzde =
    (input.cikisGucu_Pout_kW / (input.cikisGucu_Pout_kW + toplamKayip_kW)) * 100;

  return {
    value: { verim_yuzde },
    intermediates: {
      toplamKayip_kW: Number(toplamKayip_kW.toFixed(3)),
    },
    standardsUsed: [],
  };
}

export const trafoVerimi: CalcModule<TrafoVerimiInput, TrafoVerimiOutput> = {
  id: "trafo-verimi",
  title: "Trafo Verimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: trafoVerimiInputSchema,
  compute,
};
