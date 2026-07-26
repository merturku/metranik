import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kohezyonsuz zeminde sonsuz şev (infinite slope) güvenlik katsayısı:
// FS = tan(φ) / tan(β).
// φ: zeminin içsel sürtünme açısı (derece), β: şev eğim açısı (derece).
// Klasik zemin mekaniği ilişkisi; kohezyonlu zeminlerde veya yeraltı suyu
// varlığında ek terimler (c, γw) gerekir, bu modül kuru/kohezyonsuz durumu kapsar.
export const sonsuzSevStabilitesiInputSchema = z.object({
  icselSurtunmeAcisi_phi_derece: z.number().positive().max(89),
  sevEgimAcisi_beta_derece: z.number().positive().max(89),
});

export type SonsuzSevStabilitesiInput = z.infer<typeof sonsuzSevStabilitesiInputSchema>;

export interface SonsuzSevStabilitesiOutput {
  guvenlikKatsayisi_FS: number;
}

function compute(input: SonsuzSevStabilitesiInput): CalcResult<SonsuzSevStabilitesiOutput> {
  const phiRad = (input.icselSurtunmeAcisi_phi_derece * Math.PI) / 180;
  const betaRad = (input.sevEgimAcisi_beta_derece * Math.PI) / 180;
  const guvenlikKatsayisi_FS = Math.tan(phiRad) / Math.tan(betaRad);

  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (guvenlikKatsayisi_FS >= 1.5) {
    status = "uygun";
    note = "Güvenlik katsayısı ≥1.5; şev stabil kabul edilir.";
  } else if (guvenlikKatsayisi_FS >= 1.0) {
    status = "sinirda";
    note = "Güvenlik katsayısı 1.0-1.5 arasında; detaylı zemin etüdü gerekir.";
  } else {
    status = "uygunsuz";
    note = "Güvenlik katsayısı <1.0; şev göçme riski taşır.";
  }

  return {
    value: { guvenlikKatsayisi_FS },
    intermediates: {
      icselSurtunmeAcisi_phi_derece: input.icselSurtunmeAcisi_phi_derece,
      sevEgimAcisi_beta_derece: input.sevEgimAcisi_beta_derece,
    },
    standardsUsed: [],
    verdict: { status, note },
  };
}

export const sonsuzSevStabilitesi: CalcModule<
  SonsuzSevStabilitesiInput,
  SonsuzSevStabilitesiOutput
> = {
  id: "sonsuz-sev-stabilitesi",
  title: "Şev Stabilitesi (Sonsuz Şev)",
  discipline: "insaat",
  standards: [],
  inputSchema: sonsuzSevStabilitesiInputSchema,
  compute,
};
