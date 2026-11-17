import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Şap malzemesi: V = A·t·(1+fire); çimento = V·dozaj; su = çimento·(s/ç). Dozaj ve s/ç şartname girdisidir.
export const evSapMalzemeMiktariInputSchema = z.object({
  alan_m2: z.number().positive(),
  kalinlik_cm: z.number().positive(),
  cimentoDozaji_kgm3: z.number().positive(),
  firePayi: z.number().min(0),
  suCimentoOrani: z.number().positive(),
});

export type EvSapMalzemeMiktariInput = z.infer<typeof evSapMalzemeMiktariInputSchema>;

export interface EvSapMalzemeMiktariOutput {
  sapHacmi_m3: number;
}

function compute(input: EvSapMalzemeMiktariInput): CalcResult<EvSapMalzemeMiktariOutput> {
  const V = input.alan_m2 * (input.kalinlik_cm / 100) * (1 + input.firePayi);
  const cimento = V * input.cimentoDozaji_kgm3;
  return {
    value: { sapHacmi_m3: V },
    intermediates: {
      cimento_kg: cimento,
      cimento_torba_50kg: Math.ceil(cimento / 50 - 1e-9),
      karisim_suyu_L: cimento * input.suCimentoOrani,
    },
    standardsUsed: [],
  };
}

export const evSapMalzemeMiktari: CalcModule<EvSapMalzemeMiktariInput, EvSapMalzemeMiktariOutput> = {
  id: "ev-sap-malzeme-miktari",
  title: "Şap (Tesviye) Çimento ve Su Miktarı",
  discipline: "ev",
  standards: [],
  inputSchema: evSapMalzemeMiktariInputSchema,
  compute,
};
