import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Lümen (lüks) yöntemi: Φ = E·A / (UF·MF). Hedef aydınlık düzeyi (E, EN 12464-1
// mekan tablosundan) ve faydalı kullanım faktörü (UF, oda indeksine bağlı) mühendis
// girdisidir; tablo bu modülde gömülü değildir.
export const aydinlatmaInputSchema = z.object({
  hedefAydinlik_lux: z.number().positive(),
  alan_m2: z.number().positive(),
  faydaliKullanimFaktoru: z.number().positive().max(1),
  bakimFaktoru: z.number().positive().max(1),
});

export type AydinlatmaInput = z.infer<typeof aydinlatmaInputSchema>;

export interface AydinlatmaOutput {
  gerekliAkilAr_lm: number;
}

function compute(input: AydinlatmaInput): CalcResult<AydinlatmaOutput> {
  const gerekliAkiLm =
    (input.hedefAydinlik_lux * input.alan_m2) /
    (input.faydaliKullanimFaktoru * input.bakimFaktoru);

  return {
    value: { gerekliAkilAr_lm: gerekliAkiLm },
    intermediates: {
      hedefAydinlik_lux: input.hedefAydinlik_lux,
      alan_m2: input.alan_m2,
    },
    standardsUsed: ["EN 12464-1"],
  };
}

export const aydinlatmaEn12464: CalcModule<AydinlatmaInput, AydinlatmaOutput> = {
  id: "aydinlatma-en12464",
  title: "Aydınlatma (Lüks Yöntemi)",
  discipline: "elektrik",
  standards: ["EN 12464-1"],
  inputSchema: aydinlatmaInputSchema,
  compute,
};
