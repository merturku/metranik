import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Su sertliği birim dönüşümü (CaCO₃ eşdeğeri esas): 1 °fH (Fransız) = 10 mg/L; 1 °dH (Alman) = 17,848 mg/L;
// 1 gpg (ABD) = 17,118 mg/L; 1 mmol/L = 100,09 mg/L (CaCO₃ mol kütlesi); ppm ≡ mg/L.
// Sınıflandırma (WQA/USGS pratiği): < 60 yumuşak, 60–120 orta sert, 120–180 sert, > 180 çok sert (mg/L CaCO₃).
export const suSertligiBirimDonusumuInputSchema = z.object({
  deger: z.number().min(0),
  birim: z.enum(["fH", "dH", "ppm", "gpg", "mmol"]),
});

export type SuSertligiBirimDonusumuInput = z.infer<typeof suSertligiBirimDonusumuInputSchema>;

export interface SuSertligiBirimDonusumuOutput {
  ppm_CaCO3: number;
}

const PPM_CARPAN = { fH: 10, dH: 17.848, ppm: 1, gpg: 17.118, mmol: 100.09 } as const;

function compute(input: SuSertligiBirimDonusumuInput): CalcResult<SuSertligiBirimDonusumuOutput> {
  const ppm = input.deger * PPM_CARPAN[input.birim];
  const sinif = ppm < 60 ? "Yumuşak" : ppm < 120 ? "Orta sert" : ppm < 180 ? "Sert" : "Çok sert";
  return {
    value: { ppm_CaCO3: ppm },
    intermediates: {
      fransiz_fH: ppm / PPM_CARPAN.fH,
      alman_dH: ppm / PPM_CARPAN.dH,
      abd_gpg: ppm / PPM_CARPAN.gpg,
      mmol_L: ppm / PPM_CARPAN.mmol,
      sinif,
    },
    standardsUsed: ["Su kimyası birim dönüşümü (CaCO₃ eşdeğeri)"],
  };
}

export const suSertligiBirimDonusumu: CalcModule<SuSertligiBirimDonusumuInput, SuSertligiBirimDonusumuOutput> = {
  id: "su-sertligi-birim-donusumu",
  title: "Su Sertliği Birim Dönüşümü ve Sınıfı",
  discipline: "ev",
  standards: [],
  inputSchema: suSertligiBirimDonusumuInputSchema,
  compute,
};
