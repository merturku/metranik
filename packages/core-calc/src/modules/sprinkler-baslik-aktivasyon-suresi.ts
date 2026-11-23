import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sprinkler/dedektör başlığı ısıl tepki modeli (sabit gaz sıcaklığı ve hızı):
// dTb/dt = √u/RTI · (Tg − Tb)  →  t = (RTI/√u)·ln[(Tg − Ta)/(Tg − Tact)]  (Heskestad & Bill, NFPA 13/UL 199 RTI tanımı).
export const sprinklerBaslikAktivasyonSuresiInputSchema = z.object({
  rti_m05s05: z.number().positive(),
  gazHizi_m_s: z.number().positive(),
  gazSicakligi_C: z.number(),
  ortamSicakligi_C: z.number(),
  aktivasyonSicakligi_C: z.number(),
});
export type SprinklerBaslikAktivasyonSuresiInput = z.infer<typeof sprinklerBaslikAktivasyonSuresiInputSchema>;
export interface SprinklerBaslikAktivasyonSuresiOutput {
  aktivasyonSuresi_s: number | null;
}

const STD = "NFPA 13 / UL 199 (RTI tanımı), Heskestad & Bill (1988) tek kapasiteli ısıl tepki modeli";

function compute(input: SprinklerBaslikAktivasyonSuresiInput): CalcResult<SprinklerBaslikAktivasyonSuresiOutput> {
  const { gazSicakligi_C: Tg, ortamSicakligi_C: Ta, aktivasyonSicakligi_C: Tact } = input;
  const tau = input.rti_m05s05 / Math.sqrt(input.gazHizi_m_s);
  if (Tact <= Ta) {
    return { value: { aktivasyonSuresi_s: null }, intermediates: { zaman_sabiti_s: tau }, standardsUsed: [STD], verdict: { status: "uygunsuz", note: "Aktivasyon sıcaklığı ortam sıcaklığından yüksek olmalı" } };
  }
  if (Tg <= Tact) {
    return { value: { aktivasyonSuresi_s: null }, intermediates: { zaman_sabiti_s: tau }, standardsUsed: [STD], verdict: { status: "uygunsuz", note: `Gaz sıcaklığı (${Tg} °C) aktivasyon sıcaklığına (${Tact} °C) ulaşmıyor; başlık açılmaz` } };
  }
  const t = tau * Math.log((Tg - Ta) / (Tg - Tact));
  return {
    value: { aktivasyonSuresi_s: t },
    intermediates: {
      zaman_sabiti_s: tau,
      isil_yaklasim_orani: (Tact - Ta) / (Tg - Ta),
      aktivasyon_suresi_dk: t / 60,
    },
    standardsUsed: [STD],
  };
}

export const sprinklerBaslikAktivasyonSuresi: CalcModule<SprinklerBaslikAktivasyonSuresiInput, SprinklerBaslikAktivasyonSuresiOutput> = {
  id: "sprinkler-baslik-aktivasyon-suresi",
  title: "Sprinkler Başlığı Aktivasyon Süresi (RTI)",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: sprinklerBaslikAktivasyonSuresiInputSchema,
  compute,
};
