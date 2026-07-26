import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1090-2 / AWS D1.1: ön germe kuvveti Fp = 0.7·As·fub,
// sıkma momenti M = k·d·Fp (k: sürtünme/tork katsayısı).
export const celikBulonSikmaMomentiInputSchema = z.object({
  bulonCapi_mm: z.number().positive(),
  gerilmeAlani_mm2: z.number().positive(),
  nihaiCekmeDayanimi_fub_MPa: z.number().positive(),
  torkKatsayisi_k: z.number().positive(),
});

export type CelikBulonSikmaMomentiInput = z.infer<
  typeof celikBulonSikmaMomentiInputSchema
>;

export interface CelikBulonSikmaMomentiOutput {
  sikmaMomenti_Nm: number;
}

function compute(
  input: CelikBulonSikmaMomentiInput,
): CalcResult<CelikBulonSikmaMomentiOutput> {
  const onGermeKuvvetiN =
    0.7 * input.gerilmeAlani_mm2 * input.nihaiCekmeDayanimi_fub_MPa;
  const sikmaMomentiNmm = input.torkKatsayisi_k * input.bulonCapi_mm * onGermeKuvvetiN;

  return {
    value: { sikmaMomenti_Nm: sikmaMomentiNmm / 1000 },
    intermediates: {
      onGermeKuvveti_kN: onGermeKuvvetiN / 1000,
    },
    standardsUsed: ["TS EN 1090-2", "AWS D1.1"],
  };
}

export const celikBulonSikmaMomenti: CalcModule<
  CelikBulonSikmaMomentiInput,
  CelikBulonSikmaMomentiOutput
> = {
  id: "celik-bulon-sikma-momenti",
  title: "Çelik Yapı Bulon Sıkma Momenti",
  discipline: "insaat",
  standards: ["TS EN 1090-2", "AWS D1.1"],
  inputSchema: celikBulonSikmaMomentiInputSchema,
  compute,
};
