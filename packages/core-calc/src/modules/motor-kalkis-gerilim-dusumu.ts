import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Motor kalkışında kablo gerilim düşümü (IEC 60364-5-52 Ek G, üç faz):
// ΔU = √3·I_kalkış·L·(R·cosφ_k + X·sinφ_k),  R,X kablo birim empedansı (Ω/km), L (km).
// Kalkış güç faktörü cosφ_k tipik 0,2–0,5. Kalkışta izin verilen düşüm kullanıcı girdisidir
// (yaygın pratik %10–15; yük ve şebeke şartnamesinden teyit edin).
export const motorKalkisGerilimDusumuInputSchema = z.object({
  hatGerilimi_V: z.number().positive(),
  kalkisAkimi_A: z.number().positive(),
  kabloUzunlugu_m: z.number().positive(),
  direnc_ohmkm: z.number().min(0),
  reaktans_ohmkm: z.number().min(0),
  kalkisCosPhi: z.number().gt(0).max(1),
  izinVerilenYuzde: z.number().positive().max(30),
});

export type MotorKalkisGerilimDusumuInput = z.infer<typeof motorKalkisGerilimDusumuInputSchema>;

export interface MotorKalkisGerilimDusumuOutput {
  gerilimDusumu_V: number;
}

function compute(input: MotorKalkisGerilimDusumuInput): CalcResult<MotorKalkisGerilimDusumuOutput> {
  const sin = Math.sqrt(1 - input.kalkisCosPhi ** 2);
  const lKm = input.kabloUzunlugu_m / 1000;
  const dv = Math.sqrt(3) * input.kalkisAkimi_A * lKm * (input.direnc_ohmkm * input.kalkisCosPhi + input.reaktans_ohmkm * sin);
  const yuzde = (dv / input.hatGerilimi_V) * 100;
  const uygun = yuzde <= input.izinVerilenYuzde;
  return {
    value: { gerilimDusumu_V: dv },
    intermediates: {
      gerilim_dusumu_yuzde: yuzde,
      motor_terminal_gerilimi_V: input.hatGerilimi_V - dv,
      sin_phi: sin,
    },
    standardsUsed: ["IEC 60364-5-52 Ek G"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `Kalkış düşümü %${yuzde.toFixed(2)} ≤ izin verilen %${input.izinVerilenYuzde}.`
        : `Kalkış düşümü %${yuzde.toFixed(2)} > izin verilen %${input.izinVerilenYuzde}; kesiti artırın veya yumuşak yol verme/yıldız-üçgen düşünün.`,
    },
  };
}

export const motorKalkisGerilimDusumu: CalcModule<MotorKalkisGerilimDusumuInput, MotorKalkisGerilimDusumuOutput> = {
  id: "motor-kalkis-gerilim-dusumu",
  title: "Motor Kalkışında Gerilim Düşümü",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: motorKalkisGerilimDusumuInputSchema,
  compute,
};
