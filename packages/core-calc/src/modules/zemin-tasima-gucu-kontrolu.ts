import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Temel altında uygulanan gerilme, zeminin emniyetli taşıma gücünü aşmamalı:
// q_uygulanan ≤ q_emniyet. Zemin emniyet gerilmesi geoteknik rapordan alınır;
// bu modülde gömülü değildir.
export const zeminTasimaGucuKontroluInputSchema = z.object({
  uygulananGerilme_kPa: z.number().positive(),
  zeminEmniyetGerilmesi_kPa: z.number().positive(),
});

export type ZeminTasimaGucuKontroluInput = z.infer<
  typeof zeminTasimaGucuKontroluInputSchema
>;

export interface ZeminTasimaGucuKontroluOutput {
  marj_kPa: number;
}

function compute(
  input: ZeminTasimaGucuKontroluInput,
): CalcResult<ZeminTasimaGucuKontroluOutput> {
  const marjKPa = input.zeminEmniyetGerilmesi_kPa - input.uygulananGerilme_kPa;
  const uygun = marjKPa >= 0;

  return {
    value: { marj_kPa: marjKPa },
    intermediates: {
      uygulananGerilme_kPa: input.uygulananGerilme_kPa,
      zeminEmniyetGerilmesi_kPa: input.zeminEmniyetGerilmesi_kPa,
    },
    standardsUsed: [],
    verdict: uygun
      ? { status: "uygun", note: "Uygulanan gerilme zemin emniyet gerilmesinin altında." }
      : { status: "uygunsuz", note: "Uygulanan gerilme zemin emniyet gerilmesini aşıyor." },
  };
}

export const zeminTasimaGucuKontrolu: CalcModule<
  ZeminTasimaGucuKontroluInput,
  ZeminTasimaGucuKontroluOutput
> = {
  id: "zemin-tasima-gucu-kontrolu",
  title: "Zemin Taşıma Gücü Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminTasimaGucuKontroluInputSchema,
  compute,
};
