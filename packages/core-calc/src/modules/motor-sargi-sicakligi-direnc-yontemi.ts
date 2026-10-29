import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sargı sıcaklığının direnç değişiminden bulunması (IEC 60034-1 §8.6.2.3):
// θ2 = (R2/R1)·(k + θ1) − k,  k = 234,5 (bakır) / 225 (alüminyum);  R1 soğuk (θ1), R2 sıcak direnç.
// Sıcaklık artışı Δθ = θ2 − θa. İzin verilen artış sınırları (IEC 60034-1 Tablo 8, direnç yöntemi,
// ortam ≤ 40 °C, yalıtım sınıfına göre): A 60, E 75, B 80, F 105, H 125 K.
const K_SABITI: Record<"bakir" | "aluminyum", number> = { bakir: 234.5, aluminyum: 225 };
const SINIF_SINIRI_K: Record<"A" | "E" | "B" | "F" | "H", number> = { A: 60, E: 75, B: 80, F: 105, H: 125 };

export const motorSargiSicakligiDirencYontemiInputSchema = z.object({
  soguk_direnc_ohm: z.number().positive(),
  soguk_sicaklik_C: z.number(),
  sicak_direnc_ohm: z.number().positive(),
  ortam_sicakligi_C: z.number(),
  iletkenMalzeme: z.enum(["bakir", "aluminyum"]),
  yalitimSinifi: z.enum(["A", "E", "B", "F", "H"]),
});

export type MotorSargiSicakligiDirencYontemiInput = z.infer<typeof motorSargiSicakligiDirencYontemiInputSchema>;

export interface MotorSargiSicakligiDirencYontemiOutput {
  sargiSicakligi_C: number;
}

function compute(
  input: MotorSargiSicakligiDirencYontemiInput,
): CalcResult<MotorSargiSicakligiDirencYontemiOutput> {
  const k = K_SABITI[input.iletkenMalzeme];
  const oran = input.sicak_direnc_ohm / input.soguk_direnc_ohm;
  const theta2 = oran * (k + input.soguk_sicaklik_C) - k;
  const artis = theta2 - input.ortam_sicakligi_C;
  const sinir = SINIF_SINIRI_K[input.yalitimSinifi];

  const verdict: CalcResult<MotorSargiSicakligiDirencYontemiOutput>["verdict"] =
    artis <= sinir
      ? {
          status: "uygun",
          note: `Sıcaklık artışı ${artis.toFixed(1)} K ≤ sınıf ${input.yalitimSinifi} sınırı ${sinir} K (IEC 60034-1, direnç yöntemi, ortam ≤ 40 °C).`,
        }
      : {
          status: "uygunsuz",
          note: `Sıcaklık artışı ${artis.toFixed(1)} K > sınıf ${input.yalitimSinifi} sınırı ${sinir} K: sargı aşırı ısınıyor, yük/soğutma/yalıtım sınıfı gözden geçirilmeli.`,
        };

  return {
    value: { sargiSicakligi_C: theta2 },
    intermediates: {
      direnc_orani_R2_R1: oran,
      sicaklik_artisi_K: artis,
      sinif_siniri_K: sinir,
      k_sabiti: k,
      ortam_notu:
        input.ortam_sicakligi_C > 40
          ? "Ortam 40 °C üzerinde: standart sınırlar bu koşul için doğrudan geçerli değildir (üretici azaltma verisi gerekir)."
          : "Ortam ≤ 40 °C: standart sınırlar geçerli.",
    },
    standardsUsed: ["IEC 60034-1"],
    verdict,
  };
}

export const motorSargiSicakligiDirencYontemi: CalcModule<
  MotorSargiSicakligiDirencYontemiInput,
  MotorSargiSicakligiDirencYontemiOutput
> = {
  id: "motor-sargi-sicakligi-direnc-yontemi",
  title: "Motor Sargı Sıcaklığı (Direnç Yöntemi)",
  discipline: "elektrik",
  standards: ["IEC 60034-1"],
  inputSchema: motorSargiSicakligiDirencYontemiInputSchema,
  compute,
};
