import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sonsuz şev (kohezyonlu, c'-φ'): FS = [c' + (γ·z·cos²β − u)·tanφ'] / (γ·z·sinβ·cosβ), u = ru·γ·z
export const sonsuzSevStabilitesiCPhiInputSchema = z.object({
  kohezyon_kPa: z.number().min(0),
  icSurtunmeAcisi_derece: z.number().min(0).max(50),
  birimHacimAgirlik_kNm3: z.number().positive(),
  kayma_derinligi_m: z.number().positive(),
  sevEgimi_derece: z.number().gt(0).lt(89),
  gozenekSuBasinciOrani_ru: z.number().min(0).max(1),
  gerekliFS: z.number().min(1),
});

export type SonsuzSevStabilitesiCPhiInput = z.infer<typeof sonsuzSevStabilitesiCPhiInputSchema>;
export interface SonsuzSevStabilitesiCPhiOutput {
  guvenlikSayisi: number;
}

function compute(input: SonsuzSevStabilitesiCPhiInput): CalcResult<SonsuzSevStabilitesiCPhiOutput> {
  const b = (input.sevEgimi_derece * Math.PI) / 180;
  const phi = (input.icSurtunmeAcisi_derece * Math.PI) / 180;
  const gz = input.birimHacimAgirlik_kNm3 * input.kayma_derinligi_m;
  const sigmaN = gz * Math.cos(b) ** 2;
  const u = input.gozenekSuBasinciOrani_ru * gz;
  const tauKayan = gz * Math.sin(b) * Math.cos(b);
  const tauDirenc = input.kohezyon_kPa + (sigmaN - u) * Math.tan(phi);
  const fs = tauDirenc / tauKayan;
  const status = fs >= input.gerekliFS ? "uygun" : fs >= 1 ? "sinirda" : "uygunsuz";
  return {
    value: { guvenlikSayisi: fs },
    intermediates: {
      kayma_duzleminde_normal_gerilme_kPa: sigmaN,
      gozenek_suyu_basinci_kPa: u,
      kayan_gerilme_kPa: tauKayan,
      kayma_dayanimi_kPa: tauDirenc,
      kohezyonsuz_kuru_FS_tanphi_tanbeta: Math.tan(phi) / Math.tan(b),
    },
    standardsUsed: ["Sonsuz şev analizi (Skempton & DeLory / Das)"],
    verdict: { status, note: `FS = ${fs.toFixed(2)} (gerekli ${input.gerekliFS})` },
  };
}

export const sonsuzSevStabilitesiCPhi: CalcModule<SonsuzSevStabilitesiCPhiInput, SonsuzSevStabilitesiCPhiOutput> = {
  id: "sonsuz-sev-stabilitesi-c-phi",
  title: "Sonsuz Şev Stabilitesi (Kohezyonlu, Gözenek Suyu Etkili)",
  discipline: "insaat",
  standards: ["Sonsuz şev analizi (Skempton & DeLory / Das)"],
  inputSchema: sonsuzSevStabilitesiCPhiInputSchema,
  compute,
};
