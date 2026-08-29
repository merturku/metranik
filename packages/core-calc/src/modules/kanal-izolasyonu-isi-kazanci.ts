import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düzlemsel iletim + taşınım direnç ağı (dikdörtgen kanal): Boru Isı Kaybı
// (İzolasyonlu) modülünün silindirik geometrisinden farklı olarak kanal
// yüzeyi düz kabul edilir. R'ins = t/k, R'conv = 1/h, Q = (P×L)×|T1-T2|/(R'ins+R'conv).
// Soğutma kanalında ortam daha sıcaksa bu bir ısı kazancıdır (yoğuşma riski),
// ısıtma kanalında ısı kaybıdır — işaret ΔT'nin mutlak değeriyle genelleştirilir.
export const kanalIzolasyonuIsiKazanciInputSchema = z.object({
  kanalCevresi_P_m: z.number().positive(),
  kanalUzunlugu_L_m: z.number().positive(),
  izolasyonKalinligi_t_m: z.number().positive(),
  izolasyonIsiIletkenligi_k_WmK: z.number().positive(),
  disTasinimKatsayisi_h_Wm2K: z.number().positive(),
  icSicaklik_T1_C: z.number(),
  disSicaklik_T2_C: z.number(),
});

export type KanalIzolasyonuIsiKazanciInput = z.infer<
  typeof kanalIzolasyonuIsiKazanciInputSchema
>;

export interface KanalIzolasyonuIsiKazanciOutput {
  isiGecisi_W: number;
}

function compute(
  input: KanalIzolasyonuIsiKazanciInput,
): CalcResult<KanalIzolasyonuIsiKazanciOutput> {
  const iletimDirenciM2KW = input.izolasyonKalinligi_t_m / input.izolasyonIsiIletkenligi_k_WmK;
  const tasinimDirenciM2KW = 1 / input.disTasinimKatsayisi_h_Wm2K;
  const disYuzeyAlaniM2 = input.kanalCevresi_P_m * input.kanalUzunlugu_L_m;
  const sicaklikFarkiC = Math.abs(input.icSicaklik_T1_C - input.disSicaklik_T2_C);
  const isiGecisiW =
    (disYuzeyAlaniM2 * sicaklikFarkiC) / (iletimDirenciM2KW + tasinimDirenciM2KW);

  return {
    value: { isiGecisi_W: isiGecisiW },
    intermediates: {
      iletimDirenci_m2KW: iletimDirenciM2KW,
      tasinimDirenci_m2KW: tasinimDirenciM2KW,
      disYuzeyAlani_m2: disYuzeyAlaniM2,
    },
    standardsUsed: [],
  };
}

export const kanalIzolasyonuIsiKazanci: CalcModule<
  KanalIzolasyonuIsiKazanciInput,
  KanalIzolasyonuIsiKazanciOutput
> = {
  id: "kanal-izolasyonu-isi-kazanci",
  title: "Kanal İzolasyonu Isı Kazancı/Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kanalIzolasyonuIsiKazanciInputSchema,
  compute,
};
