import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerekli susturucu uzunluğu: L = Gerekli Ses Azaltımı / Birim Azaltım.
export const susturucuUzunluguInputSchema = z.object({
  gerekliSesAzaltimi_dB: z.number().positive(),
  birimAzaltim_dBm: z.number().positive(),
});

export type SusturucuUzunluguInput = z.infer<typeof susturucuUzunluguInputSchema>;

export interface SusturucuUzunluguOutput {
  gerekliUzunluk_m: number;
}

function compute(input: SusturucuUzunluguInput): CalcResult<SusturucuUzunluguOutput> {
  const gerekliUzunlukM = input.gerekliSesAzaltimi_dB / input.birimAzaltim_dBm;

  return {
    value: { gerekliUzunluk_m: gerekliUzunlukM },
    intermediates: {
      birimAzaltim_dBm: input.birimAzaltim_dBm,
    },
    standardsUsed: [],
  };
}

export const susturucuUzunlugu: CalcModule<SusturucuUzunluguInput, SusturucuUzunluguOutput> = {
  id: "susturucu-uzunlugu",
  title: "Susturucu Uzunluğu",
  discipline: "mekanik",
  standards: [],
  inputSchema: susturucuUzunluguInputSchema,
  compute,
};
