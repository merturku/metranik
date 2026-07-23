import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Saha ölçüm kontrolü: ölçülen debi, tasarımda hesaplanan gerekli debiyi
// karşılamalı: Völçülen ≥ Vgerekli. Gerekli debi ayrı bir tasarım modülünden
// (örn. Taze Hava Debisi) gelir; bu modül yalnız karşılaştırmayı yapar.
export const havalandirmaDebiKontroluInputSchema = z.object({
  olculenDebi_L_s: z.number().positive(),
  gerekliDebi_L_s: z.number().positive(),
});

export type HavalandirmaDebiKontroluInput = z.infer<
  typeof havalandirmaDebiKontroluInputSchema
>;

export interface HavalandirmaDebiKontroluOutput {
  marj_L_s: number;
}

function compute(
  input: HavalandirmaDebiKontroluInput,
): CalcResult<HavalandirmaDebiKontroluOutput> {
  const marjLS = input.olculenDebi_L_s - input.gerekliDebi_L_s;
  const uygun = marjLS >= 0;

  return {
    value: { marj_L_s: marjLS },
    intermediates: {
      olculenDebi_L_s: input.olculenDebi_L_s,
      gerekliDebi_L_s: input.gerekliDebi_L_s,
    },
    standardsUsed: [],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen debi gerekli debiyi karşılıyor." }
      : { status: "uygunsuz", note: "Ölçülen debi gerekli debinin altında." },
  };
}

export const havalandirmaDebiKontrolu: CalcModule<
  HavalandirmaDebiKontroluInput,
  HavalandirmaDebiKontroluOutput
> = {
  id: "havalandirma-debi-kontrolu",
  title: "Havalandırma Debi Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: havalandirmaDebiKontroluInputSchema,
  compute,
};
