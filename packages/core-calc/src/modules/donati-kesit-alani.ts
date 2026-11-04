import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Donatı kesit alanı: A = n·π·φ²/4;  gerekli alan As,gerek için n ≥ ⌈As/(πφ²/4)⌉.
// Çubuk aralığı ve paspayı kontrolü kapsam dışıdır.
export const donatiKesitAlaniInputSchema = z.object({
  cap_mm: z.number().positive(),
  adet: z.number().int().positive(),
  gerekliAlan_mm2: z.number().min(0),
});

export type DonatiKesitAlaniInput = z.infer<typeof donatiKesitAlaniInputSchema>;

export interface DonatiKesitAlaniOutput {
  toplamAlan_mm2: number;
}

function compute(input: DonatiKesitAlaniInput): CalcResult<DonatiKesitAlaniOutput> {
  const a1 = (Math.PI * input.cap_mm ** 2) / 4;
  const toplam = a1 * input.adet;
  const gerekenAdet = Math.max(1, Math.ceil(input.gerekliAlan_mm2 / a1 - 1e-9));
  return {
    value: { toplamAlan_mm2: toplam },
    intermediates: {
      tek_cubuk_alani_mm2: a1,
      gereken_adet: gerekenAdet,
      karsilama_orani: input.gerekliAlan_mm2 > 0 ? toplam / input.gerekliAlan_mm2 : "—",
      yeterli: toplam + 1e-9 >= input.gerekliAlan_mm2 ? "Evet" : "Hayır",
    },
    verdict:
      input.gerekliAlan_mm2 > 0
        ? toplam + 1e-9 >= input.gerekliAlan_mm2
          ? { status: "uygun", note: "Seçilen donatı gerekli alanı karşılıyor." }
          : { status: "uygunsuz", note: `Yetersiz; en az ${gerekenAdet} adet gerekir.` }
        : undefined,
    standardsUsed: ["TS 500 / TS 708 (nominal çap)"],
  };
}

export const donatiKesitAlani: CalcModule<DonatiKesitAlaniInput, DonatiKesitAlaniOutput> = {
  id: "donati-kesit-alani",
  title: "Donatı Kesit Alanı ve Adet Seçimi",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: donatiKesitAlaniInputSchema,
  compute,
};
