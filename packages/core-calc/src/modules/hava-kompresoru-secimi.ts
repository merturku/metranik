import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerekli serbest hava debisi (FAD): toplam tüketim × eşzamanlılık faktörü ×
// güvenlik katsayısı. Eşzamanlılık faktörü, tüm ekipmanın aynı anda çalışmama
// olasılığını yansıtır.
export const havaKompresoruSecimiInputSchema = z.object({
  toplamHavaTuketimi_m3min: z.number().positive(),
  eszamanlilikFaktoru: z.number().positive().max(1),
  guvenlikKatsayisi: z.number().positive(),
});

export type HavaKompresoruSecimiInput = z.infer<typeof havaKompresoruSecimiInputSchema>;

export interface HavaKompresoruSecimiOutput {
  gerekliFAD_m3min: number;
}

function compute(input: HavaKompresoruSecimiInput): CalcResult<HavaKompresoruSecimiOutput> {
  const gerekliFadM3min =
    input.toplamHavaTuketimi_m3min * input.eszamanlilikFaktoru * input.guvenlikKatsayisi;

  return {
    value: { gerekliFAD_m3min: gerekliFadM3min },
    intermediates: {
      eszamanlilikFaktoru: input.eszamanlilikFaktoru,
      guvenlikKatsayisi: input.guvenlikKatsayisi,
    },
    standardsUsed: [],
  };
}

export const havaKompresoruSecimi: CalcModule<
  HavaKompresoruSecimiInput,
  HavaKompresoruSecimiOutput
> = {
  id: "hava-kompresoru-secimi",
  title: "Hava Kompresörü Seçimi (FAD)",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaKompresoruSecimiInputSchema,
  compute,
};
