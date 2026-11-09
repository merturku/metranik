import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Eşit taksitli (annüite) kredi: A = P·i/(1 − (1+i)^−n), i = aylık faiz oranı, n = vade (ay). i = 0 ise A = P/n.
// Vergi/fon (BSMV, KKDF), masraf ve sigorta dahil değildir; bankanın ödeme planını esas alın.
export const evKonutKredisiTaksitInputSchema = z.object({
  anapara: z.number().positive(),
  aylikFaizYuzde: z.number().min(0).max(20),
  vadeAy: z.number().int().min(1).max(600),
});

export type EvKonutKredisiTaksitInput = z.infer<typeof evKonutKredisiTaksitInputSchema>;

export interface EvKonutKredisiTaksitOutput {
  aylikTaksit: number;
}

function compute(input: EvKonutKredisiTaksitInput): CalcResult<EvKonutKredisiTaksitOutput> {
  const i = input.aylikFaizYuzde / 100;
  const n = input.vadeAy;
  const taksit = i === 0 ? input.anapara / n : (input.anapara * i) / (1 - Math.pow(1 + i, -n));
  const toplam = taksit * n;
  return {
    value: { aylikTaksit: taksit },
    intermediates: {
      toplam_odeme: toplam,
      toplam_faiz: toplam - input.anapara,
      faiz_anapara_orani: (toplam - input.anapara) / input.anapara,
    },
    standardsUsed: ["Annüite formülü (bileşik faiz)"],
  };
}

export const evKonutKredisiTaksit: CalcModule<EvKonutKredisiTaksitInput, EvKonutKredisiTaksitOutput> = {
  id: "ev-konut-kredisi-taksit",
  title: "Kredi Aylık Taksit ve Toplam Faiz",
  discipline: "ev",
  standards: [],
  inputSchema: evKonutKredisiTaksitInputSchema,
  compute,
};
