import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kararlı hâlde iletken sıcaklığı yaklaşık ilişkisi (IEC 60287 ısıl devre, sabit direnç yaklaşımı):
// ısıtma ∝ I²  →  Tc = Ta + (Tmaks − Ta)·(I/Iz)².  Iz, Ta ortam sıcaklığında Tmaks'a ulaşan akımdır
// (kurulum düzeltmeleri uygulanmış). Direncin sıcaklıkla artışı ihmal edilir → hafif iyimser.
export const kabloIletkenSicakligiInputSchema = z.object({
  isletmeAkimi_A: z.number().min(0),
  akimTasimaKapasitesi_A: z.number().positive(),
  ortamSicakligi_C: z.number().min(-40).max(80),
  izinVerilenSicaklik_C: z.number().min(60).max(250),
});

export type KabloIletkenSicakligiInput = z.infer<typeof kabloIletkenSicakligiInputSchema>;

export interface KabloIletkenSicakligiOutput {
  iletkenSicakligi_C: number;
}

function compute(input: KabloIletkenSicakligiInput): CalcResult<KabloIletkenSicakligiOutput> {
  const oran = input.isletmeAkimi_A / input.akimTasimaKapasitesi_A;
  const tc = input.ortamSicakligi_C + (input.izinVerilenSicaklik_C - input.ortamSicakligi_C) * oran ** 2;
  const uygun = tc <= input.izinVerilenSicaklik_C;
  return {
    value: { iletkenSicakligi_C: tc },
    intermediates: {
      yuklenme_orani: oran,
      sicaklik_artisi_K: tc - input.ortamSicakligi_C,
      sicaklik_payi_K: input.izinVerilenSicaklik_C - tc,
    },
    standardsUsed: ["IEC 60287 (ısıl devre, I² ilişkisi)", "IEC 60364-5-52"],
    verdict: {
      status: uygun ? (oran > 0.9 ? "sinirda" : "uygun") : "uygunsuz",
      note: uygun
        ? `İletken sıcaklığı ${tc.toFixed(1)} °C ≤ ${input.izinVerilenSicaklik_C} °C (yüklenme %${(oran * 100).toFixed(0)}).`
        : `İletken sıcaklığı ${tc.toFixed(1)} °C izin verilen ${input.izinVerilenSicaklik_C} °C'yi aşıyor (aşırı yüklenme).`,
    },
  };
}

export const kabloIletkenSicakligi: CalcModule<KabloIletkenSicakligiInput, KabloIletkenSicakligiOutput> = {
  id: "kablo-iletken-sicakligi",
  title: "Kablo İletken Sıcaklığı (Yüklenmeye Göre)",
  discipline: "elektrik",
  standards: ["IEC 60287", "IEC 60364-5-52"],
  inputSchema: kabloIletkenSicakligiInputSchema,
  compute,
};
