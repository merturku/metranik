import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kapalı genleşme tankı hacmi: Vt = Vs·e / (1 − Pa/Pf). Suyun genleşme oranı (e)
// sıcaklık farkına bağlıdır; tablo yerine mühendisin girdiği değer olarak alınır.
export const genlesmeTankiInputSchema = z.object({
  sistemSuHacmi_L: z.number().positive(),
  genlesmeOrani: z.number().positive(),
  ilkBasinc_bar: z.number().positive(),
  sonBasinc_bar: z.number().positive(),
});

export type GenlesmeTankiInput = z.infer<typeof genlesmeTankiInputSchema>;

export interface GenlesmeTankiOutput {
  tankHacmi_L: number;
}

function compute(input: GenlesmeTankiInput): CalcResult<GenlesmeTankiOutput> {
  const basincOrani = input.ilkBasinc_bar / input.sonBasinc_bar;
  const tankHacmiL = (input.sistemSuHacmi_L * input.genlesmeOrani) / (1 - basincOrani);

  return {
    value: { tankHacmi_L: tankHacmiL },
    intermediates: {
      basincOrani_Pa_Pf: basincOrani,
    },
    standardsUsed: [],
  };
}

export const genlesmeTanki: CalcModule<GenlesmeTankiInput, GenlesmeTankiOutput> = {
  id: "genlesme-tanki",
  title: "Genleşme Tankı",
  discipline: "mekanik",
  standards: [],
  inputSchema: genlesmeTankiInputSchema,
  compute,
};
