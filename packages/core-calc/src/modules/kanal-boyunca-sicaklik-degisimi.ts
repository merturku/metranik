import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yalıtımlı hava kanalı boyunca sıcaklık değişimi: T(L) = Ta + (Ti − Ta)·exp(−U·P·L/(ṁ·cp))
// U = 1/(1/hi + t/λ + 1/ho) (düzlemsel duvar), P = kanal çevresi, ṁ = ρ·V̇
export const kanalBoyuncaSicaklikDegisimiInputSchema = z.object({
  debi_m3h: z.number().positive(),
  kanalGenisligi_mm: z.number().positive(),
  kanalYuksekligi_mm: z.number().positive(),
  kanalUzunlugu_m: z.number().positive(),
  girisSicakligi_C: z.number(),
  ortamSicakligi_C: z.number(),
  yalitimKalinligi_mm: z.number().min(0),
  yalitimLambda_WmK: z.number().positive(),
  icTasinim_h_Wm2K: z.number().positive(),
  disTasinim_h_Wm2K: z.number().positive(),
  izinVerilenDusum_K: z.number().positive(),
});

export type KanalBoyuncaSicaklikDegisimiInput = z.infer<typeof kanalBoyuncaSicaklikDegisimiInputSchema>;
export interface KanalBoyuncaSicaklikDegisimiOutput {
  cikisSicakligi_C: number;
}

const STD = "ASHRAE Fundamentals Böl. 4 ve 23 (kanal ısı geçişi, ısıl direnç ağı)";

function compute(input: KanalBoyuncaSicaklikDegisimiInput): CalcResult<KanalBoyuncaSicaklikDegisimiOutput> {
  const a = input.kanalGenisligi_mm / 1000;
  const b = input.kanalYuksekligi_mm / 1000;
  const cevre = 2 * (a + b);
  const t = input.yalitimKalinligi_mm / 1000;
  const R = 1 / input.icTasinim_h_Wm2K + t / input.yalitimLambda_WmK + 1 / input.disTasinim_h_Wm2K;
  const U = 1 / R;
  const rho = 1.2;
  const cp = 1006;
  const mdot = (rho * input.debi_m3h) / 3600;
  const ntu = (U * cevre * input.kanalUzunlugu_m) / (mdot * cp);
  const Tc = input.ortamSicakligi_C + (input.girisSicakligi_C - input.ortamSicakligi_C) * Math.exp(-ntu);
  const dusum = Math.abs(input.girisSicakligi_C - Tc);
  const Q = mdot * cp * (Tc - input.girisSicakligi_C);
  const status = dusum <= input.izinVerilenDusum_K ? "uygun" : dusum <= 1.25 * input.izinVerilenDusum_K ? "sinirda" : "uygunsuz";
  return {
    value: { cikisSicakligi_C: Tc },
    intermediates: {
      U_Wm2K: U,
      kanal_cevresi_m: cevre,
      kutle_debisi_kgs: mdot,
      NTU: ntu,
      sicaklik_degisimi_K: Tc - input.girisSicakligi_C,
      isi_alisverisi_W: Q,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: `Sıcaklık değişimi ${dusum.toFixed(2)} K, izin ${input.izinVerilenDusum_K} K. Kanal sızıntısı, radyasyon ve nem yoğuşması hesaba katılmaz; hava ρ = 1,2 kg/m³, cp = 1006 J/kgK`,
    },
  };
}

export const kanalBoyuncaSicaklikDegisimi: CalcModule<KanalBoyuncaSicaklikDegisimiInput, KanalBoyuncaSicaklikDegisimiOutput> = {
  id: "kanal-boyunca-sicaklik-degisimi",
  title: "Hava Kanalı Boyunca Sıcaklık Değişimi",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: kanalBoyuncaSicaklikDegisimiInputSchema,
  compute,
};
