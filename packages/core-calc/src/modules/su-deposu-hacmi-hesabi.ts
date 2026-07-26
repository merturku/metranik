import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Gerekli hacim: V = Kişi Sayısı × Kişi Başı Günlük Tüketim × Yedek Gün Sayısı.
export const suDeposuHacmiHesabiInputSchema = z.object({
  kisiSayisi: z.number().positive(),
  gunlukKisiBasiTuketim_Lgun: z.number().positive(),
  yedekGunSayisi: z.number().positive(),
});

export type SuDeposuHacmiHesabiInput = z.infer<typeof suDeposuHacmiHesabiInputSchema>;

export interface SuDeposuHacmiHesabiOutput {
  gerekliHacim_L: number;
}

function compute(input: SuDeposuHacmiHesabiInput): CalcResult<SuDeposuHacmiHesabiOutput> {
  const gerekliHacimL =
    input.kisiSayisi * input.gunlukKisiBasiTuketim_Lgun * input.yedekGunSayisi;

  return {
    value: { gerekliHacim_L: gerekliHacimL },
    intermediates: {
      gerekliHacim_m3: gerekliHacimL / 1000,
    },
    standardsUsed: [],
  };
}

export const suDeposuHacmiHesabi: CalcModule<
  SuDeposuHacmiHesabiInput,
  SuDeposuHacmiHesabiOutput
> = {
  id: "su-deposu-hacmi-hesabi",
  title: "Su Deposu Hacmi Hesabı",
  discipline: "ev",
  standards: [],
  inputSchema: suDeposuHacmiHesabiInputSchema,
  compute,
};
