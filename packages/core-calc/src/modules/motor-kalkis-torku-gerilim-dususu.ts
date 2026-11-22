import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Asenkron motor momenti gerilimin karesiyle değişir: T = T_LR·(V/Vn)²
// Kalkış için T_kalkış/T_yük ≥ 1,25 (hızlanma payı pratik değeri)
export const motorKalkisTorkuGerilimDususuInputSchema = z.object({
  anmaGucu_kW: z.number().positive(),
  anmaDevri_rpm: z.number().positive(),
  kalkisMomentiOrani_TLR_Tn: z.number().positive(),
  yukMomentiOrani_Tyuk_Tn: z.number().positive(),
  anmaGerilimi_V: z.number().positive(),
  kalkistaTerminalGerilimi_V: z.number().positive(),
});

export type MotorKalkisTorkuGerilimDususuInput = z.infer<typeof motorKalkisTorkuGerilimDususuInputSchema>;
export interface MotorKalkisTorkuGerilimDususuOutput {
  kalkisMomenti_Nm: number;
}

const STD = "IEC 60034-1 (T ∝ V²); hızlanma payı oranı pratik değerdir, üreticiden teyit edilmeli";

function compute(input: MotorKalkisTorkuGerilimDususuInput): CalcResult<MotorKalkisTorkuGerilimDususuOutput> {
  const Tn = (9549.3 * input.anmaGucu_kW) / input.anmaDevri_rpm;
  const vOrani = input.kalkistaTerminalGerilimi_V / input.anmaGerilimi_V;
  const Tk = input.kalkisMomentiOrani_TLR_Tn * vOrani ** 2 * Tn;
  const Ty = input.yukMomentiOrani_Tyuk_Tn * Tn;
  const oran = Tk / Ty;
  const status = oran >= 1.25 ? "uygun" : oran >= 1 ? "sinirda" : "uygunsuz";
  const minV = input.anmaGerilimi_V * Math.sqrt((1.25 * Ty) / (input.kalkisMomentiOrani_TLR_Tn * Tn));
  return {
    value: { kalkisMomenti_Nm: Tk },
    intermediates: {
      anma_momenti_Nm: Tn,
      gerilim_orani: vOrani,
      yuk_momenti_Nm: Ty,
      hizlandirma_momenti_Nm: Tk - Ty,
      kalkis_yuk_orani: oran,
      gereken_min_terminal_gerilimi_V: minV,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: oran < 1 ? "Kalkış momenti yük momentinin altında: motor kalkamaz" : `Kalkış/yük momenti oranı ${oran.toFixed(2)}; en az 1,25 önerilir. Moment–hız eğrisi tam alınmamıştır, yalnız kilitli rotor noktası`,
    },
  };
}

export const motorKalkisTorkuGerilimDususu: CalcModule<MotorKalkisTorkuGerilimDususuInput, MotorKalkisTorkuGerilimDususuOutput> = {
  id: "motor-kalkis-torku-gerilim-dususu",
  title: "Motor Kalkış Momenti Kontrolü (Gerilim Düşümünde)",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: motorKalkisTorkuGerilimDususuInputSchema,
  compute,
};
