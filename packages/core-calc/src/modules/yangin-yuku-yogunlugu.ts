import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yangın yükü yoğunluğu (TS EN 1991-1-2 Ek E / yangın yönetmeliği kavramı): q_f = Σ(m_i·H_i)/A_f  [MJ/m²].
// H_i malzeme alt ısıl değeri (MJ/kg): odun/selüloz ≈ 17,5; plastikler 30–45 (ürün verisi/EN 1991-1-2 Tablo E.3).
// Odun eşdeğeri q_f/17,5 kg/m². Risk sınıfı için ilgili yönetmelik eşiklerine bakın (bu modül sınıflandırma yapmaz).
export const yanginYukuYogunluguInputSchema = z.object({
  malzeme1Kutlesi_kg: z.number().min(0),
  malzeme1IsilDegeri_MJkg: z.number().min(0).max(60),
  malzeme2Kutlesi_kg: z.number().min(0),
  malzeme2IsilDegeri_MJkg: z.number().min(0).max(60),
  zeminAlani_m2: z.number().positive(),
});

export type YanginYukuYogunluguInput = z.infer<typeof yanginYukuYogunluguInputSchema>;

export interface YanginYukuYogunluguOutput {
  yanginYuku_MJm2: number;
}

function compute(input: YanginYukuYogunluguInput): CalcResult<YanginYukuYogunluguOutput> {
  const e1 = input.malzeme1Kutlesi_kg * input.malzeme1IsilDegeri_MJkg;
  const e2 = input.malzeme2Kutlesi_kg * input.malzeme2IsilDegeri_MJkg;
  const q = (e1 + e2) / input.zeminAlani_m2;
  return {
    value: { yanginYuku_MJm2: q },
    intermediates: {
      toplam_enerji_MJ: e1 + e2,
      malzeme1_enerji_MJ: e1,
      malzeme2_enerji_MJ: e2,
      odun_esdegeri_kgm2: q / 17.5,
      toplam_enerji_kWh: (e1 + e2) / 3.6,
    },
    standardsUsed: ["TS EN 1991-1-2 Ek E (yangın yükü yoğunluğu)"],
  };
}

export const yanginYukuYogunlugu: CalcModule<YanginYukuYogunluguInput, YanginYukuYogunluguOutput> = {
  id: "yangin-yuku-yogunlugu",
  title: "Yangın Yükü Yoğunluğu (MJ/m²)",
  discipline: "mekanik",
  standards: ["TS EN 1991-1-2"],
  inputSchema: yanginYukuYogunluguInputSchema,
  compute,
};
