import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Şebeke gerilim harmonik bozulması (THDv), kısa devre empedansından:
// Zsc = U²/Ssc (fazlar arası eşdeğer),  Vh% = √3·Ih·h·Zsc/U · 100,  THDv = √(ΣVh²).
// Empedansın harmonikle doğrusal arttığı (indüktif, h·X) varsayılır; rezonans ve yük empedansı ihmal edilir.
// EN 50160: her bir harmonik sınırı ve THDv ≤ %8 (95 % haftalık değerler, OG/AG).
export const sebekeGerilimHarmonikBozulmasiInputSchema = z.object({
  hatGerilimi_V: z.number().positive(),
  kisaDevreGucu_MVA: z.number().positive(),
  akim5_A: z.number().min(0),
  akim7_A: z.number().min(0),
  akim11_A: z.number().min(0),
  akim13_A: z.number().min(0),
});

export type SebekeGerilimHarmonikBozulmasiInput = z.infer<typeof sebekeGerilimHarmonikBozulmasiInputSchema>;

export interface SebekeGerilimHarmonikBozulmasiOutput {
  thdv_yuzde: number;
}

function compute(input: SebekeGerilimHarmonikBozulmasiInput): CalcResult<SebekeGerilimHarmonikBozulmasiOutput> {
  const zsc = input.hatGerilimi_V ** 2 / (input.kisaDevreGucu_MVA * 1e6);
  const vh = (ih: number, h: number) => ((Math.sqrt(3) * ih * h * zsc) / input.hatGerilimi_V) * 100;
  const v5 = vh(input.akim5_A, 5);
  const v7 = vh(input.akim7_A, 7);
  const v11 = vh(input.akim11_A, 11);
  const v13 = vh(input.akim13_A, 13);
  const thd = Math.sqrt(v5 ** 2 + v7 ** 2 + v11 ** 2 + v13 ** 2);
  const status = thd <= 5 ? "uygun" : thd <= 8 ? "sinirda" : "uygunsuz";
  return {
    value: { thdv_yuzde: thd },
    intermediates: {
      Zsc_ohm: zsc,
      V5_yuzde: v5,
      V7_yuzde: v7,
      V11_yuzde: v11,
      V13_yuzde: v13,
    },
    standardsUsed: ["EN 50160 (THDv ≤ %8)"],
    verdict: {
      status,
      note:
        status === "uygun"
          ? "THDv %5 altında."
          : status === "sinirda"
            ? "THDv %5–8: EN 50160 sınırına yaklaşıyor."
            : "THDv EN 50160 sınırı olan %8'i aşıyor; filtre/detuned reaktör veya daha güçlü bağlantı noktası gerekir.",
    },
  };
}

export const sebekeGerilimHarmonikBozulmasi: CalcModule<SebekeGerilimHarmonikBozulmasiInput, SebekeGerilimHarmonikBozulmasiOutput> = {
  id: "sebeke-gerilim-harmonik-bozulmasi",
  title: "Şebeke Gerilim Harmonik Bozulması (THDv)",
  discipline: "elektrik",
  standards: ["EN 50160"],
  inputSchema: sebekeGerilimHarmonikBozulmasiInputSchema,
  compute,
};
