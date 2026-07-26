import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit eksenel gerilme kontrolü: σ = N/A, izin verilen basınç gerilmesiyle
// karşılaştırılır.
export const yigmaDuvarGerilmeKontroluInputSchema = z.object({
  eksenelYuk_N_kN: z.number().positive(),
  duvarKesitAlani_A_m2: z.number().positive(),
  izinVerilenBasincGerilmesi_MPa: z.number().positive(),
});

export type YigmaDuvarGerilmeKontroluInput = z.infer<
  typeof yigmaDuvarGerilmeKontroluInputSchema
>;

export interface YigmaDuvarGerilmeKontroluOutput {
  olusanGerilme_MPa: number;
}

function compute(
  input: YigmaDuvarGerilmeKontroluInput,
): CalcResult<YigmaDuvarGerilmeKontroluOutput> {
  const yukN = input.eksenelYuk_N_kN * 1000;
  const alanMm2 = input.duvarKesitAlani_A_m2 * 1e6;
  const olusanGerilmeMPa = yukN / alanMm2;
  const marjMPa = input.izinVerilenBasincGerilmesi_MPa - olusanGerilmeMPa;
  const uygun = marjMPa >= 0;

  return {
    value: { olusanGerilme_MPa: olusanGerilmeMPa },
    intermediates: {
      izinVerilenBasincGerilmesi_MPa: input.izinVerilenBasincGerilmesi_MPa,
      marj_MPa: marjMPa,
    },
    standardsUsed: [],
    verdict: uygun
      ? { status: "uygun", note: "Oluşan gerilme izin verilen sınırın altında." }
      : { status: "uygunsuz", note: "Oluşan gerilme izin verilen sınırı aşıyor." },
  };
}

export const yigmaDuvarGerilmeKontrolu: CalcModule<
  YigmaDuvarGerilmeKontroluInput,
  YigmaDuvarGerilmeKontroluOutput
> = {
  id: "yigma-duvar-gerilme-kontrolu",
  title: "Yığma Duvar Gerilme Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: yigmaDuvarGerilmeKontroluInputSchema,
  compute,
};
