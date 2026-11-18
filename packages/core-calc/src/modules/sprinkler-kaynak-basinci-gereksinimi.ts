import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kaynak basıncı: P = Pbaşlık + Pborunun sürtünme + Pyükseklik(0,0981·h) + Palarm vanası + Pemniyet; mevcut besleme ile karşılaştırma.
export const sprinklerKaynakBasinciGereksinimiInputSchema = z.object({
  baslikBasinci_bar: z.number().min(0),
  surtunmeKaybi_bar: z.number().min(0),
  yukseklik_m: z.number(),
  alarmVanaKaybi_bar: z.number().min(0),
  emniyetPayi_bar: z.number().min(0),
  mevcutBasinc_bar: z.number().min(0),
});

export type SprinklerKaynakBasinciGereksinimiInput = z.infer<typeof sprinklerKaynakBasinciGereksinimiInputSchema>;

export interface SprinklerKaynakBasinciGereksinimiOutput {
  gerekliBasinc_bar: number;
}

function compute(input: SprinklerKaynakBasinciGereksinimiInput): CalcResult<SprinklerKaynakBasinciGereksinimiOutput> {
  const statik = 0.0980665 * input.yukseklik_m;
  const P = input.baslikBasinci_bar + input.surtunmeKaybi_bar + statik + input.alarmVanaKaybi_bar + input.emniyetPayi_bar;
  const fark = input.mevcutBasinc_bar - P;
  return {
    value: { gerekliBasinc_bar: P },
    intermediates: {
      statik_basinc_bar: statik,
      mevcut_fazla_bar: fark,
      mevcut_oran: input.mevcutBasinc_bar / P,
    },
    standardsUsed: ["NFPA 13"],
    verdict:
      fark >= 0
        ? { status: "uygun", note: "Mevcut kaynak basıncı gereken basıncı karşılıyor." }
        : { status: "uygunsuz", note: "Mevcut kaynak basıncı yetersiz; yangın pompası veya tank seviyesi gerekir." },
  };
}

export const sprinklerKaynakBasinciGereksinimi: CalcModule<SprinklerKaynakBasinciGereksinimiInput, SprinklerKaynakBasinciGereksinimiOutput> = {
  id: "sprinkler-kaynak-basinci-gereksinimi",
  title: "Sprinkler Sistemi Kaynak Basıncı Gereksinimi",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: sprinklerKaynakBasinciGereksinimiInputSchema,
  compute,
};
