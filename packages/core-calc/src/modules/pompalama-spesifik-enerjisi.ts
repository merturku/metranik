import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompalama spesifik enerjisi: E = ρ·g·H/(3,6·10⁶·η)  [kWh/m³]  (η toplam: pompa × motor × sürücü).
// Yıllık enerji = E · yıllık pompalanan hacim; maliyet = enerji × elektrik fiyatı.
export const pompalamaSpesifikEnerjisiInputSchema = z.object({
  basma_mSS: z.number().positive(),
  toplamVerim: z.number().gt(0).max(1),
  yillikHacim_m3: z.number().min(0),
  elektrikFiyati_TLkWh: z.number().min(0),
});

export type PompalamaSpesifikEnerjisiInput = z.infer<typeof pompalamaSpesifikEnerjisiInputSchema>;

export interface PompalamaSpesifikEnerjisiOutput {
  spesifikEnerji_kWhm3: number;
}

function compute(input: PompalamaSpesifikEnerjisiInput): CalcResult<PompalamaSpesifikEnerjisiOutput> {
  const hidrolik = (1000 * 9.80665 * input.basma_mSS) / 3.6e6;
  const e = hidrolik / input.toplamVerim;
  const yillik = e * input.yillikHacim_m3;
  return {
    value: { spesifikEnerji_kWhm3: e },
    intermediates: {
      hidrolik_enerji_kWhm3: hidrolik,
      kayip_enerji_kWhm3: e - hidrolik,
      yillik_enerji_kWh: yillik,
      yillik_maliyet_TL: yillik * input.elektrikFiyati_TLkWh,
    },
    standardsUsed: ["Hidrolik güç bağıntısı (P = ρgQH/η)"],
  };
}

export const pompalamaSpesifikEnerjisi: CalcModule<PompalamaSpesifikEnerjisiInput, PompalamaSpesifikEnerjisiOutput> = {
  id: "pompalama-spesifik-enerjisi",
  title: "Pompalama Spesifik Enerjisi ve Yıllık Maliyet",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompalamaSpesifikEnerjisiInputSchema,
  compute,
};
