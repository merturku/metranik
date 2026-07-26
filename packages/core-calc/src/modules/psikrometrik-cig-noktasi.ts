import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Magnus-Tetens yaklaşımıyla çiy noktası sıcaklığı:
// α = ln(RH/100) + a×T/(b+T), Td = b×α / (a-α).
// T: kuru termometre sıcaklığı (°C), RH: bağıl nem (%), a=17.27, b=237.7°C
// (su üzerinde, -45°C..+60°C aralığında geçerli standart Magnus katsayıları).
const MAGNUS_A = 17.27;
const MAGNUS_B_C = 237.7;

export const psikrometrikCigNoktasiInputSchema = z.object({
  kuruTermometreSicakligi_T_C: z.number(),
  bagilNem_RH_yuzde: z.number().positive().max(100),
});

export type PsikrometrikCigNoktasiInput = z.infer<
  typeof psikrometrikCigNoktasiInputSchema
>;

export interface PsikrometrikCigNoktasiOutput {
  cigNoktasi_Td_C: number;
}

function compute(
  input: PsikrometrikCigNoktasiInput,
): CalcResult<PsikrometrikCigNoktasiOutput> {
  const alpha =
    Math.log(input.bagilNem_RH_yuzde / 100) +
    (MAGNUS_A * input.kuruTermometreSicakligi_T_C) / (MAGNUS_B_C + input.kuruTermometreSicakligi_T_C);
  const cigNoktasi_Td_C = (MAGNUS_B_C * alpha) / (MAGNUS_A - alpha);

  return {
    value: { cigNoktasi_Td_C },
    intermediates: {
      bagilNem_RH_yuzde: input.bagilNem_RH_yuzde,
    },
    standardsUsed: ["Magnus-Tetens Yaklaşımı"],
  };
}

export const psikrometrikCigNoktasi: CalcModule<
  PsikrometrikCigNoktasiInput,
  PsikrometrikCigNoktasiOutput
> = {
  id: "psikrometrik-cig-noktasi",
  title: "Psikrometrik Çiy Noktası Sıcaklığı",
  discipline: "mekanik",
  standards: ["Magnus-Tetens Yaklaşımı"],
  inputSchema: psikrometrikCigNoktasiInputSchema,
  compute,
};
