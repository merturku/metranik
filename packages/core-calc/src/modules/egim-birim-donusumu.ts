import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Eğim birim dönüşümü: derece α, yüzde s = 100·tanα, oran 1:n (n = 1/tanα, yatay:düşey değil düşey:yatay = 1:n).
// Rampa, çatı, drenaj ve boru eğimlerinde kullanılır. Yüzde 100 = 45°. α 0'a giderken 1:n → sonsuz.
export const egimBirimDonusumuInputSchema = z.object({
  birim: z.enum(["derece", "yuzde", "oran"]),
  deger: z.number().positive(),
});

export type EgimBirimDonusumuInput = z.infer<typeof egimBirimDonusumuInputSchema>;

export interface EgimBirimDonusumuOutput {
  egimYuzdesi: number;
}

function compute(input: EgimBirimDonusumuInput): CalcResult<EgimBirimDonusumuOutput> {
  let tan: number;
  if (input.birim === "derece") {
    tan = Math.tan((Math.min(input.deger, 89.999) * Math.PI) / 180);
  } else if (input.birim === "yuzde") {
    tan = input.deger / 100;
  } else {
    tan = 1 / input.deger; // 1:n
  }
  const derece = (Math.atan(tan) * 180) / Math.PI;
  return {
    value: { egimYuzdesi: tan * 100 },
    intermediates: {
      egim_derece: derece,
      egim_orani_1_n: tan > 0 ? 1 / tan : "—",
      egim_mm_per_m: tan * 1000,
    },
    standardsUsed: ["Trigonometrik bağıntı (tan α)"],
  };
}

export const egimBirimDonusumu: CalcModule<EgimBirimDonusumuInput, EgimBirimDonusumuOutput> = {
  id: "egim-birim-donusumu",
  title: "Eğim Birim Dönüşümü (° / % / 1:n)",
  discipline: "ev",
  standards: [],
  inputSchema: egimBirimDonusumuInputSchema,
  compute,
};
