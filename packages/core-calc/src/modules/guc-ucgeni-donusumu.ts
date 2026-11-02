import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Güç üçgeni: S = P/cosφ,  Q = P·tanφ = √(S² − P²),  I = S/(√3·U) (3 faz) veya S/U (1 faz).
// P aktif (kW), Q reaktif (kVAr), S görünür güç (kVA). U: 3 fazda hat arası gerilim.
export const gucUcgeniDonusumuInputSchema = z.object({
  aktifGuc_kW: z.number().positive(),
  cosPhi: z.number().gt(0).max(1),
  gerilim_V: z.number().positive(),
  faz: z.enum(["3", "1"]),
});

export type GucUcgeniDonusumuInput = z.infer<typeof gucUcgeniDonusumuInputSchema>;

export interface GucUcgeniDonusumuOutput {
  gorunurGuc_kVA: number;
}

function compute(input: GucUcgeniDonusumuInput): CalcResult<GucUcgeniDonusumuOutput> {
  const s = input.aktifGuc_kW / input.cosPhi;
  const q = Math.sqrt(Math.max(0, s * s - input.aktifGuc_kW ** 2));
  const i = (s * 1000) / ((input.faz === "3" ? Math.sqrt(3) : 1) * input.gerilim_V);
  return {
    value: { gorunurGuc_kVA: s },
    intermediates: {
      reaktif_guc_kVAr: q,
      akim_A: i,
      phi_derece: (Math.acos(input.cosPhi) * 180) / Math.PI,
      tan_phi: q / input.aktifGuc_kW,
    },
    standardsUsed: ["IEC 60038 (gerilim), güç üçgeni bağıntıları"],
  };
}

export const gucUcgeniDonusumu: CalcModule<GucUcgeniDonusumuInput, GucUcgeniDonusumuOutput> = {
  id: "guc-ucgeni-donusumu",
  title: "Güç Üçgeni Dönüşümü (P, Q, S, I)",
  discipline: "elektrik",
  standards: [],
  inputSchema: gucUcgeniDonusumuInputSchema,
  compute,
};
