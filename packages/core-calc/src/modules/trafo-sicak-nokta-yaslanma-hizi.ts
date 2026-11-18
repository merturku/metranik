import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60076-7: θh = θa + Δθo + Δθh; V = 2^((θh−98)/6) (normal kâğıt) veya exp(15000/383 − 15000/(θh+273)) (termal iyileştirilmiş).
export const trafoSicakNoktaYaslanmaHiziInputSchema = z.object({
  ortamSicakligi_C: z.number(),
  ustYagArtisi_K: z.number().min(0),
  sicakNoktaGradyani_K: z.number().min(0),
  kagitTuru: z.enum(["normal", "termal"]),
});

export type TrafoSicakNoktaYaslanmaHiziInput = z.infer<typeof trafoSicakNoktaYaslanmaHiziInputSchema>;

export interface TrafoSicakNoktaYaslanmaHiziOutput {
  yaslanmaHizi: number;
}

function compute(input: TrafoSicakNoktaYaslanmaHiziInput): CalcResult<TrafoSicakNoktaYaslanmaHiziOutput> {
  const th = input.ortamSicakligi_C + input.ustYagArtisi_K + input.sicakNoktaGradyani_K;
  const V =
    input.kagitTuru === "normal"
      ? 2 ** ((th - 98) / 6)
      : Math.exp(15000 / 383 - 15000 / (th + 273));
  const omur_yil = 180000 / (V * 8760);
  const verdict =
    th <= 98
      ? { status: "uygun" as const, note: "Sıcak nokta 98 °C referansının altında; normal yaşlanma veya daha yavaş." }
      : th <= 120
        ? { status: "sinirda" as const, note: "Sıcak nokta 98 °C'nin üzerinde; yaşlanma hızlanıyor (IEC 60076-7 normal çevrimsel yükleme sınırı 120 °C)." }
        : { status: "uygunsuz" as const, note: "Sıcak nokta 120 °C'yi aşıyor; normal çevrimsel yükleme sınırının üzerinde." };
  return {
    value: { yaslanmaHizi: V },
    intermediates: {
      sicak_nokta_C: th,
      gunluk_esdeger_yaslanma_h: 24 * V,
      referans_omur_yil: omur_yil,
    },
    standardsUsed: ["IEC 60076-7"],
    verdict,
  };
}

export const trafoSicakNoktaYaslanmaHizi: CalcModule<TrafoSicakNoktaYaslanmaHiziInput, TrafoSicakNoktaYaslanmaHiziOutput> = {
  id: "trafo-sicak-nokta-yaslanma-hizi",
  title: "Trafo Sıcak Nokta Sıcaklığı ve Yalıtım Yaşlanma Hızı",
  discipline: "elektrik",
  standards: ["IEC 60076-7"],
  inputSchema: trafoSicakNoktaYaslanmaHiziInputSchema,
  compute,
};
