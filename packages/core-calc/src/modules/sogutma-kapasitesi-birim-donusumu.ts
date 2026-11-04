import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// 1 TR (ton of refrigeration) = 12 000 BTU/h = 3,51685 kW;  1 kW = 3412,14 BTU/h;  1 kcal/h = 1,163 W.
export const sogutmaKapasitesiBirimDonusumuInputSchema = z.object({
  kapasite_kW: z.number().positive(),
});

export type SogutmaKapasitesiBirimDonusumuInput = z.infer<typeof sogutmaKapasitesiBirimDonusumuInputSchema>;

export interface SogutmaKapasitesiBirimDonusumuOutput {
  kapasite_TR: number;
}

function compute(input: SogutmaKapasitesiBirimDonusumuInput): CalcResult<SogutmaKapasitesiBirimDonusumuOutput> {
  const kw = input.kapasite_kW;
  return {
    value: { kapasite_TR: kw / 3.51685 },
    intermediates: {
      kapasite_BTUh: kw * 3412.14,
      kapasite_kcalh: (kw * 1000) / 1.163,
      kapasite_kBTUh: kw * 3.41214,
      kapasite_W: kw * 1000,
    },
    standardsUsed: ["Birim dönüşümü: 1 TR = 12 000 BTU/h = 3,51685 kW; 1 kcal/h = 1,163 W"],
  };
}

export const sogutmaKapasitesiBirimDonusumu: CalcModule<SogutmaKapasitesiBirimDonusumuInput, SogutmaKapasitesiBirimDonusumuOutput> = {
  id: "sogutma-kapasitesi-birim-donusumu",
  title: "Soğutma Kapasitesi Birim Dönüşümü",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaKapasitesiBirimDonusumuInputSchema,
  compute,
};
