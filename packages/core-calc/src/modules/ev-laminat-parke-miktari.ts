import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Laminat/parke metrajı: paket sayısı = ⌈A·(1 + fire)/A_paket⌉. Fire kesim ve desen kaybıdır (düz döşeme ≈ %5–7, diyagonal ≈ %10–15).
export const evLaminatParkeMiktariInputSchema = z.object({
  alan_m2: z.number().positive(),
  paketAlani_m2: z.number().positive(),
  fireYuzde: z.number().min(0).max(50),
});

export type EvLaminatParkeMiktariInput = z.infer<typeof evLaminatParkeMiktariInputSchema>;

export interface EvLaminatParkeMiktariOutput {
  paketSayisi: number;
}

function compute(input: EvLaminatParkeMiktariInput): CalcResult<EvLaminatParkeMiktariOutput> {
  const gerekli = input.alan_m2 * (1 + input.fireYuzde / 100);
  const raw = gerekli / input.paketAlani_m2;
  const paket = Math.ceil(raw - 1e-9);
  return {
    value: { paketSayisi: paket },
    intermediates: {
      fireli_alan_m2: gerekli,
      satin_alinan_alan_m2: paket * input.paketAlani_m2,
      artan_alan_m2: paket * input.paketAlani_m2 - input.alan_m2,
    },
    standardsUsed: [],
  };
}

export const evLaminatParkeMiktari: CalcModule<EvLaminatParkeMiktariInput, EvLaminatParkeMiktariOutput> = {
  id: "ev-laminat-parke-miktari",
  title: "Laminat / Parke Paket Sayısı",
  discipline: "ev",
  standards: [],
  inputSchema: evLaminatParkeMiktariInputSchema,
  compute,
};
