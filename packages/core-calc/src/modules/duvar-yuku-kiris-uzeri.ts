import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duvar çizgisel yükü: q = (γd·t + 2·ts·γs)·h·(1 − boşluk).
export const duvarYukuKirisUzeriInputSchema = z.object({
  kalinlik_m: z.number().positive(),
  yukseklik_m: z.number().positive(),
  duvarGamma: z.number().positive(),
  sivaKalinligi_m: z.number().min(0),
  sivaGamma: z.number().positive(),
  bosluk: z.number().min(0).max(0.95),
});

export type DuvarYukuKirisUzeriInput = z.infer<typeof duvarYukuKirisUzeriInputSchema>;

export interface DuvarYukuKirisUzeriOutput {
  duvarYuku_kNm: number;
}

function compute(input: DuvarYukuKirisUzeriInput): CalcResult<DuvarYukuKirisUzeriOutput> {
  const birimAlan = input.duvarGamma * input.kalinlik_m + 2 * input.sivaKalinligi_m * input.sivaGamma;
  const bosluksuz = birimAlan * input.yukseklik_m;
  return {
    value: { duvarYuku_kNm: bosluksuz * (1 - input.bosluk) },
    intermediates: { birim_alan_yuku_kNm2: birimAlan, bosluksuz_yuk_kNm: bosluksuz },
    standardsUsed: ["TS 498"],
  };
}

export const duvarYukuKirisUzeri: CalcModule<DuvarYukuKirisUzeriInput, DuvarYukuKirisUzeriOutput> = {
  id: "duvar-yuku-kiris-uzeri",
  title: "Kiriş Üzeri Duvar Yükü (kN/m)",
  discipline: "insaat",
  standards: ["TS 498"],
  inputSchema: duvarYukuKirisUzeriInputSchema,
  compute,
};
