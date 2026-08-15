import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// NFPA 2001 (Temiz Gazlı Söndürme Sistemleri): gerekli ajan ağırlığı,
// W = (V/s) × [C/(100-C)]. V: korunan hacim, s: ajanın söndürme sıcaklığındaki
// özgül buhar hacmi (ajana ve sıcaklığa göre değişir, NFPA 2001 tablosundan
// alınır), C: tasarım konsantrasyonu (%).
export const yanginSondurmeGaziMiktariInputSchema = z.object({
  korunanHacim_V_m3: z.number().positive(),
  ozgulBuharHacmi_s_m3kg: z.number().positive(),
  tasarimKonsantrasyonu_C_yuzde: z.number().positive().max(99),
});

export type YanginSondurmeGaziMiktariInput = z.infer<
  typeof yanginSondurmeGaziMiktariInputSchema
>;

export interface YanginSondurmeGaziMiktariOutput {
  gerekliAjanMiktari_kg: number;
}

function compute(
  input: YanginSondurmeGaziMiktariInput,
): CalcResult<YanginSondurmeGaziMiktariOutput> {
  const hacimSelBuharOrani =
    input.korunanHacim_V_m3 / input.ozgulBuharHacmi_s_m3kg;
  const konsantrasyonOrani =
    input.tasarimKonsantrasyonu_C_yuzde / (100 - input.tasarimKonsantrasyonu_C_yuzde);
  const gerekliAjanMiktariKg = hacimSelBuharOrani * konsantrasyonOrani;

  return {
    value: { gerekliAjanMiktari_kg: gerekliAjanMiktariKg },
    intermediates: {
      hacimSelBuharOrani_kg: hacimSelBuharOrani,
    },
    standardsUsed: ["NFPA 2001"],
  };
}

export const yanginSondurmeGaziMiktari: CalcModule<
  YanginSondurmeGaziMiktariInput,
  YanginSondurmeGaziMiktariOutput
> = {
  id: "yangin-sondurme-gazi-miktari",
  title: "Yangın Söndürme Gazı (Temiz Gaz) Miktarı",
  discipline: "mekanik",
  standards: ["NFPA 2001"],
  inputSchema: yanginSondurmeGaziMiktariInputSchema,
  compute,
};
