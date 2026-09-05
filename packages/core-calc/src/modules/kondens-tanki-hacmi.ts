import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kondens (reservoir) tankı, gelen kondens debisini bir bekletme/tutma süresi
// boyunca depolayacak şekilde boyutlandırılır: V = Q×t. Bu, pompa çevrimlerini
// dengelemek ve ani debi dalgalanmalarını yutmak için endüstride yaygın
// kullanılan basit bir bekletme-süresi (retention time) yöntemidir. Kondens
// Debisi modülünün ürettiği debiyi girdi olarak alır.
export const kondensTankiHacmiInputSchema = z.object({
  kondensDebisi_kgh: z.number().positive(),
  tutmaSuresi_dk: z.number().positive(),
});

export type KondensTankiHacmiInput = z.infer<typeof kondensTankiHacmiInputSchema>;

export interface KondensTankiHacmiOutput {
  tankHacmi_L: number;
}

function compute(input: KondensTankiHacmiInput): CalcResult<KondensTankiHacmiOutput> {
  const debisiLDk = input.kondensDebisi_kgh / 60;
  const tankHacmiL = debisiLDk * input.tutmaSuresi_dk;

  return {
    value: { tankHacmi_L: tankHacmiL },
    intermediates: {
      debisi_Ldk: debisiLDk,
    },
    standardsUsed: [],
  };
}

export const kondensTankiHacmi: CalcModule<KondensTankiHacmiInput, KondensTankiHacmiOutput> = {
  id: "kondens-tanki-hacmi",
  title: "Kondens Tankı (Receiver) Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: kondensTankiHacmiInputSchema,
  compute,
};
