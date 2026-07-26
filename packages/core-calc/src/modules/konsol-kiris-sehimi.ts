import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ankastre (konsol) kirişte, üniform yayılı yükle ucundaki maksimum sehim
// (klasik kiriş teorisi): δ = w×L⁴ / (8×E×I).
// w: yayılı yük (N/m), L: konsol açıklığı (m), E: elastisite modülü (Pa),
// I: atalet momenti (m⁴). Konsol elemanlar için servis sınırı olarak basit
// mesnetli kirişlerden daha sıkı bir değer, yaygın pratikte L/180 kullanılır.
export const konsolKirisSehimiInputSchema = z.object({
  yayiliYuk_w_Nm: z.number().positive(),
  aciklik_L_m: z.number().positive(),
  elastisiteModulu_E_Pa: z.number().positive(),
  ataletMomenti_I_m4: z.number().positive(),
});

export type KonsolKirisSehimiInput = z.infer<typeof konsolKirisSehimiInputSchema>;

export interface KonsolKirisSehimiOutput {
  sehim_mm: number;
}

function compute(input: KonsolKirisSehimiInput): CalcResult<KonsolKirisSehimiOutput> {
  const sehim_m =
    (input.yayiliYuk_w_Nm * input.aciklik_L_m ** 4) /
    (8 * input.elastisiteModulu_E_Pa * input.ataletMomenti_I_m4);
  const sehim_mm = sehim_m * 1000;
  const sinirSehim_mm = (input.aciklik_L_m * 1000) / 180;

  return {
    value: { sehim_mm },
    intermediates: {
      sinirSehim_L180_mm: Number(sinirSehim_mm.toFixed(2)),
    },
    standardsUsed: [],
    verdict:
      sehim_mm <= sinirSehim_mm
        ? { status: "uygun", note: "Hesaplanan sehim L/180 servis sınırının altında." }
        : { status: "uygunsuz", note: "Hesaplanan sehim L/180 servis sınırını aşıyor." },
  };
}

export const konsolKirisSehimi: CalcModule<KonsolKirisSehimiInput, KonsolKirisSehimiOutput> = {
  id: "konsol-kiris-sehimi",
  title: "Konsol Kiriş Ucu Sehimi",
  discipline: "insaat",
  standards: [],
  inputSchema: konsolKirisSehimiInputSchema,
  compute,
};
