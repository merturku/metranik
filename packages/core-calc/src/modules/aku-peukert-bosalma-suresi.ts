import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Peukert denklemi: akü kapasitesi deşarj akımıyla değişir. Anma kapasitesi C, H saatlik
// deşarja ait olmak üzere t = H·(C/(I·H))^k  [saat]; k = Peukert üssü (1 = ideal,
// kurşun-asitte tipik 1,1–1,3; üretici verisidir). Sıcaklık ve yaşlanma etkisi yok.
export const akuPeukertBosalmaSuresiInputSchema = z.object({
  kapasite_Ah: z.number().positive(),
  referansSure_h: z.number().positive(),
  akim_A: z.number().positive(),
  peukertUssu: z.number().min(1).max(1.6),
});

export type AkuPeukertBosalmaSuresiInput = z.infer<typeof akuPeukertBosalmaSuresiInputSchema>;

export interface AkuPeukertBosalmaSuresiOutput {
  bosalmaSuresi_h: number;
}

function compute(input: AkuPeukertBosalmaSuresiInput): CalcResult<AkuPeukertBosalmaSuresiOutput> {
  const t = input.referansSure_h * Math.pow(input.kapasite_Ah / (input.akim_A * input.referansSure_h), input.peukertUssu);
  const cEtkin = input.akim_A * t;
  return {
    value: { bosalmaSuresi_h: t },
    intermediates: {
      bosalma_suresi_dk: t * 60,
      etkin_kapasite_Ah: cEtkin,
      kapasite_kullanimi_yuzde: (cEtkin / input.kapasite_Ah) * 100,
      referans_akim_A: input.kapasite_Ah / input.referansSure_h,
    },
    standardsUsed: ["Peukert denklemi (üretici deşarj eğrisiyle teyit edilmeli)"],
  };
}

export const akuPeukertBosalmaSuresi: CalcModule<AkuPeukertBosalmaSuresiInput, AkuPeukertBosalmaSuresiOutput> = {
  id: "aku-peukert-bosalma-suresi",
  title: "Akü Boşalma Süresi (Peukert)",
  discipline: "elektrik",
  standards: [],
  inputSchema: akuPeukertBosalmaSuresiInputSchema,
  compute,
};
