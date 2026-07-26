import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Orifis/Bernoulli denklemi: açık kapı(lar)dan kaçan hava debisi
// Q = Cd·A·√(2ΔP/ρ)·n (n: aynı anda açık kabul edilen kapı sayısı).
const HAVA_YOGUNLUGU_KG_M3 = 1.2;

export const merdivenBasinclandirmaFaniDebisiInputSchema = z.object({
  kapiKacakAlani_A_m2: z.number().positive(),
  basinclandirmaBasinci_dP_Pa: z.number().positive(),
  debiKatsayisi_Cd: z.number().positive().max(1),
  acikKapiSayisi_n: z.number().positive(),
});

export type MerdivenBasinclandirmaFaniDebisiInput = z.infer<
  typeof merdivenBasinclandirmaFaniDebisiInputSchema
>;

export interface MerdivenBasinclandirmaFaniDebisiOutput {
  gerekliDebi_m3h: number;
}

function compute(
  input: MerdivenBasinclandirmaFaniDebisiInput,
): CalcResult<MerdivenBasinclandirmaFaniDebisiOutput> {
  const terminalHizMs = Math.sqrt(
    (2 * input.basinclandirmaBasinci_dP_Pa) / HAVA_YOGUNLUGU_KG_M3,
  );
  const debiM3s =
    input.debiKatsayisi_Cd * input.kapiKacakAlani_A_m2 * terminalHizMs * input.acikKapiSayisi_n;

  return {
    value: { gerekliDebi_m3h: debiM3s * 3600 },
    intermediates: {
      terminalHiz_ms: terminalHizMs,
    },
    standardsUsed: ["NFPA 92"],
  };
}

export const merdivenBasinclandirmaFaniDebisi: CalcModule<
  MerdivenBasinclandirmaFaniDebisiInput,
  MerdivenBasinclandirmaFaniDebisiOutput
> = {
  id: "merdiven-basinclandirma-fani-debisi",
  title: "Merdiven Basınçlandırma Fanı Debisi",
  discipline: "mekanik",
  standards: ["NFPA 92"],
  inputSchema: merdivenBasinclandirmaFaniDebisiInputSchema,
  compute,
};
