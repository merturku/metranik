import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dairesel kesit burulma (Saint-Venant): J = π(d⁴ − di⁴)/32, τmaks = T·(d/2)/J, φ = T·L/(G·J).
export const daireselMilBurulmaInputSchema = z
  .object({
    disCap_mm: z.number().positive(),
    icCap_mm: z.number().min(0),
    moment_kNm: z.number().min(0),
    boy_m: z.number().positive(),
    g_GPa: z.number().positive(),
  })
  .refine((v) => v.icCap_mm < v.disCap_mm, { message: "İç çap dış çaptan küçük olmalı" });

export type DaireselMilBurulmaInput = z.infer<typeof daireselMilBurulmaInputSchema>;

export interface DaireselMilBurulmaOutput {
  tauMaks_MPa: number;
}

function compute(input: DaireselMilBurulmaInput): CalcResult<DaireselMilBurulmaOutput> {
  const d = input.disCap_mm;
  const J = (Math.PI * (Math.pow(d, 4) - Math.pow(input.icCap_mm, 4))) / 32; // mm⁴
  const T = input.moment_kNm * 1e6; // N·mm
  const tau = (T * (d / 2)) / J;
  const phi = (T * input.boy_m * 1000) / (input.g_GPa * 1000 * J);
  return {
    value: { tauMaks_MPa: tau },
    intermediates: { J_mm4: J, donme_rad: phi, donme_derece: (phi * 180) / Math.PI },
    standardsUsed: ["Saint-Venant burulma teorisi"],
  };
}

export const daireselMilBurulma: CalcModule<DaireselMilBurulmaInput, DaireselMilBurulmaOutput> = {
  id: "dairesel-mil-burulma",
  title: "Dairesel Mil Burulma Gerilmesi ve Dönme Açısı",
  discipline: "insaat",
  standards: [],
  inputSchema: daireselMilBurulmaInputSchema,
  compute,
};
