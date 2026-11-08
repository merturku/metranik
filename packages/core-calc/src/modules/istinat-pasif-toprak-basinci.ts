import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rankine pasif toprak basıncı (yatay yüzey, sürtünmesiz düşey duvar):
// Kp = tan²(45° + φ/2),  Pp = ½·γ·H²·Kp + 2·c·H·√Kp  [kN/m].
// Aktif basınç modülünün karşılığı; devrilme/kayma kontrollerinde pasif direnç olarak kullanılır.
// Pasif direncin tam mobilize olması büyük deplasman ister: tasarımda genellikle azaltılır
// (güvenlik sayısı) ve üst zemin tabakası (donma/kazı riski) ihmal edilir.
export const istinatPasifToprakBasinciInputSchema = z.object({
  birimHacimAgirlik_kNm3: z.number().positive(),
  yukseklik_m: z.number().positive(),
  icSurtunmeAcisi_derece: z.number().min(0).max(50),
  kohezyon_kPa: z.number().min(0),
});

export type IstinatPasifToprakBasinciInput = z.infer<typeof istinatPasifToprakBasinciInputSchema>;

export interface IstinatPasifToprakBasinciOutput {
  pasifKuvvet_kNm: number;
}

function compute(input: IstinatPasifToprakBasinciInput): CalcResult<IstinatPasifToprakBasinciOutput> {
  const phi = (input.icSurtunmeAcisi_derece * Math.PI) / 180;
  const kp = Math.tan(Math.PI / 4 + phi / 2) ** 2;
  const H = input.yukseklik_m;
  const surtunme = 0.5 * input.birimHacimAgirlik_kNm3 * H * H * kp;
  const kohezyon = 2 * input.kohezyon_kPa * H * Math.sqrt(kp);
  return {
    value: { pasifKuvvet_kNm: surtunme + kohezyon },
    intermediates: {
      pasif_katsayi_Kp: kp,
      surtunme_bileseni_kNm: surtunme,
      kohezyon_bileseni_kNm: kohezyon,
      taban_pasif_gerilmesi_kPa: input.birimHacimAgirlik_kNm3 * H * kp + 2 * input.kohezyon_kPa * Math.sqrt(kp),
    },
    standardsUsed: ["Rankine pasif toprak basıncı teorisi"],
  };
}

export const istinatPasifToprakBasinci: CalcModule<IstinatPasifToprakBasinciInput, IstinatPasifToprakBasinciOutput> = {
  id: "istinat-pasif-toprak-basinci",
  title: "Pasif Toprak Basıncı (Rankine)",
  discipline: "insaat",
  standards: [],
  inputSchema: istinatPasifToprakBasinciInputSchema,
  compute,
};
