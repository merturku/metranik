import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Rankine aktif toprak basıncı teorisi: Ka = tan²(45° - φ/2),
// toplam aktif itki (birim uzunluk başına) Pa = 0.5 × γ × H² × Ka.
// γ: zeminin birim hacim ağırlığı (kN/m³), H: duvar yüksekliği (m),
// φ: zeminin içsel sürtünme açısı (derece). Kohezyonsuz, yatay dolgu yüzeyi
// ve sürtünmesiz duvar arkası varsayımıyla klasik Rankine çözümü.
export const istinatDuvariAktifToprakBasinciInputSchema = z.object({
  birimHacimAgirlik_gamma_kNm3: z.number().positive(),
  duvarYuksekligi_H_m: z.number().positive(),
  icselSurtunmeAcisi_phi_derece: z.number().positive().max(89),
});

export type IstinatDuvariAktifToprakBasinciInput = z.infer<
  typeof istinatDuvariAktifToprakBasinciInputSchema
>;

export interface IstinatDuvariAktifToprakBasinciOutput {
  aktifItki_Pa_kNm: number;
}

function compute(
  input: IstinatDuvariAktifToprakBasinciInput,
): CalcResult<IstinatDuvariAktifToprakBasinciOutput> {
  const phiRad = (input.icselSurtunmeAcisi_phi_derece * Math.PI) / 180;
  const ka = Math.tan(Math.PI / 4 - phiRad / 2) ** 2;
  const aktifItki_Pa_kNm =
    0.5 * input.birimHacimAgirlik_gamma_kNm3 * input.duvarYuksekligi_H_m ** 2 * ka;
  const uygulamaNoktasi_m = input.duvarYuksekligi_H_m / 3;

  return {
    value: { aktifItki_Pa_kNm },
    intermediates: {
      aktifToprakBasincKatsayisi_Ka: Number(ka.toFixed(4)),
      uygulamaNoktasi_tabandanYukseklik_m: Number(uygulamaNoktasi_m.toFixed(3)),
    },
    standardsUsed: ["Rankine Aktif Toprak Basıncı Teorisi"],
  };
}

export const istinatDuvariAktifToprakBasinci: CalcModule<
  IstinatDuvariAktifToprakBasinciInput,
  IstinatDuvariAktifToprakBasinciOutput
> = {
  id: "istinat-duvari-aktif-toprak-basinci",
  title: "İstinat Duvarı Aktif Toprak Basıncı",
  discipline: "insaat",
  standards: ["Rankine Aktif Toprak Basıncı Teorisi"],
  inputSchema: istinatDuvariAktifToprakBasinciInputSchema,
  compute,
};
