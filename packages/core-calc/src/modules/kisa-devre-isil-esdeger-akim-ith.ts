import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// IEC 60909-0 §4.8: Ith = Ik″·√(m + n); m = (e^(4fTk·ln(κ−1)) − 1)/(2fTk·ln(κ−1)); eşdeğer 1 s akım Ith·√(Tk/Tkr).
export const kisaDevreIsilEsdegerAkimIthInputSchema = z.object({
  ik_kA: z.number().positive(),
  kappa: z.number().gt(1).max(2),
  sure_s: z.number().positive(),
  frekans_Hz: z.number().positive(),
  n: z.number().min(0).max(1),
  ithr_kA: z.number().positive(),
  tkr_s: z.number().positive(),
});

export type KisaDevreIsilEsdegerAkimIthInput = z.infer<typeof kisaDevreIsilEsdegerAkimIthInputSchema>;

export interface KisaDevreIsilEsdegerAkimIthOutput {
  ith_kA: number;
}

function compute(input: KisaDevreIsilEsdegerAkimIthInput): CalcResult<KisaDevreIsilEsdegerAkimIthOutput> {
  const x = Math.log(input.kappa - 1);
  const a = input.frekans_Hz * input.sure_s;
  const m = Math.abs(x) < 1e-9 ? 2 : (Math.exp(4 * a * x) - 1) / (2 * a * x);
  const katsayi = Math.sqrt(m + input.n);
  const ith = input.ik_kA * katsayi;
  const esdeger = ith * Math.sqrt(input.sure_s / input.tkr_s);
  const oran = esdeger / input.ithr_kA;
  return {
    value: { ith_kA: ith },
    intermediates: {
      m_faktoru: m,
      sqrt_m_n: katsayi,
      esdeger_akim_nominal_sure_kA: esdeger,
      kullanim_orani: oran,
    },
    standardsUsed: ["IEC 60909-0"],
    verdict:
      oran <= 0.95
        ? { status: "uygun", note: "Eşdeğer ısıl akım, kısa süreli dayanım akımının %95'inin altında." }
        : oran <= 1
          ? { status: "sinirda", note: "Eşdeğer ısıl akım dayanım akımına çok yakın (%95–100)." }
          : { status: "uygunsuz", note: "Eşdeğer ısıl akım nominal kısa süreli dayanım akımını aşıyor." },
  };
}

export const kisaDevreIsilEsdegerAkimIth: CalcModule<KisaDevreIsilEsdegerAkimIthInput, KisaDevreIsilEsdegerAkimIthOutput> = {
  id: "kisa-devre-isil-esdeger-akim-ith",
  title: "Kısa Devre Isıl Eşdeğer Akım (Ith) ve Dayanım Kontrolü",
  discipline: "elektrik",
  standards: ["IEC 60909-0"],
  inputSchema: kisaDevreIsilEsdegerAkimIthInputSchema,
  compute,
};
