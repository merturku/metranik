import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hidronik sistem su hacmi: V = π/4·di²·L (boru) + ekipman iç hacimleri (radyatör, kazan, eşanjör, denge kabı...).
// Genleşme tankı, dolum süresi ve kimyasal dozajı (inhibitör) hesaplarının girdisidir.
export const boruSistemSuHacmiInputSchema = z.object({
  icCap_mm: z.number().positive(),
  boruUzunlugu_m: z.number().positive(),
  ekipmanHacmi_L: z.number().min(0),
});

export type BoruSistemSuHacmiInput = z.infer<typeof boruSistemSuHacmiInputSchema>;

export interface BoruSistemSuHacmiOutput {
  toplamHacim_L: number;
}

function compute(input: BoruSistemSuHacmiInput): CalcResult<BoruSistemSuHacmiOutput> {
  const di = input.icCap_mm / 1000;
  const boruL = (Math.PI / 4) * di * di * input.boruUzunlugu_m * 1000;
  const toplam = boruL + input.ekipmanHacmi_L;
  return {
    value: { toplamHacim_L: toplam },
    intermediates: {
      boru_hacmi_L: boruL,
      birim_uzunluk_hacmi_Lm: boruL / input.boruUzunlugu_m,
      toplam_hacim_m3: toplam / 1000,
      su_agirligi_kg: toplam,
    },
    standardsUsed: ["Geometrik hacim"],
  };
}

export const boruSistemSuHacmi: CalcModule<BoruSistemSuHacmiInput, BoruSistemSuHacmiOutput> = {
  id: "boru-sistem-su-hacmi",
  title: "Hidronik Sistem Su Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruSistemSuHacmiInputSchema,
  compute,
};
