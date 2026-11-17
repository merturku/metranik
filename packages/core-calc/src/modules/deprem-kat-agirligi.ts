import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Deprem kütlesi: wi = Gi + n·Qi (n: hareketli yük katılım katsayısı). Toplam W = (tipik kat × adet) + çatı katı.
export const depremKatAgirligiInputSchema = z.object({
  g_kN: z.number().min(0),
  q_kN: z.number().min(0),
  n: z.number().min(0).max(1),
  katSayisi: z.number().int().min(1),
  catiG_kN: z.number().min(0),
  catiQ_kN: z.number().min(0),
});

export type DepremKatAgirligiInput = z.infer<typeof depremKatAgirligiInputSchema>;

export interface DepremKatAgirligiOutput {
  toplamAgirlik_kN: number;
}

function compute(input: DepremKatAgirligiInput): CalcResult<DepremKatAgirligiOutput> {
  const tipik = input.g_kN + input.n * input.q_kN;
  const cati = input.catiG_kN + input.n * input.catiQ_kN;
  const tipikToplam = tipik * input.katSayisi;
  return {
    value: { toplamAgirlik_kN: tipikToplam + cati },
    intermediates: { tipik_kat_agirligi_kN: tipik, cati_agirligi_kN: cati, tipik_kat_toplami_kN: tipikToplam },
    standardsUsed: ["TBDY 2018"],
  };
}

export const depremKatAgirligi: CalcModule<DepremKatAgirligiInput, DepremKatAgirligiOutput> = {
  id: "deprem-kat-agirligi",
  title: "Deprem Hesabı Kat Ağırlığı (G + n·Q)",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: depremKatAgirligiInputSchema,
  compute,
};
