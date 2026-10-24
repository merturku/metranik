import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kompressorAspirasyanBasincKaybiSchema = z.object({
  debi_m3min: z.number().positive(),
  emme_boru_capı_mm: z.number().positive(),
  emme_boru_uzunlugu_m: z.number().positive().default(2),
  max_basinc_kaybi_kPa: z.number().default(5),
});

export type KompressorAspirasyanBasincKaybiInput = z.infer<typeof kompressorAspirasyanBasincKaybiSchema>;

export interface KompressorAspirasyanBasincKaybiOutput {
  basinc_kaybi_Pa: number;
  basinc_kaybi_kPa: number;
  verdict?: { status: "uygun" | "yetersiz"; note: string };
}

export const kompressorAspirasyanBasincKaybi: CalcModule<KompressorAspirasyanBasincKaybiInput, KompressorAspirasyanBasincKaybiOutput> = {
  id: "kompressor-aspirasyon-basinc-kaybi",
  title: "Kompresör Aspirasyon Basınç Kaybı",
  discipline: "mekanik",
  standards: ["ISO 4414", "EN 60204-32"],
  inputSchema: kompressorAspirasyanBasincKaybiSchema,

  compute(input: KompressorAspirasyanBasincKaybiInput): CalcResult<KompressorAspirasyanBasincKaybiOutput> {
    const r_mm = input.emme_boru_capı_mm / 2;
    const A_m2 = Math.PI * (r_mm / 1000) ** 2;
    const v_ms = (input.debi_m3min / 60) / A_m2; // m/s

    // Darcy-Weisbach: ΔP = f × (L/D) × (ρ × V²/2)
    // f for medium steel pipe ≈ 0.035, ρ_air ≈ 1.2 kg/m³
    const f = 0.035;
    const rho_air = 1.2;
    const delta_P_Pa = f * (input.emme_boru_uzunlugu_m / (input.emme_boru_capı_mm / 1000)) * (rho_air * v_ms ** 2 / 2);
    const delta_P_kPa = delta_P_Pa / 1000;

    let status: "uygun" | "yetersiz" = "uygun";
    let note = "";

    if (delta_P_kPa <= input.max_basinc_kaybi_kPa) {
      note = `Aspirasyon basınç kaybı kabul edilebilir (${delta_P_kPa.toFixed(2)} kPa ≤ ${input.max_basinc_kaybi_kPa} kPa).`;
    } else {
      status = "yetersiz";
      note = `Aspirasyon basınç kaybı aşırı (${delta_P_kPa.toFixed(2)} kPa > ${input.max_basinc_kaybi_kPa} kPa): boru çapını artırın.`;
    }

    return {
      value: {
        basinc_kaybi_Pa: Math.round(delta_P_Pa * 10) / 10,
        basinc_kaybi_kPa: Math.round(delta_P_kPa * 100) / 100,
        verdict: { status, note },
      },
      intermediates: {
        hava_hizi_ms: Math.round(v_ms * 100) / 100,
        boru_kesit_alani_mm2: Math.round(A_m2 * 1e6),
      },
      standardsUsed: ["ISO 4414"],
    };
  },
};
