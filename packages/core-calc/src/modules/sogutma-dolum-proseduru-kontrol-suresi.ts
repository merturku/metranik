import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Toplam süre = dolum süresi (V / Q) + basınç ve sıcaklık stabilizasyonu için
// prosedürde öngörülen bekleme süreleri.
export const sogutmaDolumProsedureKontrolSuresiSchema = z.object({
  sistem_hacmi_L: z.number().positive(),
  dolum_debisi_Lmin: z.number().positive(),
  basinc_stabilizasyon_dakika: z.number().nonnegative(),
  sicaklik_stabilizasyon_dakika: z.number().nonnegative(),
});

export type SogutmaDolumProsedureKontrolSuresiInput = z.infer<
  typeof sogutmaDolumProsedureKontrolSuresiSchema
>;

export interface SogutmaDolumProsedureKontrolSuresiOutput {
  dolum_suresi_dakika: number;
  total_kontrol_suresi_dakika: number;
}

function compute(
  input: SogutmaDolumProsedureKontrolSuresiInput,
): CalcResult<SogutmaDolumProsedureKontrolSuresiOutput> {
  const dolumSuresiDk = input.sistem_hacmi_L / input.dolum_debisi_Lmin;
  const toplamSureDk =
    dolumSuresiDk + input.basinc_stabilizasyon_dakika + input.sicaklik_stabilizasyon_dakika;

  return {
    value: {
      dolum_suresi_dakika: dolumSuresiDk,
      total_kontrol_suresi_dakika: toplamSureDk,
    },
    intermediates: {
      dolum_suresi_dakika: dolumSuresiDk,
      basinc_stabilizasyon_dakika: input.basinc_stabilizasyon_dakika,
      sicaklik_stabilizasyon_dakika: input.sicaklik_stabilizasyon_dakika,
    },
    standardsUsed: [],
  };
}

export const sogutmaDolumProsedureKontrolSuresi: CalcModule<
  SogutmaDolumProsedureKontrolSuresiInput,
  SogutmaDolumProsedureKontrolSuresiOutput
> = {
  id: "sogutma-dolum-proseduru-kontrol-suresi",
  title: "Soğutma Dolum Prosedürü Kontrol Süresi",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaDolumProsedureKontrolSuresiSchema,
  compute,
};
