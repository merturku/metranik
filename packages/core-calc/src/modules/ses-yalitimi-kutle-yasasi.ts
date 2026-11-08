import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tek tabakalı homojen duvar/döşemenin hava ses yalıtımı — kütle yasası (alan/rastgele geliş):
// TL ≈ 20·log10(m·f) − 47  [dB],  m = ρ·t (kg/m²), f (Hz)  (Beranek & Vér; kütle ve frekans
// iki katına çıkınca +6 dB). Kuramsal alt-orta frekans değeridir: koinsidans çukuru, rezonans ve
// kaçak yollar (kapı, menfez, bağlantı) gerçek yalıtımı düşürür; ölçüm/laboratuvar değeri esastır.
export const sesYalitimiKutleYasasiInputSchema = z.object({
  kalinlik_mm: z.number().positive(),
  yogunluk_kgm3: z.number().positive(),
  frekans_Hz: z.number().positive(),
  hedefTL_dB: z.number().positive(),
});

export type SesYalitimiKutleYasasiInput = z.infer<typeof sesYalitimiKutleYasasiInputSchema>;

export interface SesYalitimiKutleYasasiOutput {
  ses_yalitimi_dB: number;
}

function compute(input: SesYalitimiKutleYasasiInput): CalcResult<SesYalitimiKutleYasasiOutput> {
  const m = (input.yogunluk_kgm3 * input.kalinlik_mm) / 1000;
  const tl = 20 * Math.log10(m * input.frekans_Hz) - 47;
  const mGerekli = 10 ** ((input.hedefTL_dB + 47) / 20) / input.frekans_Hz;
  const h = input.hedefTL_dB;
  const durum = tl >= h ? "uygun" : tl >= h - 3 ? "sinirda" : "uygunsuz";
  return {
    value: { ses_yalitimi_dB: tl },
    intermediates: {
      yuzey_kutlesi_kgm2: m,
      hedef_icin_gerekli_kutle_kgm2: mGerekli,
      kutle_iki_katinda_TL_dB: tl + 20 * Math.log10(2),
    },
    standardsUsed: ["Kütle yasası (ISO 12354-1 / TS EN ISO 717-1 değerlendirme için ölçüm gerekir)"],
    verdict: {
      status: durum,
      note:
        durum === "uygun"
          ? "Kuramsal TL hedefi karşılıyor; kaçak yollar ve koinsidans ayrıca kontrol edilmeli."
          : durum === "sinirda"
            ? "Kuramsal TL hedefin en fazla 3 dB altında."
            : `Hedef için yüzey kütlesi ≈ ${mGerekli.toFixed(0)} kg/m² gerekir.`,
    },
  };
}

export const sesYalitimiKutleYasasi: CalcModule<SesYalitimiKutleYasasiInput, SesYalitimiKutleYasasiOutput> = {
  id: "ses-yalitimi-kutle-yasasi",
  title: "Duvar Hava Ses Yalıtımı (Kütle Yasası)",
  discipline: "ev",
  standards: [],
  inputSchema: sesYalitimiKutleYasasiInputSchema,
  compute,
};
