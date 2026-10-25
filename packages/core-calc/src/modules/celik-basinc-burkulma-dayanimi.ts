import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-1 §6.3.1, merkezi basınç altında eğilmeli burkulma (sınıf 1–3 kesit):
// λ̄ = Lcr/(i·λ1), λ1 = π·√(E/fy);  Φ = 0,5·[1 + α·(λ̄ − 0,2) + λ̄²];
// χ = 1/(Φ + √(Φ² − λ̄²)) ≤ 1;  Nb,Rd = χ·A·fy/γM1.
// α: Tablo 6.1 kusur katsayısı (a0 0,13; a 0,21; b 0,34; c 0,49; d 0,76), eğri
// Tablo 6.2'den kesit tipi ve eksene göre seçilir. λ̄ ≤ 0,2 ise burkulma ihmal
// edilir (§6.3.1.2(4)). fy: Tablo 3.1, EN 10025-2, t ≤ 40 mm.
const E_MPa = 210000;
const FY: Record<"S235" | "S275" | "S355", number> = { S235: 235, S275: 275, S355: 355 };
const ALFA: Record<"a0" | "a" | "b" | "c" | "d", number> = { a0: 0.13, a: 0.21, b: 0.34, c: 0.49, d: 0.76 };

export const celikBasincBurkulmaDayanimiInputSchema = z.object({
  celikSinifi: z.enum(["S235", "S275", "S355"]),
  kesitAlani_A_cm2: z.number().positive(),
  ataletYaricapi_i_cm: z.number().positive(),
  burkulmaBoyu_Lcr_m: z.number().positive(),
  burkulmaEgrisi: z.enum(["a0", "a", "b", "c", "d"]),
  gammaM1: z.number().positive(),
  tasarimKuvveti_NEd_kN: z.number().min(0),
});

export type CelikBasincBurkulmaDayanimiInput = z.infer<typeof celikBasincBurkulmaDayanimiInputSchema>;

export interface CelikBasincBurkulmaDayanimiOutput {
  burkulmaDayanimi_NbRd_kN: number;
}

function compute(input: CelikBasincBurkulmaDayanimiInput): CalcResult<CelikBasincBurkulmaDayanimiOutput> {
  const fy = FY[input.celikSinifi];
  const alfa = ALFA[input.burkulmaEgrisi];
  const A_mm2 = input.kesitAlani_A_cm2 * 100;
  const i_mm = input.ataletYaricapi_i_cm * 10;
  const Lcr_mm = input.burkulmaBoyu_Lcr_m * 1000;

  const lambda1 = Math.PI * Math.sqrt(E_MPa / fy);
  const narinlik = Lcr_mm / i_mm;
  const lambdaBar = narinlik / lambda1;
  const phi = 0.5 * (1 + alfa * (lambdaBar - 0.2) + lambdaBar ** 2);
  const chi = lambdaBar <= 0.2 ? 1 : Math.min(1, 1 / (phi + Math.sqrt(phi ** 2 - lambdaBar ** 2)));
  const NbRd_kN = (chi * A_mm2 * fy) / input.gammaM1 / 1000;
  const Ncr_kN = (Math.PI ** 2 * E_MPa * A_mm2) / narinlik ** 2 / 1000;
  const kullanim = input.tasarimKuvveti_NEd_kN / NbRd_kN;

  const verdict: CalcResult<CelikBasincBurkulmaDayanimiOutput>["verdict"] =
    kullanim <= 1
      ? {
          status: "uygun",
          note: `NEd = ${input.tasarimKuvveti_NEd_kN} kN ≤ Nb,Rd = ${NbRd_kN.toFixed(1)} kN (χ = ${chi.toFixed(3)}, kullanım %${(kullanim * 100).toFixed(0)}).`,
        }
      : {
          status: "uygunsuz",
          note: `NEd = ${input.tasarimKuvveti_NEd_kN} kN > Nb,Rd = ${NbRd_kN.toFixed(1)} kN: daha büyük atalet yarıçaplı kesit seçin veya burkulma boyunu ara bağlantıyla kısaltın.`,
        };

  return {
    value: { burkulmaDayanimi_NbRd_kN: NbRd_kN },
    intermediates: {
      akma_dayanimi_fy_MPa: fy,
      narinlik_Lcr_i: narinlik,
      referans_narinlik_lambda1: lambda1,
      boyutsuz_narinlik_lambdaBar: lambdaBar,
      kusur_katsayisi_alfa: alfa,
      phi,
      azaltma_katsayisi_chi: chi,
      euler_kritik_yuku_Ncr_kN: Ncr_kN,
      plastik_dayanim_Npl_kN: (A_mm2 * fy) / input.gammaM1 / 1000,
      kullanim_orani: kullanim,
    },
    standardsUsed: ["TS EN 1993-1-1"],
    verdict,
  };
}

export const celikBasincBurkulmaDayanimi: CalcModule<
  CelikBasincBurkulmaDayanimiInput,
  CelikBasincBurkulmaDayanimiOutput
> = {
  id: "celik-basinc-burkulma-dayanimi",
  title: "Çelik Basınç Elemanı Burkulma Dayanımı",
  discipline: "insaat",
  standards: ["TS EN 1993-1-1"],
  inputSchema: celikBasincBurkulmaDayanimiInputSchema,
  compute,
};
