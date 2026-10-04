import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const evEnerjiTahminSchema = z.object({
  ortalama_tüketim_kwh_ay: z.number().positive(),
  birim_fiyat_tlkwh: z.number().positive(),
  peşin_indirim_yuzde: z.number().optional(),
});

export const evEnerjiTahminYillik: CalcModule<any, any> = {
  id: "ev-enerji-faturasi-tahmini-yillik",
  title: "Yıllık Enerji Faturası Tahmini",
  discipline: "ev",
  standards: ["—"],
  inputSchema: evEnerjiTahminSchema as any,

  compute(input: any) {
    const yillik_tüketim = input.ortalama_tüketim_kwh_ay * 12;
    const toplam_fatura = yillik_tüketim * input.birim_fiyat_tlkwh;
    const indirim = input.peşin_indirim_yuzde ?? 0;
    const net_fatura = toplam_fatura * (1 - indirim / 100);
    return {
      value: { net_fatura_TL: parseFloat(net_fatura.toFixed(2)) },
      intermediates: { yillik_tüketim, toplam_fatura, indirim },
      standardsUsed: ["—"],
    };
  },
};
