import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rüzgar kuvveti: Fw = qp × Cf × A (qp: tepe hız basıncı, Cf: kuvvet katsayısı,
// A: etkili yüzey alanı).
export const aydinlatmaDiregiRuzgarYukuInputSchema = z.object({
  tepeHizBasinci_qp_Pa: z.number().positive(),
  kuvvetKatsayisi_Cf: z.number().positive(),
  etkiliYuzeyAlani_A_m2: z.number().positive(),
});

export type AydinlatmaDiregiRuzgarYukuInput = z.infer<
  typeof aydinlatmaDiregiRuzgarYukuInputSchema
>;

export interface AydinlatmaDiregiRuzgarYukuOutput {
  ruzgarKuvveti_N: number;
}

function compute(
  input: AydinlatmaDiregiRuzgarYukuInput,
): CalcResult<AydinlatmaDiregiRuzgarYukuOutput> {
  const ruzgarKuvvetiN =
    input.tepeHizBasinci_qp_Pa * input.kuvvetKatsayisi_Cf * input.etkiliYuzeyAlani_A_m2;

  return {
    value: { ruzgarKuvveti_N: ruzgarKuvvetiN },
    intermediates: {
      kuvvetKatsayisi_Cf: input.kuvvetKatsayisi_Cf,
    },
    standardsUsed: ["TS EN 1991-1-4"],
  };
}

export const aydinlatmaDiregiRuzgarYuku: CalcModule<
  AydinlatmaDiregiRuzgarYukuInput,
  AydinlatmaDiregiRuzgarYukuOutput
> = {
  id: "aydinlatma-diregi-ruzgar-yuku",
  title: "Aydınlatma Direği Rüzgar Yükü",
  discipline: "elektrik",
  standards: ["TS EN 1991-1-4"],
  inputSchema: aydinlatmaDiregiRuzgarYukuInputSchema,
  compute,
};
