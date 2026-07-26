import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Devre akımı: I = P / (V × cosφ). Sigorta anma akımını aşmamalı.
export const evTesisatiSigortaYukuKontroluInputSchema = z.object({
  toplamGuc_W: z.number().positive(),
  gerilim_V: z.number().positive(),
  gucFaktoru_cosfi: z.number().positive().max(1),
  sigortaAnmaAkimi_A: z.number().positive(),
});

export type EvTesisatiSigortaYukuKontroluInput = z.infer<
  typeof evTesisatiSigortaYukuKontroluInputSchema
>;

export interface EvTesisatiSigortaYukuKontroluOutput {
  akim_A: number;
}

function compute(
  input: EvTesisatiSigortaYukuKontroluInput,
): CalcResult<EvTesisatiSigortaYukuKontroluOutput> {
  const akimA = input.toplamGuc_W / (input.gerilim_V * input.gucFaktoru_cosfi);
  const marjA = input.sigortaAnmaAkimi_A - akimA;
  const uygun = marjA >= 0;

  return {
    value: { akim_A: akimA },
    intermediates: {
      sigortaAnmaAkimi_A: input.sigortaAnmaAkimi_A,
      marj_A: marjA,
    },
    standardsUsed: ["IEC 60364"],
    verdict: uygun
      ? { status: "uygun", note: "Yük akımı sigorta anma akımının altında." }
      : { status: "uygunsuz", note: "Yük akımı sigorta anma akımını aşıyor." },
  };
}

export const evTesisatiSigortaYukuKontrolu: CalcModule<
  EvTesisatiSigortaYukuKontroluInput,
  EvTesisatiSigortaYukuKontroluOutput
> = {
  id: "ev-tesisati-sigorta-yuku-kontrolu",
  title: "Ev Tesisatı Sigorta Yükü Kontrolü",
  discipline: "ev",
  standards: ["IEC 60364"],
  inputSchema: evTesisatiSigortaYukuKontroluInputSchema,
  compute,
};
