import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Klasik mukavemet ilişkisi: eksenel yük altındaki bir elemanın elastik
// kısalması δ=PL/(A×E) (Hooke yasası). Kazık Taşıma Kapasitesi (Statik) ve
// Kazık Grubu Verimliliği modülleri kazığın taşıyabileceği yükü değerlendirir;
// bu modül o yük altında kazığın kendisinin ne kadar kısalacağını (oturmanın
// bir bileşeni) hesaplar.
export const kazikElastikKisalmasiInputSchema = z.object({
  eksenelYuk_P_N: z.number().positive(),
  kazikBoyu_L_mm: z.number().positive(),
  kesitAlani_A_mm2: z.number().positive(),
  elastisiteModulu_E_MPa: z.number().positive(),
});

export type KazikElastikKisalmasiInput = z.infer<
  typeof kazikElastikKisalmasiInputSchema
>;

export interface KazikElastikKisalmasiOutput {
  elastikKisalma_delta_mm: number;
}

function compute(
  input: KazikElastikKisalmasiInput,
): CalcResult<KazikElastikKisalmasiOutput> {
  const elastikKisalmaDeltaMm =
    (input.eksenelYuk_P_N * input.kazikBoyu_L_mm) /
    (input.kesitAlani_A_mm2 * input.elastisiteModulu_E_MPa);

  const eksenelRijitlikNmm =
    (input.kesitAlani_A_mm2 * input.elastisiteModulu_E_MPa) / input.kazikBoyu_L_mm;

  return {
    value: { elastikKisalma_delta_mm: elastikKisalmaDeltaMm },
    intermediates: {
      eksenelRijitlik_Nmm: eksenelRijitlikNmm,
    },
    standardsUsed: [],
  };
}

export const kazikElastikKisalmasi: CalcModule<
  KazikElastikKisalmasiInput,
  KazikElastikKisalmasiOutput
> = {
  id: "kazik-elastik-kisalmasi",
  title: "Kazık Elastik Kısalması",
  discipline: "insaat",
  standards: [],
  inputSchema: kazikElastikKisalmasiInputSchema,
  compute,
};
