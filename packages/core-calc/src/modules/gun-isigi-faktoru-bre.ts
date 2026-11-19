import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// BRE ortalama gün ışığı faktörü (split-flux): DF = Aw·T·θ·M / (A·(1 − R²))  [%]
// θ: pencereden görünen gökyüzü açısı (derece, düşey düzlemde)
export const gunIsigiFaktoruBreInputSchema = z.object({
  camAlani_m2: z.number().positive(),
  camGecirgenligi: z.number().gt(0).max(1),
  gokyuzuAcisi_derece: z.number().gt(0).max(90),
  bakimFaktoru: z.number().gt(0).max(1),
  odaToplamYuzeyAlani_m2: z.number().positive(),
  ortalamaYansima: z.number().min(0).lt(1),
});

export type GunIsigiFaktoruBreInput = z.infer<typeof gunIsigiFaktoruBreInputSchema>;
export interface GunIsigiFaktoruBreOutput {
  gunIsigiFaktoru_yuzde: number;
}

function compute(input: GunIsigiFaktoruBreInput): CalcResult<GunIsigiFaktoruBreOutput> {
  const R2 = input.ortalamaYansima ** 2;
  const df =
    (input.camAlani_m2 * input.camGecirgenligi * input.gokyuzuAcisi_derece * input.bakimFaktoru) /
    (input.odaToplamYuzeyAlani_m2 * (1 - R2));
  const status = df >= 5 ? "uygun" : df >= 2 ? "sinirda" : "uygunsuz";
  const note =
    df >= 5
      ? "DF ≥ %5: oda genel olarak gün ışığıyla aydınlık algılanır"
      : df >= 2
        ? "%2 ≤ DF < %5: kısmen gün ışıklı, gün boyu ek yapay aydınlatma sıklıkla gerekir"
        : "DF < %2: yapay aydınlatma gün boyu gerekli, oda loş algılanır";
  return {
    value: { gunIsigiFaktoru_yuzde: df },
    intermediates: {
      yansima_terimi_1_eksi_R2: 1 - R2,
      pencere_zemin_orani: input.camAlani_m2 / input.odaToplamYuzeyAlani_m2,
    },
    standardsUsed: ["BRE / CIBSE LG10 ortalama gün ışığı faktörü"],
    verdict: { status, note },
  };
}

export const gunIsigiFaktoruBre: CalcModule<GunIsigiFaktoruBreInput, GunIsigiFaktoruBreOutput> = {
  id: "gun-isigi-faktoru-bre",
  title: "Ortalama Gün Işığı Faktörü (BRE Yöntemi)",
  discipline: "ev",
  standards: ["BRE / CIBSE LG10 ortalama gün ışığı faktörü"],
  inputSchema: gunIsigiFaktoruBreInputSchema,
  compute,
};
