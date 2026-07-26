import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basamak sayısı: n = Kat Yüksekliği / Rıht Yüksekliği.
export const merdivenBasamakSayisiInputSchema = z.object({
  katYuksekligi_cm: z.number().positive(),
  rihtYuksekligi_cm: z.number().positive(),
});

export type MerdivenBasamakSayisiInput = z.infer<typeof merdivenBasamakSayisiInputSchema>;

export interface MerdivenBasamakSayisiOutput {
  basamakSayisi: number;
}

function compute(input: MerdivenBasamakSayisiInput): CalcResult<MerdivenBasamakSayisiOutput> {
  const basamakSayisiTam = Math.ceil(input.katYuksekligi_cm / input.rihtYuksekligi_cm);
  const gercekRihtCm = input.katYuksekligi_cm / basamakSayisiTam;

  return {
    value: { basamakSayisi: basamakSayisiTam },
    intermediates: {
      gercekRihtYuksekligi_cm: gercekRihtCm,
    },
    standardsUsed: [],
  };
}

export const merdivenBasamakSayisi: CalcModule<
  MerdivenBasamakSayisiInput,
  MerdivenBasamakSayisiOutput
> = {
  id: "merdiven-basamak-sayisi",
  title: "Merdiven Basamak Sayısı",
  discipline: "insaat",
  standards: [],
  inputSchema: merdivenBasamakSayisiInputSchema,
  compute,
};
