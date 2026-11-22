import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Asenkron motor: ns = 120f/p, s = (ns − n)/ns, f_rotor = s·f, hava aralığı gücü Pag = Pmil/(1 − s), rotor bakır kaybı Pcu2 = s·Pag
// (sürtünme-vantilasyon kaybı mil gücüne dahil edilmeden; kaba yaklaşım)
export const motorKaymaRotorKayiplariInputSchema = z
  .object({
    frekans_Hz: z.number().positive(),
    kutupSayisi: z.number().int().min(2).refine((v) => v % 2 === 0, { message: "Kutup sayısı çift olmalı" }),
    devir_rpm: z.number().positive(),
    milGucu_kW: z.number().positive(),
  })
  .refine((v) => v.devir_rpm < (120 * v.frekans_Hz) / v.kutupSayisi, { message: "Motor devri senkron devirden küçük olmalı" });

export type MotorKaymaRotorKayiplariInput = z.infer<typeof motorKaymaRotorKayiplariInputSchema>;
export interface MotorKaymaRotorKayiplariOutput {
  kayma_yuzde: number;
}

const STD = "IEC 60034-1 (asenkron motor kayma ve rotor kayıpları, klasik makine teorisi)";

function compute(input: MotorKaymaRotorKayiplariInput): CalcResult<MotorKaymaRotorKayiplariOutput> {
  const ns = (120 * input.frekans_Hz) / input.kutupSayisi;
  const s = (ns - input.devir_rpm) / ns;
  const Pag = input.milGucu_kW / (1 - s);
  const Pcu2 = s * Pag;
  return {
    value: { kayma_yuzde: s * 100 },
    intermediates: {
      senkron_devir_rpm: ns,
      kayma_s: s,
      rotor_frekansi_Hz: s * input.frekans_Hz,
      hava_araligi_gucu_kW: Pag,
      rotor_bakir_kaybi_kW: Pcu2,
    },
    standardsUsed: [STD],
    verdict: {
      status: s <= 0.06 ? "uygun" : s <= 0.1 ? "sinirda" : "uygunsuz",
      note: `Kayma %${(s * 100).toFixed(2)} (standart kafes rotorlu motorlarda anma yükünde tipik %1–6; motor etiketinden teyit edin)`,
    },
  };
}

export const motorKaymaRotorKayiplari: CalcModule<MotorKaymaRotorKayiplariInput, MotorKaymaRotorKayiplariOutput> = {
  id: "motor-kayma-rotor-kayiplari",
  title: "Motor Kayması ve Rotor Bakır Kaybı",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: motorKaymaRotorKayiplariInputSchema,
  compute,
};
