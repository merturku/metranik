import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıtma kesildiğinde oda soğuması (tek kapasiteli ısıl model):
// C·dT/dt = −H·(T − Te)  →  T(t) = Te + (Ti − Te)·e^(−t/τ),  τ = C/H
// → t = τ·ln((Ti − Te)/(Thedef − Te)).  H toplam ısı kaybı katsayısı (iletim + havalandırma, W/K),
// C etkin ısıl kütle (MJ/K). Dış sıcaklık sabit, iç kazanç yok kabul edilir.
export const odaSogumaSuresiInputSchema = z
  .object({
    isiKaybiKatsayisi_WK: z.number().positive(),
    isilKutle_MJK: z.number().positive(),
    baslangicSicakligi_C: z.number(),
    disSicaklik_C: z.number(),
    hedefSicaklik_C: z.number(),
  })
  .refine((v) => v.disSicaklik_C < v.hedefSicaklik_C && v.hedefSicaklik_C < v.baslangicSicakligi_C, {
    message: "Dış < hedef < başlangıç sıcaklığı olmalı",
  });

export type OdaSogumaSuresiInput = z.infer<typeof odaSogumaSuresiInputSchema>;

export interface OdaSogumaSuresiOutput {
  sure_saat: number;
}

function compute(input: OdaSogumaSuresiInput): CalcResult<OdaSogumaSuresiOutput> {
  const tauSaat = (input.isilKutle_MJK * 1e6) / input.isiKaybiKatsayisi_WK / 3600;
  const t = tauSaat * Math.log((input.baslangicSicakligi_C - input.disSicaklik_C) / (input.hedefSicaklik_C - input.disSicaklik_C));
  return {
    value: { sure_saat: t },
    intermediates: {
      zaman_sabiti_saat: tauSaat,
      sure_dk: t * 60,
      baslangic_isi_kaybi_W: input.isiKaybiKatsayisi_WK * (input.baslangicSicakligi_C - input.disSicaklik_C),
      denge_sicakligi_C: input.disSicaklik_C,
    },
    standardsUsed: ["Birinci mertebeden ısıl model (Newton soğuma yasası)"],
  };
}

export const odaSogumaSuresi: CalcModule<OdaSogumaSuresiInput, OdaSogumaSuresiOutput> = {
  id: "oda-soguma-suresi",
  title: "Oda Soğuma Süresi (Isıl Zaman Sabiti)",
  discipline: "ev",
  standards: [],
  inputSchema: odaSogumaSuresiInputSchema,
  compute,
};
