import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basitleştirilmiş kısa devre akımı: Isc = (S/(√3·U)) × (100/Z%). Transformatör
// empedans yüzdesi (Z%) etiket değeridir; mühendis girdisidir, tablo gerekmez.
export const kisaDevreAkimiInputSchema = z.object({
  transformatorGucu_kVA: z.number().positive(),
  gerilim_V: z.number().positive(),
  empedansYuzdesi: z.number().positive(),
});

export type KisaDevreAkimiInput = z.infer<typeof kisaDevreAkimiInputSchema>;

export interface KisaDevreAkimiOutput {
  kisaDevreAkimi_kA: number;
}

function compute(input: KisaDevreAkimiInput): CalcResult<KisaDevreAkimiOutput> {
  const nominalAkimA =
    (input.transformatorGucu_kVA * 1000) / (Math.sqrt(3) * input.gerilim_V);
  const kisaDevreAkimiA = nominalAkimA * (100 / input.empedansYuzdesi);

  return {
    value: { kisaDevreAkimi_kA: kisaDevreAkimiA / 1000 },
    intermediates: {
      nominalAkim_A: nominalAkimA,
    },
    standardsUsed: [],
  };
}

export const kisaDevreAkimi: CalcModule<KisaDevreAkimiInput, KisaDevreAkimiOutput> = {
  id: "kisa-devre-akimi",
  title: "Kısa Devre Akımı",
  discipline: "elektrik",
  standards: [],
  inputSchema: kisaDevreAkimiInputSchema,
  compute,
};
