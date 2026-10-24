import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const sogutmaMenteşeBasinciSchema = z.object({
  sogutma_kapasitesi_kW: z.number().positive(),
  debi_Lmin: z.number().positive(),
  max_basinc_bar: z.number().positive().optional(),
});

export const sogutmaMenteşeBasinci: CalcModule<any, any> = {
  id: "sogutma-menteşe-basinci-kontrolu",
  title: "Soğutma Menteşe Basınç Kontrolü",
  discipline: "mekanik",
  standards: ["EN 60073"],
  inputSchema: sogutmaMenteşeBasinciSchema as any,

  compute(input: any) {
    const basinc_bar = (input.sogutma_kapasitesi_kW * 1000) / (input.debi_Lmin * 10);
    const max_p = input.max_basinc_bar ?? 5;
    const status = basinc_bar <= max_p ? "uygun" : "yüksek";
    return {
      value: { basinc_bar: parseFloat(basinc_bar.toFixed(2)) },
      intermediates: { capacity_W: input.sogutma_kapasitesi_kW * 1000 },
      standardsUsed: ["EN 60073"],
      verdict: { status, note: `${basinc_bar.toFixed(1)} bar` },
    };
  },
};
