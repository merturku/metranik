import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nem alma cihazı kapasitesi (günlük yoğuşan su): taze hava ile giren nem yükü + iç nem üretimi.
// Nem oranı W = 0,622·Pv/(P − Pv),  Pv = RH·psat(T),  psat Magnus (6,112·e^(17,62·t/(243,12+t)) hPa, −45…60 °C).
// m = V·ACH·24·ρ·(W_dış_odaya_giren − W_hedef) + üretim; ρ = 1,2 kg/m³ (kuru hava yaklaşık). Sonuç L/gün ≈ kg/gün.
export const nemAlmaCihaziKapasitesiInputSchema = z
  .object({
    odaHacmi_m3: z.number().positive(),
    havaDegisimSayisi: z.number().min(0).max(5),
    sicaklik_C: z.number().min(0).max(40),
    mevcutBagilNem: z.number().min(10).max(100),
    hedefBagilNem: z.number().min(20).max(80),
    icNemUretimi_kggun: z.number().min(0),
  })
  .refine((v) => v.hedefBagilNem < v.mevcutBagilNem, { message: "Hedef nem mevcut nemden düşük olmalı" });

export type NemAlmaCihaziKapasitesiInput = z.infer<typeof nemAlmaCihaziKapasitesiInputSchema>;

export interface NemAlmaCihaziKapasitesiOutput {
  gunlukNemYuku_kg: number;
}

const P = 101.325;
const psat = (t: number) => 0.6112 * Math.exp((17.62 * t) / (243.12 + t));
const W = (t: number, rh: number) => {
  const pv = (rh / 100) * psat(t);
  return (0.622 * pv) / (P - pv);
};

function compute(input: NemAlmaCihaziKapasitesiInput): CalcResult<NemAlmaCihaziKapasitesiOutput> {
  const w1 = W(input.sicaklik_C, input.mevcutBagilNem);
  const w2 = W(input.sicaklik_C, input.hedefBagilNem);
  const hava = input.odaHacmi_m3 * input.havaDegisimSayisi * 24 * 1.2 * (w1 - w2);
  const toplam = hava + input.icNemUretimi_kggun;
  return {
    value: { gunlukNemYuku_kg: toplam },
    intermediates: {
      W_mevcut_gkg: w1 * 1000,
      W_hedef_gkg: w2 * 1000,
      hava_ile_giren_nem_kggun: hava,
      ic_uretim_kggun: input.icNemUretimi_kggun,
      onerilen_cihaz_kapasitesi_Lgun: toplam * 1.25,
    },
    standardsUsed: ["ASHRAE Fundamentals — Psychrometrics (Magnus psat)"],
  };
}

export const nemAlmaCihaziKapasitesi: CalcModule<NemAlmaCihaziKapasitesiInput, NemAlmaCihaziKapasitesiOutput> = {
  id: "nem-alma-cihazi-kapasitesi",
  title: "Nem Alma Cihazı Kapasitesi",
  discipline: "ev",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: nemAlmaCihaziKapasitesiInputSchema,
  compute,
};
