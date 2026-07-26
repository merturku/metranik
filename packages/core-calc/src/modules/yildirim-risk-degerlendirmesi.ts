import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 62305-2 (basitleştirilmiş): yıllık beklenen yıldırım düşme sıklığı
// Nd = Ng × Ae × Cd × 10⁻⁶. Ng: yıldırım yer yoğunluğu (yıldırım/km²/yıl),
// Ae: eşdeğer toplama alanı (m²), Cd: konum katsayısı.
export const yildirimRiskDegerlendirmesiInputSchema = z.object({
  yildirimYogunlugu_Ng_km2yil: z.number().positive(),
  esdegerToplamaAlani_Ae_m2: z.number().positive(),
  konumKatsayisi_Cd: z.number().positive(),
});

export type YildirimRiskDegerlendirmesiInput = z.infer<
  typeof yildirimRiskDegerlendirmesiInputSchema
>;

export interface YildirimRiskDegerlendirmesiOutput {
  yillikDusmeSikligi_Nd: number;
}

function compute(
  input: YildirimRiskDegerlendirmesiInput,
): CalcResult<YildirimRiskDegerlendirmesiOutput> {
  const ndYillik =
    input.yildirimYogunlugu_Ng_km2yil *
    input.esdegerToplamaAlani_Ae_m2 *
    input.konumKatsayisi_Cd *
    1e-6;

  return {
    value: { yillikDusmeSikligi_Nd: ndYillik },
    intermediates: {
      konumKatsayisi_Cd: input.konumKatsayisi_Cd,
    },
    standardsUsed: ["IEC 62305-2"],
  };
}

export const yildirimRiskDegerlendirmesi: CalcModule<
  YildirimRiskDegerlendirmesiInput,
  YildirimRiskDegerlendirmesiOutput
> = {
  id: "yildirim-risk-degerlendirmesi",
  title: "Yıldırım Risk Değerlendirmesi",
  discipline: "elektrik",
  standards: ["IEC 62305-2"],
  inputSchema: yildirimRiskDegerlendirmesiInputSchema,
  compute,
};
