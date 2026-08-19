import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İstinat duvarı devrilme güvenliği: aktif toprak basıncı kuvvetinin taban
// köşesine göre oluşturduğu devirici moment, duvar+temel ağırlığının aynı
// noktaya göre direnç momentiyle karşılaştırılır.
// Mo = Pa×H/3 (üçgen basınç dağılımı, etki noktası tabandan H/3 yükseklikte),
// Mr = W×x̄, GS = Mr/Mo.
export const istinatDuvariDevrilmeGuvenligiInputSchema = z.object({
  aktifToprakBasinciKuvveti_Pa_kN: z.number().positive(),
  duvarYuksekligi_H_m: z.number().positive(),
  duvarAgirligi_W_kN: z.number().positive(),
  agirlikMerkeziMesafesi_x_m: z.number().positive(),
  gerekliGuvenlikKatsayisi: z.number().positive(),
});

export type IstinatDuvariDevrilmeGuvenligiInput = z.infer<
  typeof istinatDuvariDevrilmeGuvenligiInputSchema
>;

export interface IstinatDuvariDevrilmeGuvenligiOutput {
  guvenlikKatsayisi_GS: number;
}

function compute(
  input: IstinatDuvariDevrilmeGuvenligiInput,
): CalcResult<IstinatDuvariDevrilmeGuvenligiOutput> {
  const deviriciMomentKNm =
    (input.aktifToprakBasinciKuvveti_Pa_kN * input.duvarYuksekligi_H_m) / 3;
  const direncMomentiKNm = input.duvarAgirligi_W_kN * input.agirlikMerkeziMesafesi_x_m;
  const guvenlikKatsayisiGS = direncMomentiKNm / deviriciMomentKNm;

  return {
    value: { guvenlikKatsayisi_GS: guvenlikKatsayisiGS },
    intermediates: {
      deviriciMoment_kNm: deviriciMomentKNm,
      direncMomenti_kNm: direncMomentiKNm,
    },
    standardsUsed: [],
    verdict:
      guvenlikKatsayisiGS >= input.gerekliGuvenlikKatsayisi
        ? { status: "uygun", note: "Devrilme güvenlik katsayısı yeterli." }
        : { status: "uygunsuz", note: "Devrilme güvenlik katsayısı yetersiz." },
  };
}

export const istinatDuvariDevrilmeGuvenligi: CalcModule<
  IstinatDuvariDevrilmeGuvenligiInput,
  IstinatDuvariDevrilmeGuvenligiOutput
> = {
  id: "istinat-duvari-devrilme-guvenligi",
  title: "İstinat Duvarı Devrilme Güvenliği Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: istinatDuvariDevrilmeGuvenligiInputSchema,
  compute,
};
