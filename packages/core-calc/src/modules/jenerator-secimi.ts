import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Görünür güç S = P/cosφ, motor kalkış akımı için başlama katsayısı uygulanır,
// son olarak güvenlik marjı eklenir.
export const jeneratorSecimiInputSchema = z.object({
  kritikYuk_kW: z.number().positive(),
  gucFaktoru_cosfi: z.number().positive().max(1),
  baslamaKatsayisi: z.number().positive(),
  guvenlikKatsayisi: z.number().positive(),
});

export type JeneratorSecimiInput = z.infer<typeof jeneratorSecimiInputSchema>;

export interface JeneratorSecimiOutput {
  gerekliJeneratorGucu_kVA: number;
}

function compute(input: JeneratorSecimiInput): CalcResult<JeneratorSecimiOutput> {
  const gorunurGucKVA = input.kritikYuk_kW / input.gucFaktoru_cosfi;
  const baslangicGucuKVA = gorunurGucKVA * input.baslamaKatsayisi;
  const gerekliJeneratorGucuKVA = baslangicGucuKVA * input.guvenlikKatsayisi;

  return {
    value: { gerekliJeneratorGucu_kVA: gerekliJeneratorGucuKVA },
    intermediates: {
      gorunurGuc_kVA: gorunurGucKVA,
      baslangicGucu_kVA: baslangicGucuKVA,
    },
    standardsUsed: [],
  };
}

export const jeneratorSecimi: CalcModule<JeneratorSecimiInput, JeneratorSecimiOutput> = {
  id: "jenerator-secimi",
  title: "Jeneratör Seçimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: jeneratorSecimiInputSchema,
  compute,
};
