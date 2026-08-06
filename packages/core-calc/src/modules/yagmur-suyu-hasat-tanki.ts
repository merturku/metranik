import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yağmur suyu hasat tankı boyutlandırma: 1mm yağış, 1m² çatı alanında 1 litre
// su demektir (birim dönüşümünden). Çatının tüm suyu tanka ulaşmaz; malzemeye
// bağlı akış (runoff) katsayısı kayıpları hesaba katar (kiremit ~0.8-0.9,
// düz/membran çatı ~0.7-0.8).
export const yagmurSuyuHasatTankiInputSchema = z.object({
  catiAlani_m2: z.number().positive(),
  yagisMiktari_mm: z.number().positive(),
  akisKatsayisi: z.number().positive().max(1),
});

export type YagmurSuyuHasatTankiInput = z.infer<
  typeof yagmurSuyuHasatTankiInputSchema
>;

export interface YagmurSuyuHasatTankiOutput {
  hasatHacmi_L: number;
}

function compute(
  input: YagmurSuyuHasatTankiInput,
): CalcResult<YagmurSuyuHasatTankiOutput> {
  const teorikHacimL = input.catiAlani_m2 * input.yagisMiktari_mm;
  const hasatHacmiL = teorikHacimL * input.akisKatsayisi;

  return {
    value: { hasatHacmi_L: hasatHacmiL },
    intermediates: {
      teorikHacim_L: teorikHacimL,
    },
    standardsUsed: [],
  };
}

export const yagmurSuyuHasatTanki: CalcModule<
  YagmurSuyuHasatTankiInput,
  YagmurSuyuHasatTankiOutput
> = {
  id: "yagmur-suyu-hasat-tanki",
  title: "Yağmur Suyu Hasat Tankı Boyutlandırma",
  discipline: "ev",
  standards: [],
  inputSchema: yagmurSuyuHasatTankiInputSchema,
  compute,
};
