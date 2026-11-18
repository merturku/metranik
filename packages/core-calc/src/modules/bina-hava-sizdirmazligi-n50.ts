import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan basınçlandırma testi: n50 = V̇50/V; q50 = V̇50/Azarf; doğal infiltrasyon ≈ n50/N (LBL kuralı).
export const binaHavaSizdirmazligiN50InputSchema = z.object({
  q50_m3h: z.number().positive(),
  hacim_m3: z.number().positive(),
  zarfAlani_m2: z.number().positive(),
  korumaKatsayisi: z.number().positive(),
  sinirN50: z.number().positive(),
});

export type BinaHavaSizdirmazligiN50Input = z.infer<typeof binaHavaSizdirmazligiN50InputSchema>;

export interface BinaHavaSizdirmazligiN50Output {
  n50: number;
}

function compute(input: BinaHavaSizdirmazligiN50Input): CalcResult<BinaHavaSizdirmazligiN50Output> {
  const n50 = input.q50_m3h / input.hacim_m3;
  const nInf = n50 / input.korumaKatsayisi;
  return {
    value: { n50 },
    intermediates: {
      zarf_debisi_q50_m3hm2: input.q50_m3h / input.zarfAlani_m2,
      dogal_infiltrasyon_1h: nInf,
      infiltrasyon_debisi_m3h: nInf * input.hacim_m3,
    },
    standardsUsed: ["TS EN ISO 9972"],
    verdict:
      n50 <= input.sinirN50
        ? { status: "uygun", note: "n50 hedef sınırın altında." }
        : { status: "uygunsuz", note: "n50 hedef sınırı aşıyor; bina zarfında sızdırmazlık iyileştirmesi gerekir." },
  };
}

export const binaHavaSizdirmazligiN50: CalcModule<BinaHavaSizdirmazligiN50Input, BinaHavaSizdirmazligiN50Output> = {
  id: "bina-hava-sizdirmazligi-n50",
  title: "Bina Hava Sızdırmazlığı (n50, Blower Door)",
  discipline: "ev",
  standards: ["TS EN ISO 9972"],
  inputSchema: binaHavaSizdirmazligiN50InputSchema,
  compute,
};
