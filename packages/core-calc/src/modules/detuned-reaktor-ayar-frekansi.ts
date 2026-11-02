import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Seri reaktörlü (detuned) kompanzasyon ayar frekansı (IEC 61642 / IEC 60831): fr = fn/√(p/100),
// p = reaktör oranı % (XL/XC): 5,67 → 210 Hz, 7 → 189 Hz, 14 → 134 Hz (50 Hz şebekede).
// fr, şebekedeki en düşük baskın harmonik frekansının (5. = 250 Hz) altında kalmalıdır; güvenli pay %10 alınmıştır.
export const detunedReaktorAyarFrekansiInputSchema = z.object({
  sebekeFrekansi_Hz: z.enum(["50", "60"]),
  reaktorOrani_yuzde: z.number().min(1).max(30),
  enDusukHarmonik: z.number().int().min(2).max(7),
});

export type DetunedReaktorAyarFrekansiInput = z.infer<typeof detunedReaktorAyarFrekansiInputSchema>;

export interface DetunedReaktorAyarFrekansiOutput {
  ayarFrekansi_Hz: number;
}

function compute(input: DetunedReaktorAyarFrekansiInput): CalcResult<DetunedReaktorAyarFrekansiOutput> {
  const fn = Number(input.sebekeFrekansi_Hz);
  const fr = fn / Math.sqrt(input.reaktorOrani_yuzde / 100);
  const hSinir = input.enDusukHarmonik * fn;
  const uygun = fr <= 0.9 * hSinir;
  return {
    value: { ayarFrekansi_Hz: fr },
    intermediates: {
      ayar_harmonigi: fr / fn,
      baskin_harmonik_frekansi_Hz: hSinir,
      pay_yuzde: (1 - fr / hSinir) * 100,
    },
    standardsUsed: ["IEC 61642"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `Ayar frekansı ${fr.toFixed(0)} Hz, ${input.enDusukHarmonik}. harmonik (${hSinir} Hz) altında %10'dan fazla payla kalıyor.`
        : `Ayar frekansı ${fr.toFixed(0)} Hz, ${input.enDusukHarmonik}. harmoniğe (${hSinir} Hz) çok yakın/üstünde; reaktör oranını artırın.`,
    },
  };
}

export const detunedReaktorAyarFrekansi: CalcModule<DetunedReaktorAyarFrekansiInput, DetunedReaktorAyarFrekansiOutput> = {
  id: "detuned-reaktor-ayar-frekansi",
  title: "Seri Reaktörlü Kompanzasyon Ayar Frekansı",
  discipline: "elektrik",
  standards: ["IEC 61642"],
  inputSchema: detunedReaktorAyarFrekansiInputSchema,
  compute,
};
