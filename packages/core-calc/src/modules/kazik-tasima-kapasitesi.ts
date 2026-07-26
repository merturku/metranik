import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit statik kazık taşıma kapasitesi: Qu = qp×Ap + fs×As, Qa = Qu / FS.
// qp: uç taşıma birim direnci (kPa), Ap: kazık uç kesit alanı (m²),
// fs: çevre sürtünme birim direnci (kPa), As: kazık çevre yüzey alanı (m²),
// FS: güvenlik katsayısı (statik kazık tasarımında tipik 2-3).
// Dairesel kesitli kazık için Ap = π×D²/4, As = π×D×L.
export const kazikTasimaKapasitesiInputSchema = z.object({
  kazikCapi_D_m: z.number().positive(),
  kazikBoyu_L_m: z.number().positive(),
  ucTasimaDirenci_qp_kPa: z.number().positive(),
  cevreSurtunmeDirenci_fs_kPa: z.number().positive(),
  guvenlikKatsayisi_FS: z.number().positive(),
});

export type KazikTasimaKapasitesiInput = z.infer<typeof kazikTasimaKapasitesiInputSchema>;

export interface KazikTasimaKapasitesiOutput {
  izinVerilenKapasite_Qa_kN: number;
}

function compute(input: KazikTasimaKapasitesiInput): CalcResult<KazikTasimaKapasitesiOutput> {
  const ucAlani_Ap_m2 = (Math.PI * input.kazikCapi_D_m ** 2) / 4;
  const cevreAlani_As_m2 = Math.PI * input.kazikCapi_D_m * input.kazikBoyu_L_m;
  const ucTasimaKapasitesi_kN = input.ucTasimaDirenci_qp_kPa * ucAlani_Ap_m2;
  const cevreSurtunmeKapasitesi_kN = input.cevreSurtunmeDirenci_fs_kPa * cevreAlani_As_m2;
  const nihaiKapasite_Qu_kN = ucTasimaKapasitesi_kN + cevreSurtunmeKapasitesi_kN;
  const izinVerilenKapasite_Qa_kN = nihaiKapasite_Qu_kN / input.guvenlikKatsayisi_FS;

  return {
    value: { izinVerilenKapasite_Qa_kN },
    intermediates: {
      ucAlani_Ap_m2: Number(ucAlani_Ap_m2.toFixed(4)),
      cevreAlani_As_m2: Number(cevreAlani_As_m2.toFixed(3)),
      ucTasimaKapasitesi_kN: Number(ucTasimaKapasitesi_kN.toFixed(2)),
      cevreSurtunmeKapasitesi_kN: Number(cevreSurtunmeKapasitesi_kN.toFixed(2)),
      nihaiKapasite_Qu_kN: Number(nihaiKapasite_Qu_kN.toFixed(2)),
    },
    standardsUsed: [],
  };
}

export const kazikTasimaKapasitesi: CalcModule<
  KazikTasimaKapasitesiInput,
  KazikTasimaKapasitesiOutput
> = {
  id: "kazik-tasima-kapasitesi",
  title: "Kazık Taşıma Kapasitesi (Statik)",
  discipline: "insaat",
  standards: [],
  inputSchema: kazikTasimaKapasitesiInputSchema,
  compute,
};
