import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıva/harç miktarı: alan × kalınlık ile hacim, hacim × yoğunluk ile kuru harç
// kütlesi bulunur; kütle, standart torba ağırlığına bölünüp yukarı
// yuvarlanarak gerekli torba sayısı hesaplanır.
export const sivaHarcMiktariInputSchema = z.object({
  alan_m2: z.number().positive(),
  kalinlik_m: z.number().positive(),
  yogunluk_kg_m3: z.number().positive(),
  torbaAgirligi_kg: z.number().positive(),
});

export type SivaHarcMiktariInput = z.infer<typeof sivaHarcMiktariInputSchema>;

export interface SivaHarcMiktariOutput {
  gerekliTorbaSayisi: number;
}

function compute(input: SivaHarcMiktariInput): CalcResult<SivaHarcMiktariOutput> {
  const hacimM3 = input.alan_m2 * input.kalinlik_m;
  const kuruHarcKutlesiKg = hacimM3 * input.yogunluk_kg_m3;
  const gerekliTorbaSayisi = Math.ceil(kuruHarcKutlesiKg / input.torbaAgirligi_kg);

  return {
    value: { gerekliTorbaSayisi },
    intermediates: {
      hacim_m3: hacimM3,
      kuruHarcKutlesi_kg: kuruHarcKutlesiKg,
    },
    standardsUsed: [],
  };
}

export const sivaHarcMiktari: CalcModule<SivaHarcMiktariInput, SivaHarcMiktariOutput> = {
  id: "siva-harc-miktari",
  title: "Sıva / Harç Miktarı Hesabı",
  discipline: "insaat",
  standards: [],
  inputSchema: sivaHarcMiktariInputSchema,
  compute,
};
