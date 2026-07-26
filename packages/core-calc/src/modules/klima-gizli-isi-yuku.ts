import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kütlesel debi × gizli ısı × nem farkı: Qgizli = ρ·V·hfg·ΔW.
// ρ: hava yoğunluğu (1.2 kg/m³), hfg: suyun buharlaşma gizli ısısı (~2500 kJ/kg,
// nem alma sıcaklık aralığında), ΔW: mutlak nem farkı (kg/kg).
const HAVA_YOGUNLUGU_KG_M3 = 1.2;
const SU_BUHARLASMA_GIZLI_ISISI_JKG = 2_500_000;

export const klimaGizliIsiYukuInputSchema = z.object({
  havaDebisi_Ls: z.number().positive(),
  nemFarki_dW_gkg: z.number().positive(),
});

export type KlimaGizliIsiYukuInput = z.infer<typeof klimaGizliIsiYukuInputSchema>;

export interface KlimaGizliIsiYukuOutput {
  gizliIsiYuku_kW: number;
}

function compute(input: KlimaGizliIsiYukuInput): CalcResult<KlimaGizliIsiYukuOutput> {
  const havaDebisiM3s = input.havaDebisi_Ls / 1000;
  const nemFarkiKgKg = input.nemFarki_dW_gkg / 1000;
  const gizliIsiYukuW =
    HAVA_YOGUNLUGU_KG_M3 * havaDebisiM3s * SU_BUHARLASMA_GIZLI_ISISI_JKG * nemFarkiKgKg;

  return {
    value: { gizliIsiYuku_kW: gizliIsiYukuW / 1000 },
    intermediates: {
      havaYogunlugu_kg_m3: HAVA_YOGUNLUGU_KG_M3,
    },
    standardsUsed: [],
  };
}

export const klimaGizliIsiYuku: CalcModule<KlimaGizliIsiYukuInput, KlimaGizliIsiYukuOutput> = {
  id: "klima-gizli-isi-yuku",
  title: "Klima Gizli Isı Yükü (Nem Alma)",
  discipline: "mekanik",
  standards: [],
  inputSchema: klimaGizliIsiYukuInputSchema,
  compute,
};
