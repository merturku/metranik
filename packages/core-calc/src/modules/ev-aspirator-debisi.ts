import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Banyo/WC/mutfak aspiratör (mekanik egzoz) debisi: Q = V·n (n saatlik hava değişim sayısı).
// Tipik tasarım hava değişimi: banyo/WC 8–10 h⁻¹, mutfak 10–15 h⁻¹ (konut uygulaması; yerel yönetmelik/standarttan teyit edin) — girdidir.
// Kanal uzunluğu ve basınç kaybı için fan eğrisi kontrol edilmelidir (Kanal Sürtünme Basınç Kaybı). Telafi (makyaj) havası sağlanmazsa debi düşer.
export const evAspiratorDebisiInputSchema = z.object({
  hacim_m3: z.number().positive(),
  havaDegisimSayisi_ACH: z.number().positive(),
  kanalKayipFaktoru: z.number().min(1).max(2),
});

export type EvAspiratorDebisiInput = z.infer<typeof evAspiratorDebisiInputSchema>;

export interface EvAspiratorDebisiOutput {
  gerekliDebi_m3h: number;
}

function compute(input: EvAspiratorDebisiInput): CalcResult<EvAspiratorDebisiOutput> {
  const q = input.hacim_m3 * input.havaDegisimSayisi_ACH;
  const katalog = q * input.kanalKayipFaktoru;
  return {
    value: { gerekliDebi_m3h: q },
    intermediates: {
      debi_Ls: q / 3.6,
      katalog_debisi_kayip_payli_m3h: katalog,
      katalog_debisi_CFM: katalog * 0.5886,
    },
    standardsUsed: [],
  };
}

export const evAspiratorDebisi: CalcModule<EvAspiratorDebisiInput, EvAspiratorDebisiOutput> = {
  id: "ev-aspirator-debisi",
  title: "Aspiratör (Egzoz) Debisi — Hava Değişim Yöntemi",
  discipline: "ev",
  standards: [],
  inputSchema: evAspiratorDebisiInputSchema,
  compute,
};
