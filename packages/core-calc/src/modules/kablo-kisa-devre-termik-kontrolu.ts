import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kablo kısa devre adyabatik termik dayanım kontrolü (IEC 60364-4-43 / IEC 60949):
// Gerekli minimum kesit Smin = I×√t / k.
// I: kısa devre akımı (kA), t: koruma cihazının kesme süresi (s), k: iletken/izolasyon
// malzemesine bağlı sabit (ör. bakır+PVC için ~115, bakır+XLPE için ~143).
// Mevcut kesit Smin'den küçükse kablo kısa devre sırasında termik olarak hasar görür.
export const kabloKisaDevreTermikKontroluInputSchema = z.object({
  kisaDevreAkimi_I_kA: z.number().positive(),
  kesmeSuresi_t_s: z.number().positive(),
  malzemeSabiti_k: z.number().positive(),
  mevcutKesit_S_mm2: z.number().positive(),
});

export type KabloKisaDevreTermikKontroluInput = z.infer<
  typeof kabloKisaDevreTermikKontroluInputSchema
>;

export interface KabloKisaDevreTermikKontroluOutput {
  gerekliMinKesit_mm2: number;
}

function compute(
  input: KabloKisaDevreTermikKontroluInput,
): CalcResult<KabloKisaDevreTermikKontroluOutput> {
  const akim_A = input.kisaDevreAkimi_I_kA * 1000;
  const gerekliMinKesit_mm2 = (akim_A * Math.sqrt(input.kesmeSuresi_t_s)) / input.malzemeSabiti_k;
  const marj_mm2 = input.mevcutKesit_S_mm2 - gerekliMinKesit_mm2;

  return {
    value: { gerekliMinKesit_mm2 },
    intermediates: {
      mevcutKesit_S_mm2: input.mevcutKesit_S_mm2,
      marj_mm2: Number(marj_mm2.toFixed(2)),
    },
    standardsUsed: ["IEC 60364-4-43", "IEC 60949"],
    verdict:
      marj_mm2 >= 0
        ? { status: "uygun", note: "Mevcut kesit, kısa devre termik dayanımı için yeterli." }
        : {
            status: "uygunsuz",
            note: "Mevcut kesit yetersiz; kısa devre sırasında termik hasar riski var.",
          },
  };
}

export const kabloKisaDevreTermikKontrolu: CalcModule<
  KabloKisaDevreTermikKontroluInput,
  KabloKisaDevreTermikKontroluOutput
> = {
  id: "kablo-kisa-devre-termik-kontrolu",
  title: "Kablo Kısa Devre Termik Dayanım Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60364-4-43", "IEC 60949"],
  inputSchema: kabloKisaDevreTermikKontroluInputSchema,
  compute,
};
