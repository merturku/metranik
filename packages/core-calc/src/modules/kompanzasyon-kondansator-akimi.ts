import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kompanzasyonKondansatorAkimiSchema = z.object({
  gucsel_guc_kVA: z.number().positive(),
  mevcut_cos_phi: z.number().positive().max(1),
  hedef_cos_phi: z.number().positive().max(1),
  isletme_gerilimi_V: z.number().positive(),
});

export type KompanzasyonKondansatorAkimiInput = z.infer<typeof kompanzasyonKondansatorAkimiSchema>;

export interface KompanzasyonKondansatorAkimiOutput {
  gereken_reaktif_guc_kVAr: number;
  kondansator_akimi_A: number;
}

export const kompanzasyonKondansatorAkimi: CalcModule<KompanzasyonKondansatorAkimiInput, KompanzasyonKondansatorAkimiOutput> = {
  id: "kompanzasyon-kondansator-akimi",
  title: "Kompanzasyon Kondansatör Akımı",
  discipline: "elektrik",
  standards: ["IEC 60831"],
  inputSchema: kompanzasyonKondansatorAkimiSchema,

  compute(input: KompanzasyonKondansatorAkimiInput): CalcResult<KompanzasyonKondansatorAkimiOutput> {
    const tan_phi_mevcut = Math.sqrt(1 / Math.pow(input.mevcut_cos_phi, 2) - 1);
    const tan_phi_hedef = Math.sqrt(1 / Math.pow(input.hedef_cos_phi, 2) - 1);
    const gereken_reaktif_guc_kVAr = input.gucsel_guc_kVA * (tan_phi_mevcut - tan_phi_hedef);
    const kondansator_akimi_A = (gereken_reaktif_guc_kVAr * 1000) / (Math.sqrt(3) * input.isletme_gerilimi_V);

    return {
      value: {
        gereken_reaktif_guc_kVAr: Math.round(gereken_reaktif_guc_kVAr * 10) / 10,
        kondansator_akimi_A: Math.round(kondansator_akimi_A * 10) / 10,
      },
      intermediates: {
        tan_phi_mevcut: Math.round(tan_phi_mevcut * 1000) / 1000,
        tan_phi_hedef: Math.round(tan_phi_hedef * 1000) / 1000,
      },
      standardsUsed: ["IEC 60831"],
    };
  },
};
