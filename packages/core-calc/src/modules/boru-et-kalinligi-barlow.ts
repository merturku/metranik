import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Barlow formülü: basınçlı boru için gerekli minimum et kalınlığı
// t = P·D / (2·S). P: iç basınç, D: dış çap, S: izin verilen gerilme.
export const boruEtKalinligiBarlowInputSchema = z.object({
  icBasinc_P_MPa: z.number().positive(),
  disCap_D_mm: z.number().positive(),
  izinVerilenGerilme_S_MPa: z.number().positive(),
});

export type BoruEtKalinligiBarlowInput = z.infer<typeof boruEtKalinligiBarlowInputSchema>;

export interface BoruEtKalinligiBarlowOutput {
  minimumEtKalinligi_mm: number;
}

function compute(
  input: BoruEtKalinligiBarlowInput,
): CalcResult<BoruEtKalinligiBarlowOutput> {
  const minimumEtKalinligiMm =
    (input.icBasinc_P_MPa * input.disCap_D_mm) / (2 * input.izinVerilenGerilme_S_MPa);

  return {
    value: { minimumEtKalinligi_mm: minimumEtKalinligiMm },
    intermediates: {
      izinVerilenGerilme_S_MPa: input.izinVerilenGerilme_S_MPa,
    },
    standardsUsed: ["Barlow Formülü"],
  };
}

export const boruEtKalinligiBarlow: CalcModule<
  BoruEtKalinligiBarlowInput,
  BoruEtKalinligiBarlowOutput
> = {
  id: "boru-et-kalinligi-barlow",
  title: "Boru Et Kalınlığı (Barlow Formülü)",
  discipline: "mekanik",
  standards: ["Barlow Formülü"],
  inputSchema: boruEtKalinligiBarlowInputSchema,
  compute,
};
