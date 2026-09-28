import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const sogutmaDolumProsedureKontrolSuresiSchema = z.object({
  sistem_hacmi_L: z.number().positive(),
  dolum_debisi_Lmin: z.number().positive(),
  basinc_stabilizasyon_dakika: z.number().default(5),
  sicaklik_stabilizasyon_dakika: z.number().default(10),
});

export type SogutmaDolumProsedureKontrolSuresiInput = z.infer<typeof sogutmaDolumProsedureKontrolSuresiSchema>;

export interface SogutmaDolumProsedureKontrolSuresiOutput {
  dolum_suresi_dakika: number;
  total_kontrol_suresi_dakika: number;
  harita: Record<string, string>;
}

export const sogutmaDolumProsedureKontrolSuresi: CalcModule<SogutmaDolumProsedureKontrolSuresiInput, SogutmaDolumProsedureKontrolSuresiOutput> = {
  id: "sogutma-dolum-proseduru-kontrol-suresi",
  title: "Soğutma Dolum Prosedürü Kontrol Süresi",
  discipline: "mekanik",
  standards: ["EN 12828", "ISO 13623"],
  inputSchema: sogutmaDolumProsedureKontrolSuresiSchema,

  compute(input: SogutmaDolumProsedureKontrolSuresiInput): CalcResult<SogutmaDolumProsedureKontrolSuresiOutput> {
    // Dolum süresi = Sistem hacmi / Dolum debisi
    const dolum_suresi_dakika = input.sistem_hacmi_L / input.dolum_debisi_Lmin;
    
    // Total: dolum + stabilizasyon (basınç + sıcaklık)
    const total_kontrol_suresi_dakika = dolum_suresi_dakika + input.basinc_stabilizasyon_dakika + input.sicaklik_stabilizasyon_dakika;

    return {
      value: {
        dolum_suresi_dakika: Math.round(dolum_suresi_dakika * 10) / 10,
        total_kontrol_suresi_dakika: Math.round(total_kontrol_suresi_dakika * 10) / 10,
        harita: {
          adim1: `Doldur: ${Math.round(dolum_suresi_dakika * 10) / 10} dakika (${input.sistem_hacmi_L}L @ ${input.dolum_debisi_Lmin} L/min)`,
          adim2: `Basınç stabilizasyonu: ${input.basinc_stabilizasyon_dakika} dakika`,
          adim3: `Sıcaklık stabilizasyonu: ${input.sicaklik_stabilizasyon_dakika} dakika`,
        },
      },
      intermediates: {
        sistem_hacmi_L: input.sistem_hacmi_L,
        dolum_debisi_Lmin: input.dolum_debisi_Lmin,
      },
      standardsUsed: ["EN 12828"],
    };
  },
};
