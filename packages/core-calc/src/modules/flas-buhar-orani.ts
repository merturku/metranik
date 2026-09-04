import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Blöf tankına giren yüksek basınçlı doymuş su, düşük basınca ani genleştiğinde
// bir kısmı buharlaşır (flaş buharlaşma). Entalpi dengesi: yüksek basınçtaki
// suyun fazla entalpisi, düşük basınçta buharlaşma gizli ısısını karşılayan
// kısma dönüşür. x = (hf,yüksek - hf,düşük) / hfg,düşük. hf/hfg değerleri
// buhar tablolarından (ilgili basınçlar için) alınır. Buhar Kazanı Besi Suyu
// Debisi modülünün ürettiği blöf debisinin ne kadarının flaş buhara
// dönüştüğünü hesaplar.
export const flasBuharOraniInputSchema = z.object({
  blofDebisi_kgh: z.number().positive(),
  yuksekBasincDoymusSuEntalpisi_hfYuksek_kJkg: z.number().positive(),
  dusukBasincDoymusSuEntalpisi_hfDusuk_kJkg: z.number().positive(),
  dusukBasincBuharlasmaGizliIsisi_hfgDusuk_kJkg: z.number().positive(),
});

export type FlasBuharOraniInput = z.infer<typeof flasBuharOraniInputSchema>;

export interface FlasBuharOraniOutput {
  flasBuharDebisi_kgh: number;
}

function compute(input: FlasBuharOraniInput): CalcResult<FlasBuharOraniOutput> {
  const flasBuharOraniX =
    (input.yuksekBasincDoymusSuEntalpisi_hfYuksek_kJkg -
      input.dusukBasincDoymusSuEntalpisi_hfDusuk_kJkg) /
    input.dusukBasincBuharlasmaGizliIsisi_hfgDusuk_kJkg;
  const flasBuharDebisiKgh = input.blofDebisi_kgh * flasBuharOraniX;

  return {
    value: { flasBuharDebisi_kgh: flasBuharDebisiKgh },
    intermediates: {
      flasBuharOrani_x: flasBuharOraniX,
    },
    standardsUsed: [],
  };
}

export const flasBuharOrani: CalcModule<FlasBuharOraniInput, FlasBuharOraniOutput> = {
  id: "flas-buhar-orani",
  title: "Flaş Buhar Oranı (Blöf Tankı)",
  discipline: "mekanik",
  standards: [],
  inputSchema: flasBuharOraniInputSchema,
  compute,
};
