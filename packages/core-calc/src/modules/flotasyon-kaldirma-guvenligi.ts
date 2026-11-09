import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yapının su kaldırma kuvvetine (uplift/flotasyon) karşı güvenliği: U = γw·hw·A (Arşimed/hidrostatik), FS = W/U.
// Bodrum, havuz, depo ve gömülü tank için; W yapı + sabit yükler (zemin sürtünmesi ve ankraj dahil değil, güvenli taraf). EN 1997-1 UPL durumu kısmi katsayılı kontrol ayrıca yapılmalıdır.
const GAMMA_W = 9.81;

export const flotasyonKaldirmaGuvenligiInputSchema = z.object({
  tabanAlani_m2: z.number().positive(),
  suYuksekligi_m: z.number().min(0),
  stabilizeEdenYuk_kN: z.number().positive(),
  gerekliFS: z.number().min(1).max(3),
});

export type FlotasyonKaldirmaGuvenligiInput = z.infer<typeof flotasyonKaldirmaGuvenligiInputSchema>;

export interface FlotasyonKaldirmaGuvenligiOutput {
  guvenlikKatsayisi: number | null;
}

function compute(input: FlotasyonKaldirmaGuvenligiInput): CalcResult<FlotasyonKaldirmaGuvenligiOutput> {
  const u = GAMMA_W * input.suYuksekligi_m * input.tabanAlani_m2;
  const fs = u === 0 ? null : input.stabilizeEdenYuk_kN / u;
  const gereken = input.gerekliFS * u;
  return {
    value: { guvenlikKatsayisi: fs },
    intermediates: {
      kaldirma_kuvveti_kN: u,
      gereken_agirlik_kN: gereken,
      ek_agirlik_ihtiyaci_kN: Math.max(0, gereken - input.stabilizeEdenYuk_kN),
    },
    standardsUsed: ["Hidrostatik kaldırma (Arşimed); EN 1997-1 UPL (ayrıca kontrol)"],
    verdict:
      fs === null
        ? { status: "uygun", note: "Taban altında su basıncı yok." }
        : fs >= input.gerekliFS
          ? { status: "uygun", note: "FS ≥ gerekli." }
          : fs >= 1
            ? { status: "sinirda", note: "FS 1'in üstünde ama gerekli değerin altında." }
            : { status: "uygunsuz", note: "FS < 1: yapı yüzer; ankraj/ağırlık artırımı gerekir." },
  };
}

export const flotasyonKaldirmaGuvenligi: CalcModule<FlotasyonKaldirmaGuvenligiInput, FlotasyonKaldirmaGuvenligiOutput> = {
  id: "flotasyon-kaldirma-guvenligi",
  title: "Su Kaldırma Kuvveti (Flotasyon) Güvenliği",
  discipline: "insaat",
  standards: ["EN 1997-1"],
  inputSchema: flotasyonKaldirmaGuvenligiInputSchema,
  compute,
};
