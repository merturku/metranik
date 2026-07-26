import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mevsimsel performans katsayısı: SPF = Toplam Isıtma Çıktısı / Toplam Elektrik Girdisi.
export const isiPompasiSpfInputSchema = z.object({
  toplamIsitmaCiktisi_kWh: z.number().positive(),
  toplamElektrikGirdisi_kWh: z.number().positive(),
});

export type IsiPompasiSpfInput = z.infer<typeof isiPompasiSpfInputSchema>;

export interface IsiPompasiSpfOutput {
  spf: number;
}

function compute(input: IsiPompasiSpfInput): CalcResult<IsiPompasiSpfOutput> {
  const spf = input.toplamIsitmaCiktisi_kWh / input.toplamElektrikGirdisi_kWh;

  return {
    value: { spf },
    intermediates: {
      toplamElektrikGirdisi_kWh: input.toplamElektrikGirdisi_kWh,
    },
    standardsUsed: [],
  };
}

export const isiPompasiSpf: CalcModule<IsiPompasiSpfInput, IsiPompasiSpfOutput> = {
  id: "isi-pompasi-spf",
  title: "Isı Pompası Mevsimsel Performans Katsayısı (SPF)",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiPompasiSpfInputSchema,
  compute,
};
