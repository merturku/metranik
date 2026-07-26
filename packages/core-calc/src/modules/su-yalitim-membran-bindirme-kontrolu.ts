import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// DIN 18533: su yalıtım membranlarında asgari bindirme mesafesi yüzey eğimine
// göre değişir (yatay yüzeyde ≥10 cm, eğimli yüzeyde ≥15 cm).
const YATAY_MINIMUM_CM = 10;
const EGIMLI_MINIMUM_CM = 15;

export const suYalitimMembranBindirmeKontroluInputSchema = z.object({
  olculenBindirme_cm: z.number().positive(),
  yuzeyTipi: z.enum(["yatay", "egimli"]),
});

export type SuYalitimMembranBindirmeKontroluInput = z.infer<
  typeof suYalitimMembranBindirmeKontroluInputSchema
>;

export interface SuYalitimMembranBindirmeKontroluOutput {
  marj_cm: number;
}

function compute(
  input: SuYalitimMembranBindirmeKontroluInput,
): CalcResult<SuYalitimMembranBindirmeKontroluOutput> {
  const minimumCm = input.yuzeyTipi === "yatay" ? YATAY_MINIMUM_CM : EGIMLI_MINIMUM_CM;
  const marjCm = input.olculenBindirme_cm - minimumCm;
  const uygun = marjCm >= 0;

  return {
    value: { marj_cm: marjCm },
    intermediates: {
      asgariBindirme_cm: minimumCm,
    },
    standardsUsed: ["DIN 18533"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen bindirme asgari değerin üzerinde." }
      : { status: "uygunsuz", note: "Ölçülen bindirme asgari değerin altında." },
  };
}

export const suYalitimMembranBindirmeKontrolu: CalcModule<
  SuYalitimMembranBindirmeKontroluInput,
  SuYalitimMembranBindirmeKontroluOutput
> = {
  id: "su-yalitim-membran-bindirme-kontrolu",
  title: "Su Yalıtımı Membran Bindirme Kontrolü",
  discipline: "insaat",
  standards: ["DIN 18533"],
  inputSchema: suYalitimMembranBindirmeKontroluInputSchema,
  compute,
};
