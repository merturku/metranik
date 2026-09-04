import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Boru askı çubuğunun (hanger rod) çekme gerilmesi altında kesit kontrolü:
// gerekli kesit alanı A = Yük/σizin, çubuk dairesel kesitli kabul edilirse
// gerekli çap d = √(4A/π). Konsol Boru Destek Aralığı Kontrolü modülü askı
// noktaları arasındaki mesafeyi (eğilme) kontrol eder; bu modül o noktadaki
// askı çubuğunun kendisinin (çekme) yeterliliğini kontrol eder.
export const boruAskiCubuguKesitKontroluInputSchema = z.object({
  askiYuku_N: z.number().positive(),
  izinVerilenGerilme_sigma_MPa: z.number().positive(),
  mevcutCubukCapi_d_mm: z.number().positive(),
});

export type BoruAskiCubuguKesitKontroluInput = z.infer<
  typeof boruAskiCubuguKesitKontroluInputSchema
>;

export interface BoruAskiCubuguKesitKontroluOutput {
  gerekliCap_mm: number;
}

function compute(
  input: BoruAskiCubuguKesitKontroluInput,
): CalcResult<BoruAskiCubuguKesitKontroluOutput> {
  const gerekliAlanMm2 = input.askiYuku_N / input.izinVerilenGerilme_sigma_MPa;
  const gerekliCapMm = Math.sqrt((4 * gerekliAlanMm2) / Math.PI);

  return {
    value: { gerekliCap_mm: gerekliCapMm },
    intermediates: {
      gerekliAlan_mm2: gerekliAlanMm2,
    },
    standardsUsed: [],
    verdict:
      input.mevcutCubukCapi_d_mm >= gerekliCapMm
        ? { status: "uygun", note: "Mevcut çubuk çapı gerekli çapı karşılıyor." }
        : { status: "uygunsuz", note: "Mevcut çubuk çapı yetersiz, çekme gerilmesini karşılamıyor." },
  };
}

export const boruAskiCubuguKesitKontrolu: CalcModule<
  BoruAskiCubuguKesitKontroluInput,
  BoruAskiCubuguKesitKontroluOutput
> = {
  id: "boru-aski-cubugu-kesit-kontrolu",
  title: "Boru Askı Çubuğu Kesit Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruAskiCubuguKesitKontroluInputSchema,
  compute,
};
