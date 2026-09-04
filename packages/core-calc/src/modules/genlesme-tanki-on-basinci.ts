import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Genleşme tankının ön (hava yastığı) basıncı, sistemin en üst noktasındaki
// statik su yüksekliğinin bar'a çevrilmesi (10.2 m su kolonu ≈ 1 bar) ve bir
// güvenlik marjı eklenmesiyle bulunur. Bu basınç, tankın sistem devreye
// girmeden önceki minimum işletme basıncını sağlar. Genleşme Tankı (hacim)
// modülünün tamamlayıcısıdır — o hacmi, bu basıncı üretir.
export const genlesmeTankiOnBasinciInputSchema = z.object({
  statikYukseklik_H_m: z.number().positive(),
  guvenlikMarji_bar: z.number().nonnegative(),
});

export type GenlesmeTankiOnBasinciInput = z.infer<typeof genlesmeTankiOnBasinciInputSchema>;

export interface GenlesmeTankiOnBasinciOutput {
  onBasinc_P0_bar: number;
}

const SU_KOLONU_M_PER_BAR = 10.2;

function compute(input: GenlesmeTankiOnBasinciInput): CalcResult<GenlesmeTankiOnBasinciOutput> {
  const statikBasincBar = input.statikYukseklik_H_m / SU_KOLONU_M_PER_BAR;
  const onBasincP0Bar = statikBasincBar + input.guvenlikMarji_bar;

  return {
    value: { onBasinc_P0_bar: onBasincP0Bar },
    intermediates: {
      statikBasinc_bar: statikBasincBar,
    },
    standardsUsed: [],
  };
}

export const genlesmeTankiOnBasinci: CalcModule<
  GenlesmeTankiOnBasinciInput,
  GenlesmeTankiOnBasinciOutput
> = {
  id: "genlesme-tanki-on-basinci",
  title: "Genleşme Tankı Ön Basıncı",
  discipline: "mekanik",
  standards: [],
  inputSchema: genlesmeTankiOnBasinciInputSchema,
  compute,
};
