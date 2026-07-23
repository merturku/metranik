import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güç faktörü düzeltme: Qc = P · (tanφ1 − tanφ2). Saf trigonometri — hiçbir
// standart tablosuna ihtiyaç duymaz.
export const kompanzasyonInputSchema = z.object({
  aktifGuc_kW: z.number().positive(),
  mevcutCosPhi: z.number().positive().max(1),
  hedefCosPhi: z.number().positive().max(1),
});

export type KompanzasyonInput = z.infer<typeof kompanzasyonInputSchema>;

export interface KompanzasyonOutput {
  kapasitorGucu_kVAr: number;
}

function compute(input: KompanzasyonInput): CalcResult<KompanzasyonOutput> {
  const tanPhi1 = Math.tan(Math.acos(input.mevcutCosPhi));
  const tanPhi2 = Math.tan(Math.acos(input.hedefCosPhi));
  const kapasitorGucuKVAr = input.aktifGuc_kW * (tanPhi1 - tanPhi2);

  return {
    value: { kapasitorGucu_kVAr: kapasitorGucuKVAr },
    intermediates: {
      tanPhi1,
      tanPhi2,
    },
    standardsUsed: [],
  };
}

export const kompanzasyon: CalcModule<KompanzasyonInput, KompanzasyonOutput> = {
  id: "kompanzasyon",
  title: "Kompanzasyon",
  discipline: "elektrik",
  standards: [],
  inputSchema: kompanzasyonInputSchema,
  compute,
};
