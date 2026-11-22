import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Wobbe indeksi W = Hs/√d (Hs: üst ısıl değer, d: havaya göre bağıl yoğunluk).
// Aynı basınç ve enjektör ile brülör ısıl gücü W ile orantılıdır: Q2/Q1 = W2/W1.
export const wobbeIndeksiYakitDegisimiInputSchema = z.object({
  referansUstIsilDeger_MJm3: z.number().positive(),
  referansBagilYogunluk: z.number().positive(),
  yeniUstIsilDeger_MJm3: z.number().positive(),
  yeniBagilYogunluk: z.number().positive(),
  izinVerilenSapma_yuzde: z.number().positive(),
});

export type WobbeIndeksiYakitDegisimiInput = z.infer<typeof wobbeIndeksiYakitDegisimiInputSchema>;
export interface WobbeIndeksiYakitDegisimiOutput {
  yeniWobbe_MJm3: number;
}

const STD = "TS EN 437 (test gazları ve gaz aileleri), TS EN 437'deki Wobbe tanımı; gaz değişimi sınırları ilgili cihaz standardından teyit edilmeli";

function compute(input: WobbeIndeksiYakitDegisimiInput): CalcResult<WobbeIndeksiYakitDegisimiOutput> {
  const W1 = input.referansUstIsilDeger_MJm3 / Math.sqrt(input.referansBagilYogunluk);
  const W2 = input.yeniUstIsilDeger_MJm3 / Math.sqrt(input.yeniBagilYogunluk);
  const sapma = (W2 / W1 - 1) * 100;
  const mutlak = Math.abs(sapma);
  const status = mutlak <= input.izinVerilenSapma_yuzde ? "uygun" : mutlak <= 2 * input.izinVerilenSapma_yuzde ? "sinirda" : "uygunsuz";
  return {
    value: { yeniWobbe_MJm3: W2 },
    intermediates: {
      referans_Wobbe_MJm3: W1,
      Wobbe_sapmasi_yuzde: sapma,
      isil_guc_orani: W2 / W1,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: `Wobbe sapması %${sapma.toFixed(1)} (izin ±%${input.izinVerilenSapma_yuzde}). Yanma hızı ve sarı uç eğilimi Wobbe ile belirlenemez; enjektör/basınç ayarı ve cihaz uygunluğu üretici ile teyit edilmeli`,
    },
  };
}

export const wobbeIndeksiYakitDegisimi: CalcModule<WobbeIndeksiYakitDegisimiInput, WobbeIndeksiYakitDegisimiOutput> = {
  id: "wobbe-indeksi-yakit-degisimi",
  title: "Wobbe İndeksi ve Gaz Değişimi Uygunluğu",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: wobbeIndeksiYakitDegisimiInputSchema,
  compute,
};
