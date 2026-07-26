import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kaba ön boyutlandırma kuralı: eksenel yükü karşılamak için gerekli brüt
// kesit alanı Ac = N / (0.4·fck). Kesin tasarım donatı etkisini de içermelidir.
export const kolonOnBoyutlandirmaInputSchema = z.object({
  eksenelYuk_N_kN: z.number().positive(),
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
});

export type KolonOnBoyutlandirmaInput = z.infer<typeof kolonOnBoyutlandirmaInputSchema>;

export interface KolonOnBoyutlandirmaOutput {
  gerekliKesitAlani_cm2: number;
}

function compute(
  input: KolonOnBoyutlandirmaInput,
): CalcResult<KolonOnBoyutlandirmaOutput> {
  const eksenelYukN = input.eksenelYuk_N_kN * 1000;
  const gerekliKesitAlaniMm2 = eksenelYukN / (0.4 * input.betonKarakteristikDayanim_fck_MPa);

  return {
    value: { gerekliKesitAlani_cm2: gerekliKesitAlaniMm2 / 100 },
    intermediates: {
      onerilenKareKenar_mm: Math.sqrt(gerekliKesitAlaniMm2),
    },
    standardsUsed: [],
  };
}

export const kolonOnBoyutlandirma: CalcModule<
  KolonOnBoyutlandirmaInput,
  KolonOnBoyutlandirmaOutput
> = {
  id: "kolon-on-boyutlandirma",
  title: "Kolon Ön Boyutlandırma (Eksenel Yük)",
  discipline: "insaat",
  standards: [],
  inputSchema: kolonOnBoyutlandirmaInputSchema,
  compute,
};
