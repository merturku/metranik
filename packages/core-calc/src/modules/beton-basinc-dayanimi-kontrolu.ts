import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit kabul kriteri: ölçülen (düzeltilmiş) karot basınç dayanımı, tasarım
// karakteristik dayanımını (f'ck) karşılamalı. TS 500/TS EN 13791'in karot
// çap-boy oranı, delme yönü, nem durumu gibi düzeltme faktörleri bu modülde
// GÖMÜLÜ DEĞİLDİR — ölçülen değer bu düzeltmeler uygulandıktan sonra girilmelidir.
export const betonBasincDayanimiKontroluInputSchema = z.object({
  olculenDayanim_MPa: z.number().positive(),
  karakteristikDayanim_fck_MPa: z.number().positive(),
});

export type BetonBasincDayanimiKontroluInput = z.infer<
  typeof betonBasincDayanimiKontroluInputSchema
>;

export interface BetonBasincDayanimiKontroluOutput {
  marj_MPa: number;
}

function compute(
  input: BetonBasincDayanimiKontroluInput,
): CalcResult<BetonBasincDayanimiKontroluOutput> {
  const marjMPa = input.olculenDayanim_MPa - input.karakteristikDayanim_fck_MPa;
  const uygun = marjMPa >= 0;

  return {
    value: { marj_MPa: marjMPa },
    intermediates: {
      olculenDayanim_MPa: input.olculenDayanim_MPa,
      karakteristikDayanim_fck_MPa: input.karakteristikDayanim_fck_MPa,
    },
    standardsUsed: ["TS 500", "TS EN 13791"],
    verdict: uygun
      ? { status: "uygun", note: "Ölçülen dayanım karakteristik dayanımı karşılıyor." }
      : { status: "uygunsuz", note: "Ölçülen dayanım karakteristik dayanımın altında." },
  };
}

export const betonBasincDayanimiKontrolu: CalcModule<
  BetonBasincDayanimiKontroluInput,
  BetonBasincDayanimiKontroluOutput
> = {
  id: "beton-basinc-dayanimi-kontrolu",
  title: "Beton Basınç Dayanımı Kontrolü",
  discipline: "insaat",
  standards: ["TS 500", "TS EN 13791"],
  inputSchema: betonBasincDayanimiKontroluInputSchema,
  compute,
};
