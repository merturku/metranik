import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Damlayan musluk/rezervuar kaçağından yıllık su kaybı: Q = damla/dk × damla hacmi (mL) → mL/dk → L/gün (×1,44) → L/yıl (×365).
// Tipik damla hacmi ≈ 0,05 mL (20 damla/mL); sürekli ince akıntı için damla sayısı yerine ölçülen debi (mL/dk) girilebilir (damla hacmi 1 mL alınır).
// Maliyet = m³ × (su + atık su birim bedeli); ısıtılmış suda ayrıca enerji kaybı vardır (Sıcak Su Birim Maliyeti modülü).
export const evDamlamaKacagiSuKaybiInputSchema = z.object({
  damlaSayisi_dk: z.number().min(0),
  damlaHacmi_mL: z.number().positive(),
  suBirimFiyati_TLm3: z.number().min(0),
});

export type EvDamlamaKacagiSuKaybiInput = z.infer<typeof evDamlamaKacagiSuKaybiInputSchema>;

export interface EvDamlamaKacagiSuKaybiOutput {
  yillikKayip_L: number;
}

function compute(input: EvDamlamaKacagiSuKaybiInput): CalcResult<EvDamlamaKacagiSuKaybiOutput> {
  const mlDk = input.damlaSayisi_dk * input.damlaHacmi_mL;
  const lGun = (mlDk * 1440) / 1000;
  const lYil = lGun * 365;
  return {
    value: { yillikKayip_L: lYil },
    intermediates: {
      kacak_debisi_mL_dk: mlDk,
      gunluk_kayip_L: lGun,
      yillik_kayip_m3: lYil / 1000,
      yillik_maliyet_TL: (lYil / 1000) * input.suBirimFiyati_TLm3,
    },
    standardsUsed: [],
  };
}

export const evDamlamaKacagiSuKaybi: CalcModule<EvDamlamaKacagiSuKaybiInput, EvDamlamaKacagiSuKaybiOutput> = {
  id: "ev-damlama-kacagi-su-kaybi",
  title: "Damlayan Musluk / Kaçak Yıllık Su Kaybı",
  discipline: "ev",
  standards: [],
  inputSchema: evDamlamaKacagiSuKaybiInputSchema,
  compute,
};
