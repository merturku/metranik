import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const yanginHattiStatikBasincSchema = z.object({
  sürtünme_katsayısı_f: z.number().positive(),
  boru_uzunluğu_m: z.number().positive(),
  boru_çapı_m: z.number().positive(),
  su_hızı_ms: z.number().positive(),
  su_yoğunluğu_kgm3: z.number().positive(),
});

export type YanginHattiStatikBasincInput = z.infer<typeof yanginHattiStatikBasincSchema>;

export interface YanginHattiStatikBasincOutput {
  basinç_kaybı_Pa: number;
  basinç_kaybı_bar: number;
}

export const yanginHattiStatikBasinc: CalcModule<YanginHattiStatikBasincInput, YanginHattiStatikBasincOutput> = {
  id: "yangin-hatti-statik-basinc",
  title: "Yangın Hattı Statik Basınç Düşümü",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: yanginHattiStatikBasincSchema,

  compute(input: YanginHattiStatikBasincInput): CalcResult<YanginHattiStatikBasincOutput> {
    // ΔP = f × (L/D) × (ρ × V² / 2)
    const dinamik_basınç = (input.su_yoğunluğu_kgm3 * Math.pow(input.su_hızı_ms, 2)) / 2;
    const basinç_kaybı_Pa = input.sürtünme_katsayısı_f * (input.boru_uzunluğu_m / input.boru_çapı_m) * dinamik_basınç;
    const basinç_kaybı_bar = basinç_kaybı_Pa / 100000;

    return {
      value: {
        basinç_kaybı_Pa: Math.round(basinç_kaybı_Pa * 10) / 10,
        basinç_kaybı_bar: Math.round(basinç_kaybı_bar * 100) / 100,
      },
      intermediates: {
        dinamik_basınç_Pa: Math.round(dinamik_basınç * 10) / 10,
        l_d_orani: Math.round((input.boru_uzunluğu_m / input.boru_çapı_m) * 10) / 10,
      },
      standardsUsed: ["NFPA 13"],
    };
  },
};
