import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğrudan evaporatif (adyabatik) soğutma — ASHRAE HVAC Systems and Equipment, Evaporative Air-Cooling:
// doygunluk verimi ε = (t1 − t2)/(t1 − t*1)  →  t2 = t1 − ε·(t1 − t*1)
// (t1 giriş kuru, t*1 giriş yaş termometre, t2 çıkış kuru termometre sıcaklığı).
// Duyulur soğutma etkisi: Q = ρ·V̇·cp·(t1 − t2), kuru hava ρ = 1,2 kg/m³, cp = 1,006 kJ/(kg·K).
const HAVA_YOGUNLUGU = 1.2;
const HAVA_CP = 1.006;

export const evaporatifSogutmaCikisSicakligiInputSchema = z
  .object({
    girisKuruTermometre_C: z.number(),
    girisYasTermometre_C: z.number(),
    doygunlukVerimi: z.number().gt(0).max(1),
    havaDebisi_m3h: z.number().positive(),
  })
  .refine((v) => v.girisYasTermometre_C <= v.girisKuruTermometre_C, {
    message: "Yaş termometre sıcaklığı kuru termometreden büyük olamaz",
    path: ["girisYasTermometre_C"],
  });

export type EvaporatifSogutmaCikisSicakligiInput = z.infer<typeof evaporatifSogutmaCikisSicakligiInputSchema>;

export interface EvaporatifSogutmaCikisSicakligiOutput {
  cikisSicakligi_C: number;
}

function compute(
  input: EvaporatifSogutmaCikisSicakligiInput,
): CalcResult<EvaporatifSogutmaCikisSicakligiOutput> {
  const t1 = input.girisKuruTermometre_C;
  const twb = input.girisYasTermometre_C;
  const dusus = input.doygunlukVerimi * (t1 - twb);
  const t2 = t1 - dusus;
  const kW = (HAVA_YOGUNLUGU * (input.havaDebisi_m3h / 3600) * HAVA_CP * dusus);

  return {
    value: { cikisSicakligi_C: t2 },
    intermediates: {
      yas_termometre_depresyonu_K: t1 - twb,
      sicaklik_dususu_K: dusus,
      duyulur_sogutma_etkisi_kW: kW,
      sinir_sicaklik_C: twb,
    },
    standardsUsed: ["ASHRAE HVAC Systems and Equipment — Evaporative Air-Cooling"],
  };
}

export const evaporatifSogutmaCikisSicakligi: CalcModule<
  EvaporatifSogutmaCikisSicakligiInput,
  EvaporatifSogutmaCikisSicakligiOutput
> = {
  id: "evaporatif-sogutma-cikis-sicakligi",
  title: "Evaporatif (Adyabatik) Soğutma Çıkış Sıcaklığı",
  discipline: "mekanik",
  standards: ["ASHRAE HVAC Systems and Equipment — Evaporative Air-Cooling"],
  inputSchema: evaporatifSogutmaCikisSicakligiInputSchema,
  compute,
};
