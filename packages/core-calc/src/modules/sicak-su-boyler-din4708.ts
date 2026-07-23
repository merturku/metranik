import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Enerji korunumu ile boyler deposu ihtiyacı: pik talep ile ısıtıcının pik süre
// boyunca karşılayabildiği hacim arasındaki fark. DIN 4708'in "Bedarfskennzahl"
// referans tabloları bu modülde gömülü değildir; pik talep mühendis girdisidir.
export const sicakSuBoylerInputSchema = z.object({
  pikTalep_L: z.number().positive(),
  pikSuresi_saat: z.number().positive(),
  isiticiGucu_kW: z.number().positive(),
  deltaT: z.number().positive(),
});

export type SicakSuBoylerInput = z.infer<typeof sicakSuBoylerInputSchema>;

export interface SicakSuBoylerOutput {
  depoHacmi_L: number;
}

function compute(input: SicakSuBoylerInput): CalcResult<SicakSuBoylerOutput> {
  const recoveryDebiLSaat = (input.isiticiGucu_kW * 860) / input.deltaT;
  const gerekliDepoL = Math.max(
    0,
    input.pikTalep_L - recoveryDebiLSaat * input.pikSuresi_saat,
  );

  return {
    value: { depoHacmi_L: gerekliDepoL },
    intermediates: {
      isiticiRecoveryDebisi_L_saat: recoveryDebiLSaat,
    },
    standardsUsed: [],
  };
}

export const sicakSuBoylerDin4708: CalcModule<SicakSuBoylerInput, SicakSuBoylerOutput> = {
  id: "sicak-su-boyler-din4708",
  title: "Sıcak Su / Boyler",
  discipline: "mekanik",
  standards: [],
  inputSchema: sicakSuBoylerInputSchema,
  compute,
};
