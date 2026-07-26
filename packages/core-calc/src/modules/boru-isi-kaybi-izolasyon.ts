import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Silindirik iletim (Fourier yasası): q' = 2πk(T1-T2)/ln(r2/r1).
// k: izolasyon ısı iletkenlik katsayısı, r1/r2: boru/izolasyon dış yarıçapı.
export const boruIsiKaybiIzolasyonInputSchema = z.object({
  izolasyonIsiIletkenligi_k_WmK: z.number().positive(),
  boruDisYaricapi_r1_mm: z.number().positive(),
  izolasyonDisYaricapi_r2_mm: z.number().positive(),
  icSicaklik_T1_C: z.number(),
  disSicaklik_T2_C: z.number(),
  boruUzunlugu_L_m: z.number().positive(),
});

export type BoruIsiKaybiIzolasyonInput = z.infer<typeof boruIsiKaybiIzolasyonInputSchema>;

export interface BoruIsiKaybiIzolasyonOutput {
  toplamIsiKaybi_W: number;
}

function compute(
  input: BoruIsiKaybiIzolasyonInput,
): CalcResult<BoruIsiKaybiIzolasyonOutput> {
  const birimUzunlukKaybiWm =
    (2 *
      Math.PI *
      input.izolasyonIsiIletkenligi_k_WmK *
      (input.icSicaklik_T1_C - input.disSicaklik_T2_C)) /
    Math.log(input.izolasyonDisYaricapi_r2_mm / input.boruDisYaricapi_r1_mm);

  return {
    value: { toplamIsiKaybi_W: birimUzunlukKaybiWm * input.boruUzunlugu_L_m },
    intermediates: {
      birimUzunlukKaybi_Wm: birimUzunlukKaybiWm,
    },
    standardsUsed: [],
  };
}

export const boruIsiKaybiIzolasyon: CalcModule<
  BoruIsiKaybiIzolasyonInput,
  BoruIsiKaybiIzolasyonOutput
> = {
  id: "boru-isi-kaybi-izolasyon",
  title: "Boru Isı Kaybı (İzolasyonlu)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruIsiKaybiIzolasyonInputSchema,
  compute,
};
