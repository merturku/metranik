import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Görünür güç: S = P / cosφ. Trafo, görünür güce güvenlik marjı eklenerek seçilir.
export const trafoGucSecimiInputSchema = z.object({
  toplamAktifGuc_kW: z.number().positive(),
  gucFaktoru_cosfi: z.number().positive().max(1),
  guvenlikKatsayisi: z.number().positive(),
});

export type TrafoGucSecimiInput = z.infer<typeof trafoGucSecimiInputSchema>;

export interface TrafoGucSecimiOutput {
  gerekliTrafoGucu_kVA: number;
}

function compute(input: TrafoGucSecimiInput): CalcResult<TrafoGucSecimiOutput> {
  const gorunurGucKVA = input.toplamAktifGuc_kW / input.gucFaktoru_cosfi;
  const gerekliTrafoGucuKVA = gorunurGucKVA * input.guvenlikKatsayisi;

  return {
    value: { gerekliTrafoGucu_kVA: gerekliTrafoGucuKVA },
    intermediates: {
      gorunurGuc_kVA: gorunurGucKVA,
      guvenlikKatsayisi: input.guvenlikKatsayisi,
    },
    standardsUsed: [],
  };
}

export const trafoGucSecimi: CalcModule<TrafoGucSecimiInput, TrafoGucSecimiOutput> = {
  id: "trafo-guc-secimi",
  title: "Trafo Güç Seçimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: trafoGucSecimiInputSchema,
  compute,
};
