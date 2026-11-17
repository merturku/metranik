import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ACI 318-19 §26.4.3: s biliniyorsa iki denklemin büyüğü; bilinmiyorsa Tablo 26.4.3.1 (SI).
export const betonHedefOrtalamaDayanimInputSchema = z.object({
  fc_MPa: z.number().positive(),
  veri: z.enum(["var", "yok"]),
  s_MPa: z.number().min(0),
});

export type BetonHedefOrtalamaDayanimInput = z.infer<typeof betonHedefOrtalamaDayanimInputSchema>;

export interface BetonHedefOrtalamaDayanimOutput {
  hedefDayanim_MPa: number;
}

function compute(input: BetonHedefOrtalamaDayanimInput): CalcResult<BetonHedefOrtalamaDayanimOutput> {
  const fc = input.fc_MPa;
  if (input.veri === "yok") {
    const hedef = fc < 21 ? fc + 7 : fc <= 35 ? fc + 8.5 : 1.1 * fc + 5;
    return {
      value: { hedefDayanim_MPa: hedef },
      intermediates: { yontem: "Veri yok: ACI Tablo 26.4.3.1", denklem_1_MPa: "—", denklem_2_MPa: "—" },
      standardsUsed: ["ACI 318-19 §26.4.3"],
    };
  }
  const e1 = fc + 1.34 * input.s_MPa;
  const e2 = fc <= 35 ? fc + 2.33 * input.s_MPa - 3.5 : 0.9 * fc + 2.33 * input.s_MPa;
  return {
    value: { hedefDayanim_MPa: Math.max(e1, e2) },
    intermediates: { yontem: "Standart sapma biliniyor: iki denklemin büyüğü", denklem_1_MPa: e1, denklem_2_MPa: e2 },
    standardsUsed: ["ACI 318-19 §26.4.3"],
  };
}

export const betonHedefOrtalamaDayanim: CalcModule<BetonHedefOrtalamaDayanimInput, BetonHedefOrtalamaDayanimOutput> = {
  id: "beton-hedef-ortalama-dayanim",
  title: "Beton Hedef Ortalama Dayanımı (Karışım Tasarımı)",
  discipline: "insaat",
  standards: ["ACI 318-19 §26.4.3"],
  inputSchema: betonHedefOrtalamaDayanimInputSchema,
  compute,
};
