import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Havuz ilk ısıtma: enerji E = V·ρ·cp·ΔT (ρ = 1000 kg/m³, cp = 4,186 kJ/kgK), süre t = E/(P·η_net).
// η_net, ısıtma sırasında yüzeyden buharlaşma/taşınım kayıplarını içeren net verimdir (örtülü havuzda 0,7–0,85, açıkta düşük).
export const havuzIlkIsitmaSuresiInputSchema = z.object({
  havuzHacmi_m3: z.number().positive(),
  baslangicSicakligi_C: z.number().min(0).max(35),
  hedefSicaklik_C: z.number().min(15).max(40),
  isiticiGucu_kW: z.number().positive(),
  netVerim: z.number().gt(0).max(1),
});

export type HavuzIlkIsitmaSuresiInput = z.infer<typeof havuzIlkIsitmaSuresiInputSchema>;

export interface HavuzIlkIsitmaSuresiOutput {
  sure_saat: number;
}

function compute(input: HavuzIlkIsitmaSuresiInput): CalcResult<HavuzIlkIsitmaSuresiOutput> {
  const dT = Math.max(0, input.hedefSicaklik_C - input.baslangicSicakligi_C);
  const eKJ = input.havuzHacmi_m3 * 1000 * 4.186 * dT;
  const eKWh = eKJ / 3600;
  const t = eKWh / (input.isiticiGucu_kW * input.netVerim);
  return {
    value: { sure_saat: t },
    intermediates: {
      sicaklik_farki_K: dT,
      gerekli_enerji_kWh: eKWh,
      sure_gun: t / 24,
      gerekli_guc_24saat_kW: eKWh / (24 * input.netVerim),
    },
    standardsUsed: ["Enerji dengesi (E = m·cp·ΔT)"],
  };
}

export const havuzIlkIsitmaSuresi: CalcModule<HavuzIlkIsitmaSuresiInput, HavuzIlkIsitmaSuresiOutput> = {
  id: "havuz-ilk-isitma-suresi",
  title: "Havuz İlk Isıtma Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: havuzIlkIsitmaSuresiInputSchema,
  compute,
};
