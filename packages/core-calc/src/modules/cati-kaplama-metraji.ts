import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çatı kaplama malzeme metrajı: eğimli çatının gerçek yüzey alanı, izdüşüm
// (plan) alanının eğim açısının kosinüsüne bölünmesiyle bulunur — açı arttıkça
// gerçek alan izdüşümden hızla büyür (trigonometri). Fire payı eklenir.
// GerçekAlan = İzdüşümAlanı / cos(θ), GerekliMalzeme = GerçekAlan × (1+Fire).
export const catiKaplamaMetrajiInputSchema = z.object({
  izdusumAlani_m2: z.number().positive(),
  egimAcisi_derece: z.number().nonnegative().max(89),
  fireOrani: z.number().nonnegative(),
});

export type CatiKaplamaMetrajiInput = z.infer<typeof catiKaplamaMetrajiInputSchema>;

export interface CatiKaplamaMetrajiOutput {
  gerekliMalzeme_m2: number;
}

function compute(
  input: CatiKaplamaMetrajiInput,
): CalcResult<CatiKaplamaMetrajiOutput> {
  const egimAcisiRadyan = (input.egimAcisi_derece * Math.PI) / 180;
  const gercekCatiAlaniM2 = input.izdusumAlani_m2 / Math.cos(egimAcisiRadyan);
  const gerekliMalzemeM2 = gercekCatiAlaniM2 * (1 + input.fireOrani);

  return {
    value: { gerekliMalzeme_m2: gerekliMalzemeM2 },
    intermediates: {
      gercekCatiAlani_m2: gercekCatiAlaniM2,
    },
    standardsUsed: [],
  };
}

export const catiKaplamaMetraji: CalcModule<
  CatiKaplamaMetrajiInput,
  CatiKaplamaMetrajiOutput
> = {
  id: "cati-kaplama-metraji",
  title: "Çatı Kaplama Malzeme Metrajı",
  discipline: "insaat",
  standards: [],
  inputSchema: catiKaplamaMetrajiInputSchema,
  compute,
};
