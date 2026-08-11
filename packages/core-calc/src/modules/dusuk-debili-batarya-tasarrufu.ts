import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düşük debili (aeratörlü) duş bataryası su tasarrufu — led-aydinlatma-enerji-tasarrufu
// ile aynı mantık, su tarafı: ΔDebi = EskiDebi - YeniDebi, Yıllık Su Tasarrufu =
// ΔDebi × Günlük Kullanım Süresi × Yıllık Gün Sayısı, Yıllık Tasarruf (TL) =
// Yıllık Su Tasarrufu (m³) × Birim Fiyat (TL/m³).
export const dusukDebiliBataryaTasarrufuInputSchema = z.object({
  eskiDebi_L_dk: z.number().positive(),
  yeniDebi_L_dk: z.number().positive(),
  gunlukKullanimSuresi_dk: z.number().positive(),
  yillikGunSayisi: z.number().positive().max(366),
  birimFiyat_TLm3: z.number().positive(),
});

export type DusukDebiliBataryaTasarrufuInput = z.infer<
  typeof dusukDebiliBataryaTasarrufuInputSchema
>;

export interface DusukDebiliBataryaTasarrufuOutput {
  yillikTasarruf_TL: number;
}

function compute(
  input: DusukDebiliBataryaTasarrufuInput,
): CalcResult<DusukDebiliBataryaTasarrufuOutput> {
  const debiFarkiLDk = input.eskiDebi_L_dk - input.yeniDebi_L_dk;
  const yillikSuTasarrufuL =
    debiFarkiLDk * input.gunlukKullanimSuresi_dk * input.yillikGunSayisi;
  const yillikSuTasarrufuM3 = yillikSuTasarrufuL / 1000;
  const yillikTasarrufTL = yillikSuTasarrufuM3 * input.birimFiyat_TLm3;

  return {
    value: { yillikTasarruf_TL: yillikTasarrufTL },
    intermediates: {
      debiFarki_L_dk: debiFarkiLDk,
      yillikSuTasarrufu_m3: yillikSuTasarrufuM3,
    },
    standardsUsed: [],
  };
}

export const dusukDebiliBataryaTasarrufu: CalcModule<
  DusukDebiliBataryaTasarrufuInput,
  DusukDebiliBataryaTasarrufuOutput
> = {
  id: "dusuk-debili-batarya-tasarrufu",
  title: "Düşük Debili Batarya Su Tasarrufu",
  discipline: "ev",
  standards: [],
  inputSchema: dusukDebiliBataryaTasarrufuInputSchema,
  compute,
};
