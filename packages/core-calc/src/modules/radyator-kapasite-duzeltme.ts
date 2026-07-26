import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 442: radyatör kapasitesi nominal test sıcaklık farkından (genelde 50°C) farklı
// işletme koşulunda üstel olarak değişir: Qgerçek = Qnominal·(ΔTgerçek/ΔTnominal)^n.
const RADYATOR_USTEL_KATSAYI_N = 1.3;

export const radyatorKapasiteDuzeltmeInputSchema = z.object({
  nominalKapasite_Q_W: z.number().positive(),
  nominalSicaklikFarki_dT_C: z.number().positive(),
  gercekSicaklikFarki_dT_C: z.number().positive(),
});

export type RadyatorKapasiteDuzeltmeInput = z.infer<
  typeof radyatorKapasiteDuzeltmeInputSchema
>;

export interface RadyatorKapasiteDuzeltmeOutput {
  duzeltilmisKapasite_W: number;
}

function compute(
  input: RadyatorKapasiteDuzeltmeInput,
): CalcResult<RadyatorKapasiteDuzeltmeOutput> {
  const oran = input.gercekSicaklikFarki_dT_C / input.nominalSicaklikFarki_dT_C;
  const duzeltilmisKapasiteW =
    input.nominalKapasite_Q_W * Math.pow(oran, RADYATOR_USTEL_KATSAYI_N);

  return {
    value: { duzeltilmisKapasite_W: duzeltilmisKapasiteW },
    intermediates: {
      sicaklikOrani: oran,
      ustelKatsayi_n: RADYATOR_USTEL_KATSAYI_N,
    },
    standardsUsed: ["EN 442"],
  };
}

export const radyatorKapasiteDuzeltme: CalcModule<
  RadyatorKapasiteDuzeltmeInput,
  RadyatorKapasiteDuzeltmeOutput
> = {
  id: "radyator-kapasite-duzeltme",
  title: "Radyatör Kapasite Düzeltmesi",
  discipline: "mekanik",
  standards: ["EN 442"],
  inputSchema: radyatorKapasiteDuzeltmeInputSchema,
  compute,
};
