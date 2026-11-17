import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duan-King-Chen yaklaşık formülleri (AISC alignment chart ile uyumlu).
export const celikKolonEtkinBurkulmaBoyuKInputSchema = z.object({
  ga: z.number().min(0),
  gb: z.number().min(0),
  cerceve: z.enum(["otelenmesiz", "otelenmeli"]),
  L_m: z.number().positive(),
  r_mm: z.number().positive(),
});

export type CelikKolonEtkinBurkulmaBoyuKInput = z.infer<typeof celikKolonEtkinBurkulmaBoyuKInputSchema>;

export interface CelikKolonEtkinBurkulmaBoyuKOutput {
  K: number;
}

function compute(input: CelikKolonEtkinBurkulmaBoyuKInput): CalcResult<CelikKolonEtkinBurkulmaBoyuKOutput> {
  const { ga, gb } = input;
  const toplam = ga + gb;
  const carpim = ga * gb;
  const K =
    input.cerceve === "otelenmesiz"
      ? (3 * carpim + 1.4 * toplam + 0.64) / (3 * carpim + 2 * toplam + 1.28)
      : Math.sqrt((1.6 * carpim + 4 * toplam + 7.5) / (toplam + 7.5));
  const Lk = K * input.L_m;
  return {
    value: { K },
    intermediates: { burkulma_boyu_m: Lk, narinlik: (Lk * 1000) / input.r_mm },
    standardsUsed: ["AISC 360 Ek 7 yorumu / Duan-King-Chen"],
  };
}

export const celikKolonEtkinBurkulmaBoyuK: CalcModule<CelikKolonEtkinBurkulmaBoyuKInput, CelikKolonEtkinBurkulmaBoyuKOutput> = {
  id: "celik-kolon-etkin-burkulma-boyu-k",
  title: "Çelik Kolon Etkin Burkulma Boyu Katsayısı (K) ve Narinlik",
  discipline: "insaat",
  standards: [],
  inputSchema: celikKolonEtkinBurkulmaBoyuKInputSchema,
  compute,
};
