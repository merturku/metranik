import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Spesifik fan gücü SFP = Pelektrik / q  [W/(m³/s)]  (EN 13779:2007 Tablo 18 sınıfları;
// yerini EN 16798-3 almıştır — sınıf sınırlarını güncel baskıdan/ulusal mevzuattan teyit edin).
// SFP1 < 500, SFP2 500–750, SFP3 750–1250, SFP4 1250–2000, SFP5 2000–3000, SFP6 3000–4500, SFP7 > 4500.
export const fanSpesifikGucSfpInputSchema = z.object({
  elektrikGucu_W: z.number().positive(),
  debi_m3h: z.number().positive(),
  hedefSinif: z.number().int().min(1).max(4),
});

export type FanSpesifikGucSfpInput = z.infer<typeof fanSpesifikGucSfpInputSchema>;

export interface FanSpesifikGucSfpOutput {
  sfp_Wm3s: number;
}

const UST_SINIRLAR = [500, 750, 1250, 2000, 3000, 4500];

function compute(input: FanSpesifikGucSfpInput): CalcResult<FanSpesifikGucSfpOutput> {
  const q = input.debi_m3h / 3600;
  const sfp = input.elektrikGucu_W / q;
  const idx = UST_SINIRLAR.findIndex((s) => sfp < s);
  const sinif = idx === -1 ? 7 : idx + 1;
  const sinir = UST_SINIRLAR[input.hedefSinif - 1] ?? 0;
  const uygun = sfp <= sinir;
  return {
    value: { sfp_Wm3s: sfp },
    intermediates: {
      debi_m3s: q,
      sfp_kWm3s: sfp / 1000,
      sfp_sinifi: `SFP ${sinif}`,
      hedef_sinir_Wm3s: sinir,
    },
    standardsUsed: ["EN 13779:2007 (SFP sınıfları)"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `SFP ${sfp.toFixed(0)} W/(m³/s) ≤ SFP ${input.hedefSinif} sınırı ${sinir}.`
        : `SFP ${sfp.toFixed(0)} W/(m³/s) > SFP ${input.hedefSinif} sınırı ${sinir}; fan/kanal basınç kaybını veya verimi iyileştirin.`,
    },
  };
}

export const fanSpesifikGucSfp: CalcModule<FanSpesifikGucSfpInput, FanSpesifikGucSfpOutput> = {
  id: "fan-spesifik-guc-sfp",
  title: "Fan Spesifik Gücü (SFP) Kontrolü",
  discipline: "mekanik",
  standards: ["EN 13779:2007"],
  inputSchema: fanSpesifikGucSfpInputSchema,
  compute,
};
