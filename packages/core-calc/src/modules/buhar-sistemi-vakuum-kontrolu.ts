import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kondenser vakumu = atmosfer basıncı - kondenser mutlak basıncı. Ölçülen mutlak
// basınç tasarım değerini aşıyorsa vakum yetersizdir (hava kaçağı, boru kirlenmesi,
// yetersiz soğutma suyu). Doyma sıcaklığı su için Antoine denklemiyle bulunur
// (1-100 °C aralığı): log10(P[mmHg]) = 8,07131 - 1730,63 / (233,426 + T).
export const buharSistemiVakuumKontroluSchema = z.object({
  kondenser_basinc_kPa: z.number().positive(),
  tasarim_basinc_kPa: z.number().positive(),
  atmosfer_basinci_kPa: z.number().positive(),
});

export type BuharSistemiVakuumKontroluInput = z.infer<typeof buharSistemiVakuumKontroluSchema>;

export interface BuharSistemiVakuumKontroluOutput {
  vakuum_kPa: number;
  doyma_sicakligi_C: number;
}

const ANTOINE_A = 8.07131;
const ANTOINE_B = 1730.63;
const ANTOINE_C = 233.426;
const MMHG_PER_KPA = 7.50062;

function doymaSicakligiC(mutlakBasincKPa: number): number {
  return ANTOINE_B / (ANTOINE_A - Math.log10(mutlakBasincKPa * MMHG_PER_KPA)) - ANTOINE_C;
}

function compute(
  input: BuharSistemiVakuumKontroluInput,
): CalcResult<BuharSistemiVakuumKontroluOutput> {
  const vakuumKPa = input.atmosfer_basinci_kPa - input.kondenser_basinc_kPa;
  const doymaC = doymaSicakligiC(input.kondenser_basinc_kPa);
  const tasarimDoymaC = doymaSicakligiC(input.tasarim_basinc_kPa);

  return {
    value: { vakuum_kPa: vakuumKPa, doyma_sicakligi_C: doymaC },
    intermediates: {
      tasarim_doyma_sicakligi_C: tasarimDoymaC,
      basinc_farki_kPa: input.kondenser_basinc_kPa - input.tasarim_basinc_kPa,
    },
    standardsUsed: ["ASME PTC 12.2"],
    verdict:
      input.kondenser_basinc_kPa <= input.tasarim_basinc_kPa
        ? {
            status: "uygun",
            note: `Kondenser mutlak basıncı ${input.kondenser_basinc_kPa} kPa ≤ tasarım ${input.tasarim_basinc_kPa} kPa.`,
          }
        : {
            status: "uygunsuz",
            note: `Kondenser mutlak basıncı ${input.kondenser_basinc_kPa} kPa > tasarım ${input.tasarim_basinc_kPa} kPa: vakum yetersiz — hava kaçağı, boru kirlenmesi ve soğutma suyu debisi/sıcaklığı kontrol edilmeli.`,
          },
  };
}

export const buharSistemiVakuumKontrolu: CalcModule<
  BuharSistemiVakuumKontroluInput,
  BuharSistemiVakuumKontroluOutput
> = {
  id: "buhar-sistemi-vakuum-kontrolu",
  title: "Buhar Sistemi Vakuum Kontrolü",
  discipline: "mekanik",
  standards: ["ASME PTC 12.2"],
  inputSchema: buharSistemiVakuumKontroluSchema,
  compute,
};
