import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Bahçe/çim alanı gübreleme miktarı: alan × birim uygulama oranı.
// Uygulama oranı gübre türüne göre değişir (çim gübresi tipik ~0.03-0.06 kg/m²).
export const bahceGubrelemeMiktariInputSchema = z.object({
  alan_m2: z.number().positive(),
  uygulamaOrani_kg_m2: z.number().positive(),
});

export type BahceGubrelemeMiktariInput = z.infer<
  typeof bahceGubrelemeMiktariInputSchema
>;

export interface BahceGubrelemeMiktariOutput {
  gerekliGubre_kg: number;
}

function compute(
  input: BahceGubrelemeMiktariInput,
): CalcResult<BahceGubrelemeMiktariOutput> {
  const gerekliGubreKg = input.alan_m2 * input.uygulamaOrani_kg_m2;

  return {
    value: { gerekliGubre_kg: gerekliGubreKg },
    intermediates: {
      uygulamaOrani_g_m2: input.uygulamaOrani_kg_m2 * 1000,
    },
    standardsUsed: [],
  };
}

export const bahceGubrelemeMiktari: CalcModule<
  BahceGubrelemeMiktariInput,
  BahceGubrelemeMiktariOutput
> = {
  id: "bahce-gubreleme-miktari",
  title: "Bahçe Gübreleme Miktarı Hesabı",
  discipline: "ev",
  standards: [],
  inputSchema: bahceGubrelemeMiktariInputSchema,
  compute,
};
