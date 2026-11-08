import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yüksek verimli motora geçişin enerji tasarrufu ve geri ödeme süresi:
// Pgiriş = Pmil·yük/η;  tasarruf = Pmil·yük·(1/η1 − 1/η2)·h  [kWh/yıl];  geri ödeme = ek yatırım/yıllık tasarruf.
// Verimler motorun ilgili yükteki değeridir (etiket verimi tam yük içindir; kısmi yükte farklıdır).
// Fiyat sabit kabul edilir (enflasyon/iskonto ihmal → basit geri ödeme). IEC 60034-30-1 sınıf değerleri üreticiden alınır.
export const yuksekVerimliMotorGeriOdemeInputSchema = z.object({
  milGucu_kW: z.number().positive(),
  yukOrani: z.number().gt(0).max(1),
  eskiVerim_yuzde: z.number().min(50).max(99.9),
  yeniVerim_yuzde: z.number().min(50).max(99.9),
  yillikCalismaSaati_h: z.number().positive(),
  birimFiyat_TLkWh: z.number().min(0),
  ekYatirim_TL: z.number().min(0),
});

export type YuksekVerimliMotorGeriOdemeInput = z.infer<typeof yuksekVerimliMotorGeriOdemeInputSchema>;

export interface YuksekVerimliMotorGeriOdemeOutput {
  yillikTasarruf_kWh: number;
}

function compute(input: YuksekVerimliMotorGeriOdemeInput): CalcResult<YuksekVerimliMotorGeriOdemeOutput> {
  const pYuk = input.milGucu_kW * input.yukOrani;
  const e1 = input.eskiVerim_yuzde / 100;
  const e2 = input.yeniVerim_yuzde / 100;
  const dKw = pYuk * (1 / e1 - 1 / e2);
  const kwh = dKw * input.yillikCalismaSaati_h;
  const tl = kwh * input.birimFiyat_TLkWh;
  return {
    value: { yillikTasarruf_kWh: kwh },
    intermediates: {
      eski_giris_gucu_kW: pYuk / e1,
      yeni_giris_gucu_kW: pYuk / e2,
      guc_tasarrufu_kW: dKw,
      yillik_tasarruf_TL: tl,
      geri_odeme_yil: tl > 0 ? input.ekYatirim_TL / tl : "geri ödeme yok",
    },
    standardsUsed: ["IEC 60034-30-1 (verim sınıfları; değerler üreticiden)"],
  };
}

export const yuksekVerimliMotorGeriOdeme: CalcModule<YuksekVerimliMotorGeriOdemeInput, YuksekVerimliMotorGeriOdemeOutput> = {
  id: "yuksek-verimli-motor-geri-odeme",
  title: "Yüksek Verimli Motor Enerji Tasarrufu ve Geri Ödeme",
  discipline: "elektrik",
  standards: [],
  inputSchema: yuksekVerimliMotorGeriOdemeInputSchema,
  compute,
};
