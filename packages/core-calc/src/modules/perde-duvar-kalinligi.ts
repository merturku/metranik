import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basitleştirilmiş pratik kural: t = h / n (kat yüksekliğine bağlı asgari kalınlık).
export const perdeDuvarKalinligiInputSchema = z.object({
  katYuksekligi_h_m: z.number().positive(),
  katsayi_n: z.number().positive(),
});

export type PerdeDuvarKalinligiInput = z.infer<typeof perdeDuvarKalinligiInputSchema>;

export interface PerdeDuvarKalinligiOutput {
  minimumKalinlik_cm: number;
}

function compute(input: PerdeDuvarKalinligiInput): CalcResult<PerdeDuvarKalinligiOutput> {
  const minimumKalinlikCm = (input.katYuksekligi_h_m * 100) / input.katsayi_n;

  return {
    value: { minimumKalinlik_cm: minimumKalinlikCm },
    intermediates: {
      katsayi_n: input.katsayi_n,
    },
    standardsUsed: ["TBDY 2018"],
  };
}

export const perdeDuvarKalinligi: CalcModule<
  PerdeDuvarKalinligiInput,
  PerdeDuvarKalinligiOutput
> = {
  id: "perde-duvar-kalinligi",
  title: "Perde Duvar Kalınlığı",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: perdeDuvarKalinligiInputSchema,
  compute,
};
