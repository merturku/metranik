import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// PV modül çıkış gücünün hücre sıcaklığına bağlı düşümü (IEC 61215 NOCT tanımı, IEC 61853):
// Thücre = Tortam + (NOCT − 20)/800 · G   (NOCT: 800 W/m², 20 °C ortam, 1 m/s rüzgar)
// P = Pstc · (G/1000) · [1 + γ·(Thücre − 25)],  γ güç sıcaklık katsayısı (1/K, negatif; üretici veri sayfası).
export const pvHucreSicakligiGucInputSchema = z.object({
  pstc_W: z.number().positive(),
  isinim_Wm2: z.number().min(0).max(1500),
  ortamSicakligi_C: z.number().min(-50).max(60),
  noct_C: z.number().min(35).max(55),
  gucSicaklikKatsayisi_1K: z.number().min(-0.01).max(0),
});

export type PvHucreSicakligiGucInput = z.infer<typeof pvHucreSicakligiGucInputSchema>;

export interface PvHucreSicakligiGucOutput {
  guc_W: number;
}

function compute(input: PvHucreSicakligiGucInput): CalcResult<PvHucreSicakligiGucOutput> {
  const tc = input.ortamSicakligi_C + ((input.noct_C - 20) / 800) * input.isinim_Wm2;
  const sicaklikCarpani = 1 + input.gucSicaklikKatsayisi_1K * (tc - 25);
  const p = input.pstc_W * (input.isinim_Wm2 / 1000) * sicaklikCarpani;
  const pIsinimSadece = input.pstc_W * (input.isinim_Wm2 / 1000);
  return {
    value: { guc_W: p },
    intermediates: {
      hucre_sicakligi_C: tc,
      sicaklik_carpani: sicaklikCarpani,
      sicaklik_kaybi_W: pIsinimSadece - p,
      sicaklik_kaybi_yuzde: (1 - sicaklikCarpani) * 100,
    },
    standardsUsed: ["IEC 61215 (NOCT)", "IEC 61853"],
  };
}

export const pvHucreSicakligiGuc: CalcModule<PvHucreSicakligiGucInput, PvHucreSicakligiGucOutput> = {
  id: "pv-hucre-sicakligi-guc",
  title: "GES Panel Hücre Sıcaklığı ve Güç Kaybı",
  discipline: "ev",
  standards: ["IEC 61215", "IEC 61853"],
  inputSchema: pvHucreSicakligiGucInputSchema,
  compute,
};
