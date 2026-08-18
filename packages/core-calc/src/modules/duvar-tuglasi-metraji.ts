import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duvar dolgu tuğlası metrajı: tuğla birim alanı, tuğla ölçüleri + derz
// kalınlığından geometrik olarak hesaplanır; duvar alanı bu birim alana
// bölünüp fire payı eklenerek gerekli tuğla adedi bulunur.
// BirimAlan = (L+derz)×(Y+derz), Adet = ⌈DuvarAlanı / BirimAlan × (1+Fire)⌉.
export const duvarTuglasiMetrajiInputSchema = z.object({
  tuglaUzunlugu_mm: z.number().positive(),
  tuglaYuksekligi_mm: z.number().positive(),
  derzKalinligi_mm: z.number().nonnegative(),
  duvarAlani_m2: z.number().positive(),
  fireOrani: z.number().nonnegative(),
});

export type DuvarTuglasiMetrajiInput = z.infer<typeof duvarTuglasiMetrajiInputSchema>;

export interface DuvarTuglasiMetrajiOutput {
  gerekliTuglaAdedi: number;
}

function compute(
  input: DuvarTuglasiMetrajiInput,
): CalcResult<DuvarTuglasiMetrajiOutput> {
  const tuglaBirimAlaniM2 =
    ((input.tuglaUzunlugu_mm + input.derzKalinligi_mm) *
      (input.tuglaYuksekligi_mm + input.derzKalinligi_mm)) /
    1e6;
  const teorikAdet = input.duvarAlani_m2 / tuglaBirimAlaniM2;
  const gerekliTuglaAdedi = Math.ceil(teorikAdet * (1 + input.fireOrani));

  return {
    value: { gerekliTuglaAdedi },
    intermediates: {
      tuglaBirimAlani_m2: tuglaBirimAlaniM2,
      teorikAdet,
    },
    standardsUsed: [],
  };
}

export const duvarTuglasiMetraji: CalcModule<
  DuvarTuglasiMetrajiInput,
  DuvarTuglasiMetrajiOutput
> = {
  id: "duvar-tuglasi-metraji",
  title: "Duvar Dolgu Tuğlası Metrajı",
  discipline: "insaat",
  standards: [],
  inputSchema: duvarTuglasiMetrajiInputSchema,
  compute,
};
