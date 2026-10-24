import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Üç fazlı kompanzasyon kondansatör bataryasının hat akımı:
// Ic = Qc / (√3 × V). Qc: reaktif güç (kVAr), V: hat gerilimi (V).
// Kablo/kesici/kontaktör seçiminde kullanılır.
export const kompanzasyonKondansatorAkimiInputSchema = z.object({
  reaktifGuc_Qc_kVAr: z.number().positive(),
  hatGerilimi_V_V: z.number().positive(),
});

export type KompanzasyonKondansatorAkimiInput = z.infer<
  typeof kompanzasyonKondansatorAkimiInputSchema
>;

export interface KompanzasyonKondansatorAkimiOutput {
  hatAkimi_Ic_A: number;
}

function compute(
  input: KompanzasyonKondansatorAkimiInput,
): CalcResult<KompanzasyonKondansatorAkimiOutput> {
  const reaktifGuc_VAr = input.reaktifGuc_Qc_kVAr * 1000;
  const hatAkimi_Ic_A = reaktifGuc_VAr / (Math.sqrt(3) * input.hatGerilimi_V_V);

  return {
    value: { hatAkimi_Ic_A },
    intermediates: {
      hatGerilimi_V_V: input.hatGerilimi_V_V,
    },
    standardsUsed: [],
  };
}

export const kompanzasyonKondansatorAkimi: CalcModule<
  KompanzasyonKondansatorAkimiInput,
  KompanzasyonKondansatorAkimiOutput
> = {
  id: "kompanzasyon-kondansator-akimi",
  title: "Kompanzasyon Kondansatör Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: kompanzasyonKondansatorAkimiInputSchema,
  compute,
};
