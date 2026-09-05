import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Bir yangın dolabının etkili menzili, hortum uzunluğu ile ucundaki su
// jetinin ulaşabildiği ek mesafenin toplamıdır. Bu menzil, dolabın kapsaması
// gereken en uzak noktaya (genelde oda/koridor köşegen mesafesi) ulaşmalıdır.
// Yangın Dolabı Debi/Basınç modülünün ürettiği debi/basıncın fiziksel olarak
// alana ulaşıp ulaşmadığının geometrik kontrolüdür.
export const yanginDolabiHortumMenzilKontroluInputSchema = z.object({
  hortumUzunlugu_m: z.number().positive(),
  suJetiMenzili_m: z.number().positive(),
  kapsanmasiGerekenMesafe_m: z.number().positive(),
});

export type YanginDolabiHortumMenzilKontroluInput = z.infer<
  typeof yanginDolabiHortumMenzilKontroluInputSchema
>;

export interface YanginDolabiHortumMenzilKontroluOutput {
  saglananMenzil_m: number;
}

function compute(
  input: YanginDolabiHortumMenzilKontroluInput,
): CalcResult<YanginDolabiHortumMenzilKontroluOutput> {
  const saglananMenzilM = input.hortumUzunlugu_m + input.suJetiMenzili_m;

  return {
    value: { saglananMenzil_m: saglananMenzilM },
    intermediates: {
      kapsanmasiGerekenMesafe_m: input.kapsanmasiGerekenMesafe_m,
    },
    standardsUsed: [],
    verdict:
      saglananMenzilM >= input.kapsanmasiGerekenMesafe_m
        ? { status: "uygun", note: "Sağlanan menzil kapsanması gereken mesafeyi karşılıyor." }
        : { status: "uygunsuz", note: "Sağlanan menzil yetersiz — dolap konumu veya hortum uzunluğu gözden geçirilmeli." },
  };
}

export const yanginDolabiHortumMenzilKontrolu: CalcModule<
  YanginDolabiHortumMenzilKontroluInput,
  YanginDolabiHortumMenzilKontroluOutput
> = {
  id: "yangin-dolabi-hortum-menzil-kontrolu",
  title: "Yangın Dolabı Hortum Menzil Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: yanginDolabiHortumMenzilKontroluInputSchema,
  compute,
};
