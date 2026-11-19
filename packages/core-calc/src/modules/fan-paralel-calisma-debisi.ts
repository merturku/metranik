import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Özdeş n fan paralel: fan eğrisi ΔP = A + B·q + C·q² (fan başına), sistem ΔP = k·Q², Q = n·q
// (C − k·n²)·q² + B·q + A = 0 → pozitif kök
export const fanParalelCalismaDebisiInputSchema = z.object({
  A_Pa: z.number().positive(),
  B_Pa_per_m3s: z.number(),
  C_Pa_per_m3s2: z.number(),
  sistemK_Pa_per_m3s2: z.number().positive(),
  fanAdedi: z.number().int().min(1).max(8),
});

export type FanParalelCalismaDebisiInput = z.infer<typeof fanParalelCalismaDebisiInputSchema>;
export interface FanParalelCalismaDebisiOutput {
  toplamDebi_m3s: number | null;
}

function kok(A: number, B: number, C: number, k: number, n: number): number | null {
  const a = C - k * n * n;
  if (Math.abs(a) < 1e-12) return B !== 0 && -A / B > 0 ? -A / B : null;
  const disc = B * B - 4 * a * A;
  if (disc < 0) return null;
  const r1 = (-B + Math.sqrt(disc)) / (2 * a);
  const r2 = (-B - Math.sqrt(disc)) / (2 * a);
  const pos = [r1, r2].filter((r) => r > 0);
  return pos.length ? Math.min(...pos) : null;
}

function compute(input: FanParalelCalismaDebisiInput): CalcResult<FanParalelCalismaDebisiOutput> {
  const { A_Pa: A, B_Pa_per_m3s: B, C_Pa_per_m3s2: C, sistemK_Pa_per_m3s2: k, fanAdedi: n } = input;
  const q = kok(A, B, C, k, n);
  const q1 = kok(A, B, C, k, 1);
  if (q === null || q1 === null) {
    return {
      value: { toplamDebi_m3s: null },
      intermediates: { uyari: "Fan ve sistem eğrisi pozitif debide kesişmiyor; eğri katsayılarını kontrol edin" },
      standardsUsed: ["Fan–sistem eğrisi kesişimi (afinite/paralel çalışma)"],
      verdict: { status: "uygunsuz", note: "İşletme noktası bulunamadı" },
    };
  }
  const Q = n * q;
  const dp = k * Q * Q;
  return {
    value: { toplamDebi_m3s: Q },
    intermediates: {
      fan_basina_debi_m3s: q,
      toplam_debi_m3h: Q * 3600,
      sistem_basinci_Pa: dp,
      tek_fan_debisi_m3s: q1,
      debi_artis_orani: Q / q1,
      fan_egrisi_kontrol_Pa: A + B * q + C * q * q,
    },
    standardsUsed: ["Fan–sistem eğrisi kesişimi (afinite/paralel çalışma)"],
  };
}

export const fanParalelCalismaDebisi: CalcModule<FanParalelCalismaDebisiInput, FanParalelCalismaDebisiOutput> = {
  id: "fan-paralel-calisma-debisi",
  title: "Fanların Paralel Çalışma Debisi",
  discipline: "mekanik",
  standards: ["Fan–sistem eğrisi kesişimi (afinite/paralel çalışma)"],
  inputSchema: fanParalelCalismaDebisiInputSchema,
  compute,
};
