import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınçlı hava kurutucusu (refrijerasyonlu) kapasite seçimi: kurutucular
// belirli referans şartlarda (tipik 7 bar, 35°C giriş sıcaklığı, 25°C ortam
// sıcaklığı) etiketlenir; gerçek işletme şartları farklıysa üretici düzeltme
// katsayılarıyla gerekli nominal kapasite büyütülür.
// GerekliKapasite = KompresörDebisi × Ksıcaklık × Kbasınç.
export const havaKurutucuKapasiteSecimiInputSchema = z.object({
  kompresorDebisi_m3h: z.number().positive(),
  sicaklikDuzeltmeKatsayisi_K1: z.number().positive(),
  basincDuzeltmeKatsayisi_K2: z.number().positive(),
});

export type HavaKurutucuKapasiteSecimiInput = z.infer<
  typeof havaKurutucuKapasiteSecimiInputSchema
>;

export interface HavaKurutucuKapasiteSecimiOutput {
  gerekliKapasite_m3h: number;
}

function compute(
  input: HavaKurutucuKapasiteSecimiInput,
): CalcResult<HavaKurutucuKapasiteSecimiOutput> {
  const toplamDuzeltmeKatsayisi =
    input.sicaklikDuzeltmeKatsayisi_K1 * input.basincDuzeltmeKatsayisi_K2;
  const gerekliKapasiteM3h = input.kompresorDebisi_m3h * toplamDuzeltmeKatsayisi;

  return {
    value: { gerekliKapasite_m3h: gerekliKapasiteM3h },
    intermediates: {
      toplamDuzeltmeKatsayisi,
    },
    standardsUsed: [],
  };
}

export const havaKurutucuKapasiteSecimi: CalcModule<
  HavaKurutucuKapasiteSecimiInput,
  HavaKurutucuKapasiteSecimiOutput
> = {
  id: "hava-kurutucu-kapasite-secimi",
  title: "Hava Kurutucu Kapasite Seçimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaKurutucuKapasiteSecimiInputSchema,
  compute,
};
