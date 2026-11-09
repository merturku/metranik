import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Mil gücü–moment–devir ilişkisi: P = T·ω = T·2π·n/60  →  P[kW] = T[Nm]·n[dev/dk]/9549,3;  T = 9549,3·P/n.
// Üç büyüklükten ikisi biliniyorsa üçüncüsü bulunur; hedef seçilir. Kayış-kasnak/dişli çıkışı için verim ayrıca uygulanmalıdır.
// Sabit devirli asenkron motorda nominal devir senkron devirden kayma kadar düşüktür (etiketten alın).
export const motorMomentGucDonusumuInputSchema = z.object({
  hedef: z.enum(["guc", "moment", "devir"]),
  guc_kW: z.number().min(0),
  moment_Nm: z.number().min(0),
  devir_rpm: z.number().min(0),
});

export type MotorMomentGucDonusumuInput = z.infer<typeof motorMomentGucDonusumuInputSchema>;

export interface MotorMomentGucDonusumuOutput {
  sonuc: number | null;
}

const K = 60000 / (2 * Math.PI); // 9549,296...

function compute(input: MotorMomentGucDonusumuInput): CalcResult<MotorMomentGucDonusumuOutput> {
  let sonuc: number | null = null;
  let birim = "";
  if (input.hedef === "guc" && input.moment_Nm > 0 && input.devir_rpm > 0) {
    sonuc = (input.moment_Nm * input.devir_rpm) / K;
    birim = "kW";
  } else if (input.hedef === "moment" && input.guc_kW > 0 && input.devir_rpm > 0) {
    sonuc = (K * input.guc_kW) / input.devir_rpm;
    birim = "Nm";
  } else if (input.hedef === "devir" && input.guc_kW > 0 && input.moment_Nm > 0) {
    sonuc = (K * input.guc_kW) / input.moment_Nm;
    birim = "dev/dk";
  }
  return {
    value: { sonuc },
    intermediates: { hesaplanan: input.hedef, birim: birim || "—", sabit_9549: K },
    standardsUsed: ["P = T·ω (mekanik güç tanımı)"],
    verdict: sonuc === null ? { status: "uygunsuz", note: "Hedef dışındaki iki büyüklük sıfırdan büyük girilmelidir." } : undefined,
  };
}

export const motorMomentGucDonusumu: CalcModule<MotorMomentGucDonusumuInput, MotorMomentGucDonusumuOutput> = {
  id: "motor-moment-guc-donusumu",
  title: "Motor Mil Gücü – Moment – Devir Dönüşümü",
  discipline: "elektrik",
  standards: [],
  inputSchema: motorMomentGucDonusumuInputSchema,
  compute,
};
