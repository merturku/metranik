import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Devir süresi ilişkisi: gerekli sirkülasyon debisi Q = V / t.
export const havuzSuSirkulasyonDebisiInputSchema = z.object({
  havuzHacmi_V_m3: z.number().positive(),
  devirSuresi_t_saat: z.number().positive(),
});

export type HavuzSuSirkulasyonDebisiInput = z.infer<
  typeof havuzSuSirkulasyonDebisiInputSchema
>;

export interface HavuzSuSirkulasyonDebisiOutput {
  gerekliDebi_m3h: number;
}

function compute(
  input: HavuzSuSirkulasyonDebisiInput,
): CalcResult<HavuzSuSirkulasyonDebisiOutput> {
  const gerekliDebiM3h = input.havuzHacmi_V_m3 / input.devirSuresi_t_saat;

  return {
    value: { gerekliDebi_m3h: gerekliDebiM3h },
    intermediates: {
      devirSuresi_saat: input.devirSuresi_t_saat,
    },
    standardsUsed: [],
  };
}

export const havuzSuSirkulasyonDebisi: CalcModule<
  HavuzSuSirkulasyonDebisiInput,
  HavuzSuSirkulasyonDebisiOutput
> = {
  id: "havuz-su-sirkulasyon-debisi",
  title: "Havuz Su Sirkülasyon Debisi",
  discipline: "ev",
  standards: [],
  inputSchema: havuzSuSirkulasyonDebisiInputSchema,
  compute,
};
