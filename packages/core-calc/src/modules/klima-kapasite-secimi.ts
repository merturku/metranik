import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sektörde yaygın ön boyutlandırma kuralı: alan × BTU/m² katsayısı, ek kişi
// başına ısı kazancı eklenir. 1 ton = 12.000 BTU/h (standart birim dönüşümü).
const KISI_BASINA_EK_BTU = 600;
const BTU_PER_TON = 12000;

export const klimaKapasiteSecimiInputSchema = z.object({
  alan_m2: z.number().positive(),
  katsayi_BTU_m2: z.number().positive(),
  ekKisiSayisi: z.number().nonnegative(),
});

export type KlimaKapasiteSecimiInput = z.infer<typeof klimaKapasiteSecimiInputSchema>;

export interface KlimaKapasiteSecimiOutput {
  gerekliKapasite_BTU: number;
  tonKapasite: number;
}

function compute(input: KlimaKapasiteSecimiInput): CalcResult<KlimaKapasiteSecimiOutput> {
  const temelBTU = input.alan_m2 * input.katsayi_BTU_m2;
  const kisiEklemesiBTU = input.ekKisiSayisi * KISI_BASINA_EK_BTU;
  const toplamBTU = temelBTU + kisiEklemesiBTU;

  return {
    value: { gerekliKapasite_BTU: toplamBTU, tonKapasite: toplamBTU / BTU_PER_TON },
    intermediates: {
      temelKapasite_BTU: temelBTU,
      kisiEklemesi_BTU: kisiEklemesiBTU,
    },
    standardsUsed: [],
  };
}

export const klimaKapasiteSecimi: CalcModule<
  KlimaKapasiteSecimiInput,
  KlimaKapasiteSecimiOutput
> = {
  id: "klima-kapasite-secimi",
  title: "Klima (Split) Kapasite Seçimi",
  discipline: "ev",
  standards: [],
  inputSchema: klimaKapasiteSecimiInputSchema,
  compute,
};
