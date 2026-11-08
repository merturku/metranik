import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Eksenel simetrik duman tüyü (NFPA 92, Heskestad): alev yüksekliği zl = 0,166·Qc^(2/5) (m, kW).
// z > zl (alev üstü): m = 0,071·Qc^(1/3)·z^(5/3) + 0,0018·Qc  [kg/s];
// z ≤ zl (alev içi): m = 0,032·Qc^(3/5)·z.  Qc = yangının konvektif ısı yayılımı ≈ 0,7·Q (kW).
// Duman sıcaklığı T = T0 + Qc/(m·cp), cp = 1,0 kJ/kg·K; ρ = 353/T (kuru hava, 1 atm); tahliye debisi V̇ = m/ρ.
// z, yangın yüzeyinden duman tabakası alt sınırına olan temiz yüksekliktir. Eksenel simetri, tavan/duvar etkisi yok,
// sprinkler kontrolü yok; tasarım değerleri NFPA 92'ye ve yerel yönetmeliğe göre doğrulanmalıdır.
export const dumanTuyuKutleDebisiInputSchema = z.object({
  yanginGucu_kW: z.number().positive(),
  konvektifOran: z.number().gt(0).max(1),
  temizYukseklik_m: z.number().positive(),
  ortamSicakligi_C: z.number().min(-30).max(60),
});

export type DumanTuyuKutleDebisiInput = z.infer<typeof dumanTuyuKutleDebisiInputSchema>;

export interface DumanTuyuKutleDebisiOutput {
  dumanKutleDebisi_kgs: number;
}

function compute(input: DumanTuyuKutleDebisiInput): CalcResult<DumanTuyuKutleDebisiOutput> {
  const qc = input.yanginGucu_kW * input.konvektifOran;
  const z = input.temizYukseklik_m;
  const zl = 0.166 * qc ** 0.4;
  const alevUstu = z > zl;
  const m = alevUstu ? 0.071 * qc ** (1 / 3) * z ** (5 / 3) + 0.0018 * qc : 0.032 * qc ** 0.6 * z;
  const t0 = input.ortamSicakligi_C + 273.15;
  const t = t0 + qc / (m * 1.0);
  const rho = 353 / t;
  const v = m / rho;
  return {
    value: { dumanKutleDebisi_kgs: m },
    intermediates: {
      konvektif_isi_Qc_kW: qc,
      alev_yuksekligi_m: zl,
      bolge: alevUstu ? "alev üstü (Heskestad)" : "alev içi",
      duman_sicakligi_C: t - 273.15,
      duman_yogunlugu_kgm3: rho,
      tahliye_debisi_m3s: v,
      tahliye_debisi_m3h: v * 3600,
    },
    standardsUsed: ["NFPA 92 (eksenel simetrik duman tüyü)"],
  };
}

export const dumanTuyuKutleDebisi: CalcModule<DumanTuyuKutleDebisiInput, DumanTuyuKutleDebisiOutput> = {
  id: "duman-tuyu-kutle-debisi",
  title: "Duman Tüyü Kütle Debisi ve Tahliye Debisi (NFPA 92)",
  discipline: "mekanik",
  standards: ["NFPA 92"],
  inputSchema: dumanTuyuKutleDebisiInputSchema,
  compute,
};
