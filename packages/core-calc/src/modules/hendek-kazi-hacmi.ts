import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Şevli (trapez) hendek kazı hacmi: kesit alanı A = h·(b + m·h), m = yatay/düşey şev oranı (iki yan şev).
// V = A·L;  gevşek (kabarmış) hacim = V·(1 + kabarma). Dik kazı için m = 0.
export const hendekKaziHacmiInputSchema = z.object({
  uzunluk_m: z.number().positive(),
  derinlik_m: z.number().positive(),
  tabanGenisligi_m: z.number().positive(),
  sevOrani: z.number().min(0).max(3),
  kabarmaYuzde: z.number().min(0).max(60),
});

export type HendekKaziHacmiInput = z.infer<typeof hendekKaziHacmiInputSchema>;

export interface HendekKaziHacmiOutput {
  kaziHacmi_m3: number;
}

function compute(input: HendekKaziHacmiInput): CalcResult<HendekKaziHacmiOutput> {
  const h = input.derinlik_m;
  const alan = h * (input.tabanGenisligi_m + input.sevOrani * h);
  const v = alan * input.uzunluk_m;
  return {
    value: { kaziHacmi_m3: v },
    intermediates: {
      kesit_alani_m2: alan,
      ust_genislik_m: input.tabanGenisligi_m + 2 * input.sevOrani * h,
      gevsek_hacim_m3: v * (1 + input.kabarmaYuzde / 100),
      sev_acisi_derece: input.sevOrani === 0 ? 90 : (Math.atan(1 / input.sevOrani) * 180) / Math.PI,
    },
    standardsUsed: [],
  };
}

export const hendekKaziHacmi: CalcModule<HendekKaziHacmiInput, HendekKaziHacmiOutput> = {
  id: "hendek-kazi-hacmi",
  title: "Hendek Kazı Hacmi (Şevli Kesit)",
  discipline: "insaat",
  standards: [],
  inputSchema: hendekKaziHacmiInputSchema,
  compute,
};
