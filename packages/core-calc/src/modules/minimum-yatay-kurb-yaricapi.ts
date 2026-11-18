import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// AASHTO: Rmin = V²/(127·(e + f)), V km/h. Yanal ivme a = V²/(12,96·R) (m/s²).
export const minimumYatayKurbYaricapiInputSchema = z.object({
  hiz_kmh: z.number().positive(),
  dever: z.number().min(0).max(0.2),
  surtunme: z.number().positive().max(1),
});

export type MinimumYatayKurbYaricapiInput = z.infer<typeof minimumYatayKurbYaricapiInputSchema>;

export interface MinimumYatayKurbYaricapiOutput {
  minYaricap_m: number;
}

function compute(input: MinimumYatayKurbYaricapiInput): CalcResult<MinimumYatayKurbYaricapiOutput> {
  const toplam = input.dever + input.surtunme;
  const R = (input.hiz_kmh * input.hiz_kmh) / (127 * toplam);
  return {
    value: { minYaricap_m: R },
    intermediates: { e_plus_f: toplam, yanal_ivme_ms2: (input.hiz_kmh * input.hiz_kmh) / (12.96 * R) },
    standardsUsed: ["AASHTO Green Book (yatay kurb)"],
  };
}

export const minimumYatayKurbYaricapi: CalcModule<MinimumYatayKurbYaricapiInput, MinimumYatayKurbYaricapiOutput> = {
  id: "minimum-yatay-kurb-yaricapi",
  title: "Minimum Yatay Kurb Yarıçapı (Yol Tasarımı)",
  discipline: "insaat",
  standards: ["AASHTO Green Book"],
  inputSchema: minimumYatayKurbYaricapiInputSchema,
  compute,
};
