import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Depo bekleme kaybı: Q = U·A·(Tsu − Tort); tek kütleli su için τ = m·cp/(U·A), T(t) = Tort + (Tsu − Tort)·e^(−t/τ).
const RHO = 1000; // kg/m³
const CP = 4186; // J/kgK

export const depoBeklemeIsiKaybiInputSchema = z.object({
  hacim_L: z.number().positive(),
  yuzeyAlani_m2: z.number().positive(),
  u_Wm2K: z.number().positive(),
  suSicakligi_C: z.number(),
  ortamSicakligi_C: z.number(),
  sure_h: z.number().min(0),
});

export type DepoBeklemeIsiKaybiInput = z.infer<typeof depoBeklemeIsiKaybiInputSchema>;

export interface DepoBeklemeIsiKaybiOutput {
  kayip_W: number;
}

function compute(input: DepoBeklemeIsiKaybiInput): CalcResult<DepoBeklemeIsiKaybiOutput> {
  const dT = input.suSicakligi_C - input.ortamSicakligi_C;
  const UA = input.u_Wm2K * input.yuzeyAlani_m2;
  const Q = UA * dT;
  const C = (input.hacim_L / 1000) * RHO * CP; // J/K
  const tauSaat = C / UA / 3600;
  return {
    value: { kayip_W: Q },
    intermediates: {
      gunluk_kayip_kWh: (Q * 24) / 1000,
      zaman_sabiti_saat: tauSaat,
      baslangic_soguma_C_saat: (Q * 3600) / C,
      sure_sonu_sicaklik_C: input.ortamSicakligi_C + dT * Math.exp(-input.sure_h / tauSaat),
    },
    standardsUsed: ["Isıl direnç / Newton soğuma yasası"],
  };
}

export const depoBeklemeIsiKaybi: CalcModule<DepoBeklemeIsiKaybiInput, DepoBeklemeIsiKaybiOutput> = {
  id: "depo-bekleme-isi-kaybi",
  title: "Sıcak Su Deposu Bekleme Isı Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: depoBeklemeIsiKaybiInputSchema,
  compute,
};
