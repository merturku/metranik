import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı pompası denge (balance) noktası: bina yükü dış sıcaklıkla doğrusal azalır,
// Q_bina(T) = Q_tasarım·(Ti − T)/(Ti − T_tasarım); pompa kapasitesi iki üretici noktasından doğrusal alınır,
// Q_kap(T) = c1 + s·(T − Ta1),  s = (c2 − c1)/(Ta2 − Ta1).  Kesişim: T_denge = (k·Ti − c1 + s·Ta1)/(k + s),
// k = Q_tasarım/(Ti − T_tasarım). Denge noktasının altında ek ısıtıcı (bivalent) devreye girer.
export const isiPompasiDengeNoktasiInputSchema = z
  .object({
    icSicaklik_C: z.number(),
    tasarimDisSicaklik_C: z.number(),
    tasarimYuku_kW: z.number().positive(),
    kapasiteSicaklik1_C: z.number(),
    kapasite1_kW: z.number().positive(),
    kapasiteSicaklik2_C: z.number(),
    kapasite2_kW: z.number().positive(),
  })
  .refine((v) => v.tasarimDisSicaklik_C < v.icSicaklik_C, { message: "Tasarım dış sıcaklığı iç sıcaklıktan düşük olmalı" })
  .refine((v) => v.kapasiteSicaklik1_C !== v.kapasiteSicaklik2_C, { message: "İki kapasite noktası farklı sıcaklıkta olmalı" });

export type IsiPompasiDengeNoktasiInput = z.infer<typeof isiPompasiDengeNoktasiInputSchema>;

export interface IsiPompasiDengeNoktasiOutput {
  dengeSicakligi_C: number;
}

function compute(input: IsiPompasiDengeNoktasiInput): CalcResult<IsiPompasiDengeNoktasiOutput> {
  const k = input.tasarimYuku_kW / (input.icSicaklik_C - input.tasarimDisSicaklik_C);
  const s = (input.kapasite2_kW - input.kapasite1_kW) / (input.kapasiteSicaklik2_C - input.kapasiteSicaklik1_C);
  const tDenge = (k * input.icSicaklik_C - input.kapasite1_kW + s * input.kapasiteSicaklik1_C) / (k + s);
  const kap = (t: number) => input.kapasite1_kW + s * (t - input.kapasiteSicaklik1_C);
  const kapTasarim = kap(input.tasarimDisSicaklik_C);
  const ek = Math.max(0, input.tasarimYuku_kW - kapTasarim);
  const tamKarsilar = tDenge <= input.tasarimDisSicaklik_C;
  return {
    value: { dengeSicakligi_C: tDenge },
    intermediates: {
      denge_yuku_kW: k * (input.icSicaklik_C - tDenge),
      tasarim_noktasi_pompa_kapasitesi_kW: kapTasarim,
      ek_isitici_gereksinimi_kW: ek,
      ek_isitici_orani_yuzde: (ek / input.tasarimYuku_kW) * 100,
      durum: tamKarsilar ? "Pompa tasarım koşulunda yükü tek başına karşılar (monovalent)" : "Denge noktasının altında ek ısıtıcı gerekir (bivalent)",
    },
    standardsUsed: ["TS EN 14825 (kısmi yük/denge noktası kavramı)"],
  };
}

export const isiPompasiDengeNoktasi: CalcModule<IsiPompasiDengeNoktasiInput, IsiPompasiDengeNoktasiOutput> = {
  id: "isi-pompasi-denge-noktasi",
  title: "Isı Pompası Denge Noktası (Bivalent)",
  discipline: "mekanik",
  standards: ["TS EN 14825"],
  inputSchema: isiPompasiDengeNoktasiInputSchema,
  compute,
};
