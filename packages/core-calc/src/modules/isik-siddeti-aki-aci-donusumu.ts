import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Koni katı açısı Ω = 2π(1 − cos(θ/2)); düzgün dağılımda I = Φ/Ω; eksen aydınlığı E = I/d².
export const isikSiddetiAkiAciDonusumuInputSchema = z.object({
  aki_lm: z.number().positive(),
  isinAcisi_deg: z.number().positive().max(360),
  mesafe_m: z.number().positive(),
});

export type IsikSiddetiAkiAciDonusumuInput = z.infer<typeof isikSiddetiAkiAciDonusumuInputSchema>;

export interface IsikSiddetiAkiAciDonusumuOutput {
  isikSiddeti_cd: number;
}

function compute(input: IsikSiddetiAkiAciDonusumuInput): CalcResult<IsikSiddetiAkiAciDonusumuOutput> {
  const omega = 2 * Math.PI * (1 - Math.cos((input.isinAcisi_deg * Math.PI) / 360));
  const I = input.aki_lm / omega;
  return {
    value: { isikSiddeti_cd: I },
    intermediates: { kati_aci_sr: omega, eksen_aydinligi_lx: I / (input.mesafe_m * input.mesafe_m) },
    standardsUsed: ["CIE / SI fotometri tanımları"],
  };
}

export const isikSiddetiAkiAciDonusumu: CalcModule<IsikSiddetiAkiAciDonusumuInput, IsikSiddetiAkiAciDonusumuOutput> = {
  id: "isik-siddeti-aki-aci-donusumu",
  title: "Işık Şiddeti – Akı – Işın Açısı Dönüşümü",
  discipline: "elektrik",
  standards: [],
  inputSchema: isikSiddetiAkiAciDonusumuInputSchema,
  compute,
};
