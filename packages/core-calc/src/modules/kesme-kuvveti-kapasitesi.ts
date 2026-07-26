import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 (basitleştirilmiş): betonun donatısız kesme katkısı
// Vc = 0.35·√fck·bw·d.
export const kesmeKuvvetiKapasitesiInputSchema = z.object({
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  kesitGenisligi_bw_mm: z.number().positive(),
  faydaliYukseklik_d_mm: z.number().positive(),
});

export type KesmeKuvvetiKapasitesiInput = z.infer<
  typeof kesmeKuvvetiKapasitesiInputSchema
>;

export interface KesmeKuvvetiKapasitesiOutput {
  kesmeKapasitesi_kN: number;
}

function compute(
  input: KesmeKuvvetiKapasitesiInput,
): CalcResult<KesmeKuvvetiKapasitesiOutput> {
  const kesmeKapasitesiN =
    0.35 *
    Math.sqrt(input.betonKarakteristikDayanim_fck_MPa) *
    input.kesitGenisligi_bw_mm *
    input.faydaliYukseklik_d_mm;

  return {
    value: { kesmeKapasitesi_kN: kesmeKapasitesiN / 1000 },
    intermediates: {
      kesmeKapasitesi_N: kesmeKapasitesiN,
    },
    standardsUsed: ["TS 500"],
  };
}

export const kesmeKuvvetiKapasitesi: CalcModule<
  KesmeKuvvetiKapasitesiInput,
  KesmeKuvvetiKapasitesiOutput
> = {
  id: "kesme-kuvveti-kapasitesi",
  title: "Kesme Kuvveti Kapasitesi (Beton)",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: kesmeKuvvetiKapasitesiInputSchema,
  compute,
};
