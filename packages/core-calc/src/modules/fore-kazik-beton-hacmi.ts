import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kazık metrajı: V = n·(π d²/4)·L; beton = V(1 + fire); boyuna donatı = ρs·Ac·L·n·7850 kg/m³.
export const foreKazikBetonHacmiInputSchema = z.object({
  capi_mm: z.number().positive(),
  boy_m: z.number().positive(),
  adet: z.number().int().min(1),
  firePayi: z.number().min(0),
  donatiOrani: z.number().min(0).max(0.1),
});

export type ForeKazikBetonHacmiInput = z.infer<typeof foreKazikBetonHacmiInputSchema>;

export interface ForeKazikBetonHacmiOutput {
  betonHacmi_m3: number;
}

function compute(input: ForeKazikBetonHacmiInput): CalcResult<ForeKazikBetonHacmiOutput> {
  const Ac = (Math.PI * Math.pow(input.capi_mm / 1000, 2)) / 4;
  const teorik = Ac * input.boy_m * input.adet;
  return {
    value: { betonHacmi_m3: teorik * (1 + input.firePayi) },
    intermediates: { teorik_hacim_m3: teorik, boyuna_donati_kg: input.donatiOrani * teorik * 7850, kesit_alani_m2: Ac },
    standardsUsed: [],
  };
}

export const foreKazikBetonHacmi: CalcModule<ForeKazikBetonHacmiInput, ForeKazikBetonHacmiOutput> = {
  id: "fore-kazik-beton-hacmi",
  title: "Fore Kazık Beton Hacmi ve Donatı Ağırlığı",
  discipline: "insaat",
  standards: [],
  inputSchema: foreKazikBetonHacmiInputSchema,
  compute,
};
