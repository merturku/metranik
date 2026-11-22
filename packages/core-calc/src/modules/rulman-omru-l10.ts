import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rulman nominal ömrü (ISO 281): L10 = (C/P)^p (10⁶ devir), p = 3 bilyalı / 10/3 makaralı; L10h = 10⁶·L10/(60·n)
export const rulmanOmruL10InputSchema = z.object({
  dinamikYukSayisi_C_kN: z.number().positive(),
  esdegerYuk_P_kN: z.number().positive(),
  devir_rpm: z.number().positive(),
  rulmanTipi: z.enum(["bilya", "makara"]),
  gerekliOmur_saat: z.number().positive(),
});

export type RulmanOmruL10Input = z.infer<typeof rulmanOmruL10InputSchema>;
export interface RulmanOmruL10Output {
  L10h_saat: number;
}

const STD = "ISO 281 (dinamik yük sayısı ve nominal ömür)";

function compute(input: RulmanOmruL10Input): CalcResult<RulmanOmruL10Output> {
  const p = input.rulmanTipi === "bilya" ? 3 : 10 / 3;
  const L10 = Math.pow(input.dinamikYukSayisi_C_kN / input.esdegerYuk_P_kN, p);
  const L10h = (1e6 * L10) / (60 * input.devir_rpm);
  const oran = L10h / input.gerekliOmur_saat;
  return {
    value: { L10h_saat: L10h },
    intermediates: { us_p: p, L10_milyon_devir: L10, L10h_saat: L10h, omur_orani: oran, C_P_orani: input.dinamikYukSayisi_C_kN / input.esdegerYuk_P_kN },
    standardsUsed: [STD],
    verdict: {
      status: oran >= 1 ? "uygun" : oran >= 0.8 ? "sinirda" : "uygunsuz",
      note: `L10h = ${L10h.toFixed(0)} saat, gereken ${input.gerekliOmur_saat} saat (%90 güvenilirlik; yağlama/kirlilik düzeltmesi a_ISO değeri yok)`,
    },
  };
}

export const rulmanOmruL10: CalcModule<RulmanOmruL10Input, RulmanOmruL10Output> = {
  id: "rulman-omru-l10",
  title: "Rulman Nominal Ömrü (L10)",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: rulmanOmruL10InputSchema,
  compute,
};
