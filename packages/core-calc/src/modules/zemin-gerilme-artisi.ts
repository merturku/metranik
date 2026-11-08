import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Zeminde derinlikle düşey gerilme artışı Δσz:
//  • "iki-bir": 2V:1H yayılma, Δσ = P/((B + z)(L + z)) (dikdörtgen temel altı, merkez).
//  • "boussinesq": noktasal yük, Δσ = 3P/(2π z²)·[1/(1 + (r/z)²)]^(5/2) (elastik yarı uzay).
// Zemin Konsolidasyon Oturması ve Temel Elastik Oturması modüllerinin gerilim girdisini üretir.
// 2:1 yaklaşımı kaba bir ön değerdir; ince hesapta Newmark/Boussinesq dikdörtgen integrali kullanılır.
export const zeminGerilmeArtisiInputSchema = z.object({
  yontem: z.enum(["iki-bir", "boussinesq"]),
  yuk_kN: z.number().positive(),
  genislik_B_m: z.number().positive(),
  uzunluk_L_m: z.number().positive(),
  derinlik_z_m: z.number().positive(),
  yatayMesafe_r_m: z.number().min(0),
});

export type ZeminGerilmeArtisiInput = z.infer<typeof zeminGerilmeArtisiInputSchema>;

export interface ZeminGerilmeArtisiOutput {
  gerilmeArtisi_kPa: number;
}

function compute(input: ZeminGerilmeArtisiInput): CalcResult<ZeminGerilmeArtisiOutput> {
  const { yuk_kN: P, derinlik_z_m: z, genislik_B_m: B, uzunluk_L_m: L, yatayMesafe_r_m: r } = input;
  if (input.yontem === "iki-bir") {
    const q0 = P / (B * L);
    const d = P / ((B + z) * (L + z));
    return {
      value: { gerilmeArtisi_kPa: d },
      intermediates: { temel_basinci_kPa: q0, yayilmis_alan_m2: (B + z) * (L + z), gerilme_orani_Ds_q0: d / q0 },
      standardsUsed: ["2:1 yayılma yaklaşımı (klasik zemin mekaniği)"],
    };
  }
  const f = (1 / (1 + (r / z) ** 2)) ** 2.5;
  const d = ((3 * P) / (2 * Math.PI * z * z)) * f;
  return {
    value: { gerilmeArtisi_kPa: d },
    intermediates: { etki_katsayisi_IB: (3 / (2 * Math.PI)) * f, r_z_orani: r / z },
    standardsUsed: ["Boussinesq (1885) noktasal yük çözümü"],
  };
}

export const zeminGerilmeArtisi: CalcModule<ZeminGerilmeArtisiInput, ZeminGerilmeArtisiOutput> = {
  id: "zemin-gerilme-artisi",
  title: "Zeminde Gerilme Artışı (2:1 ve Boussinesq)",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminGerilmeArtisiInputSchema,
  compute,
};
