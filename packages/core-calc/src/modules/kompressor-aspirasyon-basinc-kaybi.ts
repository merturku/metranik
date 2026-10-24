import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Emme hattı kaybı Darcy-Weisbach ile: ΔP = f × (L/D) × (ρ×V²/2). Debi emiş
// koşullarındaki serbest hava debisidir, bu yüzden ρ ≈ 1,2 kg/m³ (20 °C, deniz
// seviyesi) alınır. Darcy sürtünme katsayısı f mühendis girdisidir (bkz. Boru
// Sürtünme Katsayısı modülü).
export const kompressorAspirasyanBasincKaybiSchema = z.object({
  debi_m3min: z.number().positive(),
  emme_boru_capı_mm: z.number().positive(),
  emme_boru_uzunlugu_m: z.number().positive(),
  surtunme_katsayisi_f: z.number().positive(),
  max_basinc_kaybi_kPa: z.number().positive(),
});

export type KompressorAspirasyanBasincKaybiInput = z.infer<
  typeof kompressorAspirasyanBasincKaybiSchema
>;

export interface KompressorAspirasyanBasincKaybiOutput {
  basinc_kaybi_Pa: number;
  basinc_kaybi_kPa: number;
}

const HAVA_YOGUNLUGU_KG_M3 = 1.2;

function compute(
  input: KompressorAspirasyanBasincKaybiInput,
): CalcResult<KompressorAspirasyanBasincKaybiOutput> {
  const capM = input.emme_boru_capı_mm / 1000;
  const kesitAlaniM2 = (Math.PI * capM ** 2) / 4;
  const hizMS = input.debi_m3min / 60 / kesitAlaniM2;
  const dinamikBasincPa = (HAVA_YOGUNLUGU_KG_M3 * hizMS ** 2) / 2;
  const basincKaybiPa =
    input.surtunme_katsayisi_f * (input.emme_boru_uzunlugu_m / capM) * dinamikBasincPa;
  const basincKaybiKPa = basincKaybiPa / 1000;

  return {
    value: { basinc_kaybi_Pa: basincKaybiPa, basinc_kaybi_kPa: basincKaybiKPa },
    intermediates: {
      hava_hizi_ms: hizMS,
      dinamik_basinc_Pa: dinamikBasincPa,
      hava_yogunlugu_kgm3: HAVA_YOGUNLUGU_KG_M3,
    },
    standardsUsed: [],
    verdict:
      basincKaybiKPa <= input.max_basinc_kaybi_kPa
        ? {
            status: "uygun",
            note: `Emme hattı kaybı ${basincKaybiKPa.toFixed(2)} kPa ≤ ${input.max_basinc_kaybi_kPa} kPa.`,
          }
        : {
            status: "uygunsuz",
            note: `Emme hattı kaybı ${basincKaybiKPa.toFixed(2)} kPa > ${input.max_basinc_kaybi_kPa} kPa: boru çapını büyütün ya da hattı kısaltın.`,
          },
  };
}

export const kompressorAspirasyanBasincKaybi: CalcModule<
  KompressorAspirasyanBasincKaybiInput,
  KompressorAspirasyanBasincKaybiOutput
> = {
  id: "kompressor-aspirasyon-basinc-kaybi",
  title: "Kompresör Aspirasyon Basınç Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kompressorAspirasyanBasincKaybiSchema,
  compute,
};
