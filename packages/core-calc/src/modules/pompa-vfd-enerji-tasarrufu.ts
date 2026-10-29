import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompa/fan devir düşürmeyle (frekans konvertörü) enerji tasarrufu — afinite yasaları:
// Q ∝ n,  H ∝ n²,  P ∝ n³  →  P2 = P1·(n2/n1)³.
// Tasarruf = (P1 − P2)·t, maliyet = tasarruf × birim fiyat.
// Küp bağıntısı sistem eğrisinin orijinden geçtiği (statik yük yok, tamamen sürtünmeli) kabulüne dayanır;
// statik yük varsa gerçek güç bundan yüksektir. Konvertör/motor verim değişimi hesaba katılmaz.
export const pompaVfdEnerjiTasarrufuInputSchema = z.object({
  nominalGuc_kW: z.number().positive(),
  devirOrani: z.number().gt(0).max(1),
  yillikCalismaSaati_h: z.number().positive(),
  birimFiyat: z.number().min(0),
});

export type PompaVfdEnerjiTasarrufuInput = z.infer<typeof pompaVfdEnerjiTasarrufuInputSchema>;

export interface PompaVfdEnerjiTasarrufuOutput {
  yillikTasarruf_kWh: number;
}

function compute(input: PompaVfdEnerjiTasarrufuInput): CalcResult<PompaVfdEnerjiTasarrufuOutput> {
  const r = input.devirOrani;
  const p2 = input.nominalGuc_kW * r ** 3;
  const tasarrufKw = input.nominalGuc_kW - p2;
  const kwh = tasarrufKw * input.yillikCalismaSaati_h;

  return {
    value: { yillikTasarruf_kWh: kwh },
    intermediates: {
      debi_orani_Q2_Q1: r,
      basma_yuksekligi_orani_H2_H1: r ** 2,
      guc_orani_P2_P1: r ** 3,
      yeni_guc_kW: p2,
      tasarruf_yuzdesi: (1 - r ** 3) * 100,
      yillik_maliyet_tasarrufu: kwh * input.birimFiyat,
    },
    standardsUsed: [],
  };
}

export const pompaVfdEnerjiTasarrufu: CalcModule<PompaVfdEnerjiTasarrufuInput, PompaVfdEnerjiTasarrufuOutput> = {
  id: "pompa-vfd-enerji-tasarrufu",
  title: "Pompa/Fan Devir Düşürme Enerji Tasarrufu (VFD)",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaVfdEnerjiTasarrufuInputSchema,
  compute,
};
