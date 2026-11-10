import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Havai iletken parabolik sehim (düz mesnetli açıklık): f = w·L²/(8·H); iletken boyu ≈ L + 8f²/(3L); mesnette çekme T ≈ H + w·f.
// w = birim boy ağırlık (N/m, buz/rüzgar yükü dahil edilirse bileşke), H = yatay çekme bileşeni (N). Eşit yükseklikli mesnet ve küçük sehim (f/L < 0,1) varsayılır.
export const havaiHatSehimiInputSchema = z.object({
  birimAgirlik_Nm: z.number().positive(),
  aciklik_m: z.number().positive(),
  yatayCekme_N: z.number().positive(),
});

export type HavaiHatSehimiInput = z.infer<typeof havaiHatSehimiInputSchema>;

export interface HavaiHatSehimiOutput {
  sehim_m: number;
}

function compute(input: HavaiHatSehimiInput): CalcResult<HavaiHatSehimiOutput> {
  const { birimAgirlik_Nm: w, aciklik_m: L, yatayCekme_N: H } = input;
  const f = (w * L * L) / (8 * H);
  return {
    value: { sehim_m: f },
    intermediates: {
      iletken_boyu_m: L + (8 * f * f) / (3 * L),
      mesnet_cekmesi_N: H + w * f,
      sehim_aciklik_orani: f / L,
      not: f / L > 0.1 ? "f/L > 0,1: parabol yaklaşımı yetersiz, katenar kullanın" : "—",
    },
    standardsUsed: ["Parabolik kablo teorisi (EN 50341 temel bağıntı)"],
  };
}

export const havaiHatSehimi: CalcModule<HavaiHatSehimiInput, HavaiHatSehimiOutput> = {
  id: "havai-hat-sehimi",
  title: "Havai Hat İletken Sehimi",
  discipline: "elektrik",
  standards: [],
  inputSchema: havaiHatSehimiInputSchema,
  compute,
};
