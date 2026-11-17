import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 §8.1.5: ρw ≥ 0,3·fctd/fywd. fctd = 0,35√fck/γc (γc = 1,5), fywd = fywk/γs (γs = 1,15). s ≤ Asw/(ρw,min·b).
export const kesmeDonatisiMinimumOraniInputSchema = z.object({
  fck_MPa: z.number().positive(),
  fywk_MPa: z.number().positive(),
  b_mm: z.number().positive(),
  etriyeCapi_mm: z.number().positive(),
  kolSayisi: z.number().int().min(1),
});

export type KesmeDonatisiMinimumOraniInput = z.infer<typeof kesmeDonatisiMinimumOraniInputSchema>;

export interface KesmeDonatisiMinimumOraniOutput {
  roMin: number;
}

function compute(input: KesmeDonatisiMinimumOraniInput): CalcResult<KesmeDonatisiMinimumOraniOutput> {
  const fctd = (0.35 * Math.sqrt(input.fck_MPa)) / 1.5;
  const fywd = input.fywk_MPa / 1.15;
  const roMin = (0.3 * fctd) / fywd;
  const Asw = input.kolSayisi * ((Math.PI * input.etriyeCapi_mm * input.etriyeCapi_mm) / 4);
  return {
    value: { roMin },
    intermediates: { fctd_MPa: fctd, fywd_MPa: fywd, Asw_mm2: Asw, s_maks_mm: Asw / (roMin * input.b_mm) },
    standardsUsed: ["TS 500 §8.1.5"],
  };
}

export const kesmeDonatisiMinimumOrani: CalcModule<KesmeDonatisiMinimumOraniInput, KesmeDonatisiMinimumOraniOutput> = {
  id: "kesme-donatisi-minimum-orani",
  title: "Kesme Donatısı (Etriye) Minimum Oranı ve Azami Aralık",
  discipline: "insaat",
  standards: ["TS 500 §8.1.5"],
  inputSchema: kesmeDonatisiMinimumOraniInputSchema,
  compute,
};
