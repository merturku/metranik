import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kritik devre: ΔP = (R·L + Σζ·ρv²/2 + ΣΔPekipman)·(1 + pay); H = ΔP/(ρg). ρ = 1000 kg/m³.
const RHO = 1000;
const G = 9.80665;

export const hidronikKritikDevreBasincKaybiInputSchema = z.object({
  r_Pam: z.number().positive(),
  L_m: z.number().positive(),
  zeta: z.number().min(0),
  v_ms: z.number().positive(),
  ekipman_kPa: z.number().min(0),
  pay: z.number().min(0),
});

export type HidronikKritikDevreBasincKaybiInput = z.infer<typeof hidronikKritikDevreBasincKaybiInputSchema>;

export interface HidronikKritikDevreBasincKaybiOutput {
  toplamKayip_kPa: number;
}

function compute(input: HidronikKritikDevreBasincKaybiInput): CalcResult<HidronikKritikDevreBasincKaybiOutput> {
  const surtunme = input.r_Pam * input.L_m;
  const yerel = (input.zeta * RHO * input.v_ms * input.v_ms) / 2;
  const toplam = (surtunme + yerel + input.ekipman_kPa * 1000) * (1 + input.pay);
  return {
    value: { toplamKayip_kPa: toplam / 1000 },
    intermediates: {
      surtunme_kaybi_kPa: surtunme / 1000,
      yerel_kayip_kPa: yerel / 1000,
      pompa_yuksekligi_m: toplam / (RHO * G),
    },
    standardsUsed: ["Darcy-Weisbach / yerel kayıp toplamı"],
  };
}

export const hidronikKritikDevreBasincKaybi: CalcModule<
  HidronikKritikDevreBasincKaybiInput,
  HidronikKritikDevreBasincKaybiOutput
> = {
  id: "hidronik-kritik-devre-basinc-kaybi",
  title: "Hidronik Kritik Devre Toplam Basınç Kaybı ve Pompa Yüksekliği",
  discipline: "mekanik",
  standards: [],
  inputSchema: hidronikKritikDevreBasincKaybiInputSchema,
  compute,
};
