import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dar hendekteki gömülü borunun üzerindeki toprak yükü (Marston teorisi):
// Cd = (1 − e^(−2·K·μ'·H/B))/(2·K·μ'),  W = Cd·γ·B²  [kN/m boy].
// K·μ' (Rankine aktif katsayı × hendek duvarı sürtünmesi) tipik değerleri: granüler (kum/çakıl) ≈ 0,165,
// doygun üst toprak ≈ 0,150, kil ≈ 0,130 (Spangler/Marston tabloları; yerel/tasarım şartnamesinden teyit edin).
// B hendek genişliği (boru üst seviyesinde); H boru üstüne kadar dolgu yüksekliği. Dar hendek kabulüdür (geniş hendek/
// çıkıntılı boru için Marston yöntemi farklıdır); trafik/yüzey yükleri ayrıca eklenmelidir.
export const hendekBoruToprakYukuMarstonInputSchema = z.object({
  birimHacimAgirlik_kNm3: z.number().positive(),
  dolguYuksekligi_H_m: z.number().positive(),
  hendekGenisligi_B_m: z.number().positive(),
  kMu: z.number().positive().max(0.5),
});

export type HendekBoruToprakYukuMarstonInput = z.infer<typeof hendekBoruToprakYukuMarstonInputSchema>;

export interface HendekBoruToprakYukuMarstonOutput {
  toprakYuku_kNm: number;
}

function compute(input: HendekBoruToprakYukuMarstonInput): CalcResult<HendekBoruToprakYukuMarstonOutput> {
  const { birimHacimAgirlik_kNm3: g, dolguYuksekligi_H_m: H, hendekGenisligi_B_m: B, kMu } = input;
  const cd = (1 - Math.exp((-2 * kMu * H) / B)) / (2 * kMu);
  const w = cd * g * B * B;
  return {
    value: { toprakYuku_kNm: w },
    intermediates: {
      yuk_katsayisi_Cd: cd,
      H_B_orani: H / B,
      prizma_yuku_gHB_kNm: g * H * B,
      marston_prizma_orani: w / (g * H * B),
      ortalama_dusey_basinc_kPa: w / B,
    },
    standardsUsed: ["Marston hendek yükü teorisi (K·μ' değerleri teyit edilmelidir)"],
  };
}

export const hendekBoruToprakYukuMarston: CalcModule<HendekBoruToprakYukuMarstonInput, HendekBoruToprakYukuMarstonOutput> = {
  id: "hendek-boru-toprak-yuku-marston",
  title: "Hendekte Boru Üzerindeki Toprak Yükü (Marston)",
  discipline: "insaat",
  standards: [],
  inputSchema: hendekBoruToprakYukuMarstonInputSchema,
  compute,
};
