import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500: betonun karşılayamadığı kesme kuvveti (Vs = Vu-Vc) etriyeye
// düşer. Klasik etriye denklemi Vs = Av·fyd·d/s'ten gerekli aralık
// s = Av·fyd·d/Vs. Kesme Kuvveti Kapasitesi (Beton) modülüyle birlikte
// kullanılır — Vc oradan alınabilir.
const CELIK_GAMMA_S = 1.15;

export const kesmeDonatisiAraligiInputSchema = z.object({
  tasarimKesmeKuvveti_Vu_kN: z.number().positive(),
  betonKesmeKapasitesi_Vc_kN: z.number().positive(),
  etriyeKesitAlani_Av_mm2: z.number().positive(),
  celikAkmaDayanimi_fyk_MPa: z.number().positive(),
  faydaliYukseklik_d_mm: z.number().positive(),
});

export type KesmeDonatisiAraligiInput = z.infer<typeof kesmeDonatisiAraligiInputSchema>;

export interface KesmeDonatisiAraligiOutput {
  gerekliAralik_s_mm: number;
}

function compute(input: KesmeDonatisiAraligiInput): CalcResult<KesmeDonatisiAraligiOutput> {
  const fydMPa = input.celikAkmaDayanimi_fyk_MPa / CELIK_GAMMA_S;
  const celigeDusenKesmeKN = input.tasarimKesmeKuvveti_Vu_kN - input.betonKesmeKapasitesi_Vc_kN;
  const gerekliAralikMm =
    (input.etriyeKesitAlani_Av_mm2 * fydMPa * input.faydaliYukseklik_d_mm) /
    (celigeDusenKesmeKN * 1000);

  return {
    value: { gerekliAralik_s_mm: gerekliAralikMm },
    intermediates: {
      celikHesapDayanimi_fyd_MPa: fydMPa,
      celigeDusenKesme_Vs_kN: celigeDusenKesmeKN,
    },
    standardsUsed: ["TS 500"],
  };
}

export const kesmeDonatisiAraligi: CalcModule<
  KesmeDonatisiAraligiInput,
  KesmeDonatisiAraligiOutput
> = {
  id: "kesme-donatisi-araligi",
  title: "Kesme Donatısı (Etriye) Aralığı",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: kesmeDonatisiAraligiInputSchema,
  compute,
};
