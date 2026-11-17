import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Statik yeniden kazanım: ΔPs = R·(ρ/2)·(v1² − v2²). Dinamik basınç düşümü ΔPd = (ρ/2)(v1² − v2²).
export const kanalStatikBasincYenidenKazanimiInputSchema = z.object({
  v1_ms: z.number().positive(),
  v2_ms: z.number().positive(),
  r: z.number().min(0).max(1),
  yogunluk_kgm3: z.number().positive(),
});

export type KanalStatikBasincYenidenKazanimiInput = z.infer<typeof kanalStatikBasincYenidenKazanimiInputSchema>;

export interface KanalStatikBasincYenidenKazanimiOutput {
  statikKazanim_Pa: number;
}

function compute(input: KanalStatikBasincYenidenKazanimiInput): CalcResult<KanalStatikBasincYenidenKazanimiOutput> {
  const dd = (input.yogunluk_kgm3 / 2) * (input.v1_ms * input.v1_ms - input.v2_ms * input.v2_ms);
  return {
    value: { statikKazanim_Pa: input.r * dd },
    intermediates: { dinamik_basinc_dusumu_Pa: dd, kazanim_orani: input.r },
    standardsUsed: ["ASHRAE Fundamentals — Duct Design"],
  };
}

export const kanalStatikBasincYenidenKazanimi: CalcModule<
  KanalStatikBasincYenidenKazanimiInput,
  KanalStatikBasincYenidenKazanimiOutput
> = {
  id: "kanal-statik-basinc-yeniden-kazanimi",
  title: "Kanal Statik Basınç Yeniden Kazanımı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kanalStatikBasincYenidenKazanimiInputSchema,
  compute,
};
