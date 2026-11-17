import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Trapez açık kanal Manning: Q(y) = (1/n)·A·R^(2/3)·S^(1/2) artan fonksiyondur; normal derinlik ikiye bölmeyle bulunur.
const G = 9.80665;

export const trapezKanalManningNormalDerinlikInputSchema = z
  .object({
    q_m3s: z.number().positive(),
    b_m: z.number().min(0),
    z: z.number().min(0),
    n: z.number().positive(),
    s: z.number().positive(),
  })
  .refine((v) => v.b_m > 0 || v.z > 0, { message: "Taban genişliği ve şev eğimi aynı anda sıfır olamaz" });

export type TrapezKanalManningNormalDerinlikInput = z.infer<typeof trapezKanalManningNormalDerinlikInputSchema>;

export interface TrapezKanalManningNormalDerinlikOutput {
  normalDerinlik_m: number;
}

function compute(input: TrapezKanalManningNormalDerinlikInput): CalcResult<TrapezKanalManningNormalDerinlikOutput> {
  const { b_m: b, z, n, s } = input;
  const geo = (y: number) => {
    const A = (b + z * y) * y;
    const P = b + 2 * y * Math.sqrt(1 + z * z);
    const T = b + 2 * z * y;
    const Q = (A * Math.pow(A / P, 2 / 3) * Math.sqrt(s)) / n;
    return { A, P, T, Q };
  };
  let lo = 0;
  let hi = 1;
  while (geo(hi).Q < input.q_m3s && hi < 1e4) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (geo(mid).Q < input.q_m3s) lo = mid;
    else hi = mid;
  }
  const y = (lo + hi) / 2;
  const g = geo(y);
  const V = input.q_m3s / g.A;
  const Fr = V / Math.sqrt((G * g.A) / g.T);
  return {
    value: { normalDerinlik_m: y },
    intermediates: {
      hiz_ms: V,
      alan_m2: g.A,
      hidrolik_yaricap_m: g.A / g.P,
      froude: Fr,
      rejim: Fr < 0.95 ? "Alt-kritik (nehir)" : Fr > 1.05 ? "Üst-kritik (sel)" : "Kritiğe yakın (kararsız)",
    },
    standardsUsed: ["Manning denklemi"],
  };
}

export const trapezKanalManningNormalDerinlik: CalcModule<
  TrapezKanalManningNormalDerinlikInput,
  TrapezKanalManningNormalDerinlikOutput
> = {
  id: "trapez-kanal-manning-normal-derinlik",
  title: "Trapez Açık Kanal Normal Derinlik (Manning)",
  discipline: "insaat",
  standards: [],
  inputSchema: trapezKanalManningNormalDerinlikInputSchema,
  compute,
};
