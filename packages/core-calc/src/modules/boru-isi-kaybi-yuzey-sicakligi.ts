import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Düzlemsel (ince yalıtım) yaklaşımı: iletim R = t/k ile dış taşınım R = 1/h seri
// bağlıdır, Tyüzey = Tiç - (Tiç - Tortam)×Riletim/(Riletim + Rtaşınım). Boru çapı
// yalıtım kalınlığına göre küçükse silindirik model (Yalıtımlı Boru Yüzey
// Sıcaklığı, ASTM C1055) kullanılmalıdır.
export const boruIsiKaybiYuzeySchema = z.object({
  ic_sicaklik_C: z.number(),
  ortam_sicakligi_C: z.number(),
  isolasyon_kalınligi_mm: z.number().positive(),
  max_yuzey_sicakligi_C: z.number(),
});

export type BoruIsiKaybiYuzeyInput = z.infer<typeof boruIsiKaybiYuzeySchema>;

export interface BoruIsiKaybiYuzeyOutput {
  yuzey_sicakligi_C: number;
}

const YALITIM_ILETKENLIGI_W_MK = 0.04;
const DIS_TASINIM_KATSAYISI_W_M2K = 10;

function compute(input: BoruIsiKaybiYuzeyInput): CalcResult<BoruIsiKaybiYuzeyOutput> {
  const iletimDirenci = input.isolasyon_kalınligi_mm / 1000 / YALITIM_ILETKENLIGI_W_MK;
  const tasinimDirenci = 1 / DIS_TASINIM_KATSAYISI_W_M2K;
  const toplamFark = input.ic_sicaklik_C - input.ortam_sicakligi_C;
  const yuzeySicakligi =
    input.ic_sicaklik_C - (toplamFark * iletimDirenci) / (iletimDirenci + tasinimDirenci);

  return {
    value: { yuzey_sicakligi_C: yuzeySicakligi },
    intermediates: {
      iletim_direnci_m2KW: iletimDirenci,
      tasinim_direnci_m2KW: tasinimDirenci,
      isi_akisi_Wm2: toplamFark / (iletimDirenci + tasinimDirenci),
    },
    standardsUsed: ["ASTM C1055"],
    verdict:
      yuzeySicakligi <= input.max_yuzey_sicakligi_C
        ? {
            status: "uygun",
            note: `Yüzey ${yuzeySicakligi.toFixed(1)} °C ≤ ${input.max_yuzey_sicakligi_C} °C dokunma sınırı.`,
          }
        : {
            status: "uygunsuz",
            note: `Yüzey ${yuzeySicakligi.toFixed(1)} °C > ${input.max_yuzey_sicakligi_C} °C: temas yanığı riski, yalıtım kalınlığını artırın.`,
          },
  };
}

export const boruIsiKaybiYuzeySicakligi: CalcModule<BoruIsiKaybiYuzeyInput, BoruIsiKaybiYuzeyOutput> = {
  id: "boru-isi-kaybi-yuzey-sicakligi",
  title: "Yalıtımlı Boru Yüzey Sıcaklığı",
  discipline: "mekanik",
  standards: ["ASTM C1055"],
  inputSchema: boruIsiKaybiYuzeySchema,
  compute,
};
