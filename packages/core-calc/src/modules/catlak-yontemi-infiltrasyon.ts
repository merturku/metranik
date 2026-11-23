import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Çatlak (crack) yöntemi: Q = C·L·ΔP^n  (ASHRAE Fundamentals, Bölüm 16; C ve n çatlak/pencere ölçüm verisinden).
// Rüzgâr basınç farkı ΔP = ΔCp·ρ·v²/2; duyulur ısı kaybı Φ = ρ·cp·Q·ΔT.
export const catlakYontemiInfiltrasyonInputSchema = z.object({
  catlakKatsayisi_C: z.number().positive(),
  akisUsteli_n: z.number().min(0.5).max(1),
  catlakUzunlugu_m: z.number().positive(),
  ruzgarHizi_m_s: z.number().min(0),
  basincKatsayisiFarki: z.number().min(0),
  icDisSicaklikFarki_K: z.number().min(0),
});
export type CatlakYontemiInfiltrasyonInput = z.infer<typeof catlakYontemiInfiltrasyonInputSchema>;
export interface CatlakYontemiInfiltrasyonOutput {
  sizintiDebisi_m3h: number;
}

const STD = "ASHRAE Handbook – Fundamentals, Ch. 16 (crack method, Q = C·L·ΔP^n); TS EN ISO 9972 ile birlikte";
const RHO = 1.2;
const CP = 1.005;

function compute(input: CatlakYontemiInfiltrasyonInput): CalcResult<CatlakYontemiInfiltrasyonOutput> {
  const dP = input.basincKatsayisiFarki * RHO * input.ruzgarHizi_m_s ** 2 / 2;
  const Q = input.catlakKatsayisi_C * input.catlakUzunlugu_m * dP ** input.akisUsteli_n;
  const Phi = (RHO * CP * (Q / 3600) * input.icDisSicaklikFarki_K);
  return {
    value: { sizintiDebisi_m3h: Q },
    intermediates: {
      basinc_farki_Pa: dP,
      sizinti_debisi_L_s: (Q * 1000) / 3600,
      duyulur_isi_kaybi_kW: Phi,
    },
    standardsUsed: [STD],
  };
}

export const catlakYontemiInfiltrasyon: CalcModule<CatlakYontemiInfiltrasyonInput, CatlakYontemiInfiltrasyonOutput> = {
  id: "catlak-yontemi-infiltrasyon",
  title: "Çatlak Yöntemiyle Rüzgârdan Hava Sızıntısı ve Isı Kaybı",
  discipline: "ev",
  standards: [STD],
  inputSchema: catlakYontemiInfiltrasyonInputSchema,
  compute,
};
