import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Saha verim testi: Phid = ρ·g·Q·H; Pmil = Pel·ηm; ηpompa = Phid/Pmil. Kabul: η ≥ ηgaranti·(1 − tolerans).
const G = 9.80665;

export const pompaSahaVerimTestiInputSchema = z.object({
  q_m3h: z.number().positive(),
  h_m: z.number().positive(),
  elektrikGucu_kW: z.number().positive(),
  motorVerimi: z.number().min(0.3).max(1),
  garantiVerimi: z.number().positive().max(1),
  tolerans: z.number().min(0).max(0.5),
  yogunluk_kgm3: z.number().positive(),
});

export type PompaSahaVerimTestiInput = z.infer<typeof pompaSahaVerimTestiInputSchema>;

export interface PompaSahaVerimTestiOutput {
  pompaVerimi: number;
}

function compute(input: PompaSahaVerimTestiInput): CalcResult<PompaSahaVerimTestiOutput> {
  const hidrolik = (input.yogunluk_kgm3 * G * (input.q_m3h / 3600) * input.h_m) / 1000; // kW
  const mil = input.elektrikGucu_kW * input.motorVerimi;
  const eta = hidrolik / mil;
  const alt = input.garantiVerimi * (1 - input.tolerans);
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (eta > 1) {
    status = "uygunsuz";
    note = "Hesaplanan verim %100'ü aşıyor: ölçüm veya girdi hatası.";
  } else if (eta >= alt) {
    status = "uygun";
    note = "Pompa verimi garanti değerin tolerans sınırı içinde.";
  } else if (eta >= input.garantiVerimi * (1 - 2 * input.tolerans)) {
    status = "sinirda";
    note = "Verim tolerans sınırının altında ama 2× tolerans içinde; ölçüm belirsizliğini ve çalışma noktasını gözden geçirin.";
  } else {
    status = "uygunsuz";
    note = "Pompa verimi garantinin tolerans sınırının belirgin altında.";
  }
  return {
    value: { pompaVerimi: eta },
    intermediates: { hidrolik_guc_kW: hidrolik, mil_gucu_kW: mil, toplam_verim: hidrolik / input.elektrikGucu_kW, kabul_alt_siniri: alt },
    standardsUsed: ["ISO 9906"],
    verdict: { status, note },
  };
}

export const pompaSahaVerimTesti: CalcModule<PompaSahaVerimTestiInput, PompaSahaVerimTestiOutput> = {
  id: "pompa-saha-verim-testi",
  title: "Pompa Saha Verim Testi (Toplam ve Pompa Verimi)",
  discipline: "mekanik",
  standards: ["ISO 9906"],
  inputSchema: pompaSahaVerimTestiInputSchema,
  compute,
};
