import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kanal yerel (dinamik) basınç kaybı: ΔP = ΣC · ρ·v²/2, v = Q/A (ASHRAE Fundamentals Duct Design / SMACNA). C katsayıları
// dirsek, çatal, daralma vb. fitingler için ilgili tablodan okunup toplanır (mühendisin girdisi). Sürtünme kaybı ayrı modüldedir.
export const kanalYerelKayipBasincInputSchema = z.object({
  debi_m3h: z.number().positive(),
  kesitAlani_m2: z.number().positive(),
  kayipKatsayilariToplami: z.number().min(0),
  yogunluk_kgm3: z.number().positive(),
});

export type KanalYerelKayipBasincInput = z.infer<typeof kanalYerelKayipBasincInputSchema>;

export interface KanalYerelKayipBasincOutput {
  yerelKayip_Pa: number;
}

function compute(input: KanalYerelKayipBasincInput): CalcResult<KanalYerelKayipBasincOutput> {
  const v = input.debi_m3h / 3600 / input.kesitAlani_m2;
  const pd = (input.yogunluk_kgm3 * v * v) / 2;
  return {
    value: { yerelKayip_Pa: input.kayipKatsayilariToplami * pd },
    intermediates: { hiz_ms: v, dinamik_basinc_Pa: pd },
    standardsUsed: ["ASHRAE Fundamentals — Duct Design (yerel kayıp ΔP = C·ρv²/2)"],
  };
}

export const kanalYerelKayipBasinc: CalcModule<KanalYerelKayipBasincInput, KanalYerelKayipBasincOutput> = {
  id: "kanal-yerel-kayip-basinc",
  title: "Kanal Fiting Yerel Basınç Kaybı",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: kanalYerelKayipBasincInputSchema,
  compute,
};
