import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Eski ve yeni armatür gücü farkına göre yıllık enerji ve maliyet tasarrufu:
// ΔP = Peski - Pyeni, Yıllık Enerji = ΔP × günlükÇalışmaSaati × yıllıkGünSayısı,
// Yıllık Tasarruf (TL) = Yıllık Enerji (kWh) × Birim Fiyat (TL/kWh).
export const ledAydinlatmaEnerjiTasarrufuInputSchema = z.object({
  eskiArmaturGucu_W: z.number().positive(),
  yeniArmaturGucu_W: z.number().positive(),
  gunlukCalismaSuresi_saat: z.number().positive().max(24),
  yillikGunSayisi: z.number().positive().max(366),
  birimFiyat_TLkWh: z.number().positive(),
});

export type LedAydinlatmaEnerjiTasarrufuInput = z.infer<
  typeof ledAydinlatmaEnerjiTasarrufuInputSchema
>;

export interface LedAydinlatmaEnerjiTasarrufuOutput {
  yillikTasarruf_TL: number;
}

function compute(
  input: LedAydinlatmaEnerjiTasarrufuInput,
): CalcResult<LedAydinlatmaEnerjiTasarrufuOutput> {
  const gucFarki_kW = (input.eskiArmaturGucu_W - input.yeniArmaturGucu_W) / 1000;
  const yillikEnerji_kWh =
    gucFarki_kW * input.gunlukCalismaSuresi_saat * input.yillikGunSayisi;
  const yillikTasarruf_TL = yillikEnerji_kWh * input.birimFiyat_TLkWh;

  return {
    value: { yillikTasarruf_TL },
    intermediates: {
      gucFarki_kW: Number(gucFarki_kW.toFixed(4)),
      yillikEnerji_kWh: Number(yillikEnerji_kWh.toFixed(2)),
    },
    standardsUsed: [],
  };
}

export const ledAydinlatmaEnerjiTasarrufu: CalcModule<
  LedAydinlatmaEnerjiTasarrufuInput,
  LedAydinlatmaEnerjiTasarrufuOutput
> = {
  id: "led-aydinlatma-enerji-tasarrufu",
  title: "LED Aydınlatma Enerji Tasarrufu",
  discipline: "ev",
  standards: [],
  inputSchema: ledAydinlatmaEnerjiTasarrufuInputSchema,
  compute,
};
