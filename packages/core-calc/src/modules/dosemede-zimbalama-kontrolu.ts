import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 (basitleştirilmiş): kolon-döşeme birleşiminde zımbalama (punching
// shear) kontrolü. Kritik kesit, kolon yüzünden d/2 mesafede kabul edilir;
// kare kolon için kritik çevre u=4×(c+d). Beton katkısı Kesme Kuvveti
// Kapasitesi (Beton) modülüyle aynı katsayıyı (0.35√fck) kullanır, ancak
// kesit genişliği yerine kritik çevre uzunluğu ile çarpılır: Vc=0.35√fck×u×d.
export const dosemedeZimbalamaKontroluInputSchema = z.object({
  kolonKenari_c_mm: z.number().positive(),
  doseFaydaliYukseklik_d_mm: z.number().positive(),
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  etkiyenYuk_Vu_kN: z.number().positive(),
});

export type DosemedeZimbalamaKontroluInput = z.infer<
  typeof dosemedeZimbalamaKontroluInputSchema
>;

export interface DosemedeZimbalamaKontroluOutput {
  zimbalamaKapasitesi_Vc_kN: number;
}

function compute(
  input: DosemedeZimbalamaKontroluInput,
): CalcResult<DosemedeZimbalamaKontroluOutput> {
  const kritikCevreUMm = 4 * (input.kolonKenari_c_mm + input.doseFaydaliYukseklik_d_mm);
  const zimbalamaKapasitesiN =
    0.35 *
    Math.sqrt(input.betonKarakteristikDayanim_fck_MPa) *
    kritikCevreUMm *
    input.doseFaydaliYukseklik_d_mm;
  const zimbalamaKapasitesiKN = zimbalamaKapasitesiN / 1000;

  return {
    value: { zimbalamaKapasitesi_Vc_kN: zimbalamaKapasitesiKN },
    intermediates: {
      kritikCevre_u_mm: kritikCevreUMm,
      etkiyenYuk_kN: input.etkiyenYuk_Vu_kN,
    },
    standardsUsed: ["TS 500"],
    verdict:
      input.etkiyenYuk_Vu_kN <= zimbalamaKapasitesiKN
        ? { status: "uygun", note: "Etkiyen yük zımbalama kapasitesinin altında." }
        : { status: "uygunsuz", note: "Etkiyen yük zımbalama kapasitesini aşıyor." },
  };
}

export const dosemedeZimbalamaKontrolu: CalcModule<
  DosemedeZimbalamaKontroluInput,
  DosemedeZimbalamaKontroluOutput
> = {
  id: "dosemede-zimbalama-kontrolu",
  title: "Döşemede Zımbalama (Punching Shear) Kontrolü",
  discipline: "insaat",
  standards: ["TS 500"],
  inputSchema: dosemedeZimbalamaKontroluInputSchema,
  compute,
};
