import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-1 kesit dayanımı, sınıf 1–2 I/H kiriş (yanal burulmalı burkulma engelli):
// §6.2.5 Mc,Rd = Wpl·fy/γM0;  §6.2.6 Vpl,Rd = Av·(fy/√3)/γM0.
// §6.2.8 yüksek kesme (VEd > 0,5·Vpl,Rd): ρ = (2VEd/Vpl,Rd − 1)²,
//   My,V,Rd = (Wpl − ρ·hw²·tw/4)·fy/γM0 ≤ Mc,Rd  (I kesit, Aw = hw·tw).
// §6.2.6(6): hw/tw > 72·ε/η ise gövde kayma burkulması (EN 1993-1-5) ayrıca kontrol
// edilmeli; ε = √(235/fy), η güvenli tarafta 1,0 alınmıştır.
const FY: Record<"S235" | "S275" | "S355", number> = { S235: 235, S275: 275, S355: 355 };

export const celikKirisEgilmeKesmeInputSchema = z.object({
  celikSinifi: z.enum(["S235", "S275", "S355"]),
  plastikMukavemetMomenti_Wpl_cm3: z.number().positive(),
  kesmeAlani_Av_cm2: z.number().positive(),
  govdeYuksekligi_hw_mm: z.number().positive(),
  govdeKalinligi_tw_mm: z.number().positive(),
  tasarimMomenti_MEd_kNm: z.number().min(0),
  tasarimKesmesi_VEd_kN: z.number().min(0),
  gammaM0: z.number().positive(),
});

export type CelikKirisEgilmeKesmeInput = z.infer<typeof celikKirisEgilmeKesmeInputSchema>;

export interface CelikKirisEgilmeKesmeOutput {
  egilmeDayanimi_kNm: number;
}

function compute(input: CelikKirisEgilmeKesmeInput): CalcResult<CelikKirisEgilmeKesmeOutput> {
  const fy = FY[input.celikSinifi];
  const g = input.gammaM0;
  const Wpl = input.plastikMukavemetMomenti_Wpl_cm3 * 1000;
  const Av = input.kesmeAlani_Av_cm2 * 100;
  const hw = input.govdeYuksekligi_hw_mm;
  const tw = input.govdeKalinligi_tw_mm;
  const MEd = input.tasarimMomenti_MEd_kNm;
  const VEd = input.tasarimKesmesi_VEd_kN;

  const McRd = (Wpl * fy) / g / 1e6;
  const VplRd = (Av * fy) / Math.sqrt(3) / g / 1000;
  const yuksekKesme = VEd > 0.5 * VplRd;
  const rho = yuksekKesme ? (Math.min(VEd / VplRd, 1) * 2 - 1) ** 2 : 0;
  const MRd = yuksekKesme ? Math.min(McRd, ((Wpl - (rho * hw * hw * tw) / 4) * fy) / g / 1e6) : McRd;
  const eps = Math.sqrt(235 / fy);
  const narinGovde = hw / tw > 72 * eps;

  const verdict: CalcResult<CelikKirisEgilmeKesmeOutput>["verdict"] =
    VEd > VplRd
      ? { status: "uygunsuz", note: `VEd = ${VEd} kN > Vpl,Rd = ${VplRd.toFixed(1)} kN: gövde kesmede yetersiz.` }
      : MEd > MRd
        ? {
            status: "uygunsuz",
            note: `MEd = ${MEd} kNm > ${yuksekKesme ? "kesmeyle azaltılmış My,V,Rd" : "Mc,Rd"} = ${MRd.toFixed(1)} kNm: daha büyük profil seçin.`,
          }
        : narinGovde
          ? {
              status: "sinirda",
              note: `Kesit dayanımı yeterli ama hw/tw = ${(hw / tw).toFixed(1)} > 72ε = ${(72 * eps).toFixed(1)}: gövde kayma burkulması EN 1993-1-5'e göre kontrol edilmeli.`,
            }
          : {
              status: "uygun",
              note: `MEd/MRd = ${(MEd / MRd).toFixed(2)}, VEd/Vpl,Rd = ${(VEd / VplRd).toFixed(2)}${yuksekKesme ? " (yüksek kesme azaltması uygulandı)" : ""}.`,
            };

  return {
    value: { egilmeDayanimi_kNm: MRd },
    intermediates: {
      akma_dayanimi_fy_MPa: fy,
      plastik_moment_dayanimi_McRd_kNm: McRd,
      plastik_kesme_dayanimi_VplRd_kN: VplRd,
      kesme_orani_VEd_Vpl: VEd / VplRd,
      kesme_azaltma_katsayisi_rho: rho,
      govde_narinligi_hw_tw: hw / tw,
      govde_siniri_72eps: 72 * eps,
      moment_kullanim_orani: MEd / MRd,
    },
    standardsUsed: ["TS EN 1993-1-1"],
    verdict,
  };
}

export const celikKirisEgilmeKesme: CalcModule<CelikKirisEgilmeKesmeInput, CelikKirisEgilmeKesmeOutput> = {
  id: "celik-kiris-egilme-kesme",
  title: "Çelik Kiriş Eğilme ve Kesme Dayanımı",
  discipline: "insaat",
  standards: ["TS EN 1993-1-1"],
  inputSchema: celikKirisEgilmeKesmeInputSchema,
  compute,
};
