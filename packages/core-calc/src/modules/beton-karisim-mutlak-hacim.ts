import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mutlak hacim yöntemi: 1 m³ = Vc + Vsu + Vhava + Vagrega; Vi = mi/(ρi·1000).
// Agrega kütlesi = Vagrega·ρagrega·1000 (yoğunluklar t/m³ = bağıl yoğunluk, kuru yüzey doygun).
export const betonKarisimMutlakHacimInputSchema = z
  .object({
    cimento_kg: z.number().positive(),
    su_kg: z.number().positive(),
    cimentoYogunlugu: z.number().positive(),
    agregaYogunlugu: z.number().positive(),
    havaYuzdesi: z.number().min(0).max(15),
  })
  .refine((v) => v.cimento_kg / (v.cimentoYogunlugu * 1000) + v.su_kg / 1000 + v.havaYuzdesi / 100 < 1, {
    message: "Çimento + su + hava hacmi 1 m³'ü aşıyor",
  });

export type BetonKarisimMutlakHacimInput = z.infer<typeof betonKarisimMutlakHacimInputSchema>;

export interface BetonKarisimMutlakHacimOutput {
  agrega_kg: number;
}

function compute(input: BetonKarisimMutlakHacimInput): CalcResult<BetonKarisimMutlakHacimOutput> {
  const vc = input.cimento_kg / (input.cimentoYogunlugu * 1000);
  const vw = input.su_kg / 1000;
  const va = input.havaYuzdesi / 100;
  const vAgrega = 1 - vc - vw - va;
  const agrega = vAgrega * input.agregaYogunlugu * 1000;
  return {
    value: { agrega_kg: agrega },
    intermediates: {
      cimento_hacmi_m3: vc,
      su_hacmi_m3: vw,
      hava_hacmi_m3: va,
      agrega_hacmi_m3: vAgrega,
      birim_agirlik_kgm3: input.cimento_kg + input.su_kg + agrega,
      su_cimento_orani: input.su_kg / input.cimento_kg,
    },
    standardsUsed: ["ACI 211.1 (mutlak hacim yöntemi)"],
  };
}

export const betonKarisimMutlakHacim: CalcModule<BetonKarisimMutlakHacimInput, BetonKarisimMutlakHacimOutput> = {
  id: "beton-karisim-mutlak-hacim",
  title: "Beton Karışımı Mutlak Hacim Yöntemi",
  discipline: "insaat",
  standards: ["ACI 211.1"],
  inputSchema: betonKarisimMutlakHacimInputSchema,
  compute,
};
