import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duyulur yükten üfleme havası debisi (ASHRAE Fundamentals, Bölüm 1 duyulur ısı denklemi):
// q_s = ρ·cp·V̇·ΔT  →  V̇ = q_s/(ρ·cp·ΔT), ρ = 1,2 kg/m³, cp = 1006 J/kgK (standart hava).
// ΔT = oda – üfleme sıcaklığı farkı (soğutmada yaygın 8–12 K, konforda difüzör limitine göre).
export const uflemeHavasiDebisiInputSchema = z.object({
  duyulurYuk_W: z.number().positive(),
  sicaklikFarki_K: z.number().positive().max(30),
  odaHacmi_m3: z.number().positive(),
});

export type UflemeHavasiDebisiInput = z.infer<typeof uflemeHavasiDebisiInputSchema>;

export interface UflemeHavasiDebisiOutput {
  debi_m3h: number;
}

const RHO = 1.2;
const CP = 1006;

function compute(input: UflemeHavasiDebisiInput): CalcResult<UflemeHavasiDebisiOutput> {
  const m3s = input.duyulurYuk_W / (RHO * CP * input.sicaklikFarki_K);
  const m3h = m3s * 3600;
  return {
    value: { debi_m3h: m3h },
    intermediates: {
      debi_m3s: m3s,
      debi_Ls: m3s * 1000,
      kutlesel_debi_kgs: m3s * RHO,
      hava_degisim_sayisi_ACH: m3h / input.odaHacmi_m3,
    },
    standardsUsed: ["ASHRAE Fundamentals — Psychrometrics (duyulur ısı denklemi)"],
  };
}

export const uflemeHavasiDebisi: CalcModule<UflemeHavasiDebisiInput, UflemeHavasiDebisiOutput> = {
  id: "ufleme-havasi-debisi",
  title: "Üfleme Havası Debisi (Duyulur Yükten)",
  discipline: "mekanik",
  standards: ["ASHRAE Fundamentals"],
  inputSchema: uflemeHavasiDebisiInputSchema,
  compute,
};
