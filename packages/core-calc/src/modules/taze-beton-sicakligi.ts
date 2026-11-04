import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Taze beton sıcaklığı (ACI 305R / ACI 306R ısı dengesi):
// T = [0,22·(Ta·Wa + Tc·Wc) + Tw·Ww + Ta·Wwa] / [0,22·(Wa + Wc) + Ww + Wwa]
// Wa kuru agrega, Wc çimento, Ww karışım suyu, Wwa agreganın serbest nemi (kg/m³);
// 0,22 = kuru malzeme / su özgül ısı oranı. Buz, karıştırma ısısı ve çevre ısı alışverişi yok.
export const tazeBetonSicakligiInputSchema = z.object({
  agrega_kg: z.number().positive(),
  cimento_kg: z.number().positive(),
  karisimSuyu_kg: z.number().positive(),
  agregaNemi_kg: z.number().min(0),
  agregaSicakligi_C: z.number(),
  cimentoSicakligi_C: z.number(),
  suSicakligi_C: z.number(),
});

export type TazeBetonSicakligiInput = z.infer<typeof tazeBetonSicakligiInputSchema>;

export interface TazeBetonSicakligiOutput {
  betonSicakligi_C: number;
}

function compute(input: TazeBetonSicakligiInput): CalcResult<TazeBetonSicakligiOutput> {
  const k = 0.22;
  const pay =
    k * (input.agregaSicakligi_C * input.agrega_kg + input.cimentoSicakligi_C * input.cimento_kg) +
    input.suSicakligi_C * input.karisimSuyu_kg +
    input.agregaSicakligi_C * input.agregaNemi_kg;
  const payda = k * (input.agrega_kg + input.cimento_kg) + input.karisimSuyu_kg + input.agregaNemi_kg;
  const t = pay / payda;
  return {
    value: { betonSicakligi_C: t },
    intermediates: {
      isil_pay: pay,
      isil_payda: payda,
      toplam_kutle_kg: input.agrega_kg + input.cimento_kg + input.karisimSuyu_kg + input.agregaNemi_kg,
      su_cimento_orani: (input.karisimSuyu_kg + input.agregaNemi_kg) / input.cimento_kg,
    },
    standardsUsed: ["ACI 305R / ACI 306R (ısı dengesi)"],
  };
}

export const tazeBetonSicakligi: CalcModule<TazeBetonSicakligiInput, TazeBetonSicakligiOutput> = {
  id: "taze-beton-sicakligi",
  title: "Taze Beton Sıcaklığı",
  discipline: "insaat",
  standards: ["ACI 305R", "ACI 306R"],
  inputSchema: tazeBetonSicakligiInputSchema,
  compute,
};
