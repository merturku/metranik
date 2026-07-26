import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sarmal/meander döşeme deseninde yaklaşık toplam boru uzunluğu: L = Alan / Aralık.
export const yerdenIsitmaBoruUzunluguInputSchema = z.object({
  isitilanAlan_m2: z.number().positive(),
  boruAraligi_m: z.number().positive(),
});

export type YerdenIsitmaBoruUzunluguInput = z.infer<
  typeof yerdenIsitmaBoruUzunluguInputSchema
>;

export interface YerdenIsitmaBoruUzunluguOutput {
  toplamBoruUzunlugu_m: number;
}

function compute(
  input: YerdenIsitmaBoruUzunluguInput,
): CalcResult<YerdenIsitmaBoruUzunluguOutput> {
  const toplamBoruUzunluguM = input.isitilanAlan_m2 / input.boruAraligi_m;

  return {
    value: { toplamBoruUzunlugu_m: toplamBoruUzunluguM },
    intermediates: {
      boruAraligi_m: input.boruAraligi_m,
    },
    standardsUsed: [],
  };
}

export const yerdenIsitmaBoruUzunlugu: CalcModule<
  YerdenIsitmaBoruUzunluguInput,
  YerdenIsitmaBoruUzunluguOutput
> = {
  id: "yerden-isitma-boru-uzunlugu",
  title: "Yerden Isıtma Boru Uzunluğu",
  discipline: "mekanik",
  standards: [],
  inputSchema: yerdenIsitmaBoruUzunluguInputSchema,
  compute,
};
