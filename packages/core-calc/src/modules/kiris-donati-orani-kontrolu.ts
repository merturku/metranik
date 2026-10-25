import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 §7.3 (TBDY 2018 §7.4.2 ile aynı sınırlar): kirişte çekme donatısı oranı
// ρ = As/(bw·d) için alt sınır ρmin = 0,8·fctd/fyd, üst sınır ρ ≤ 0,02 ve
// ρ ≤ 0,85·ρb. Dengeli donatı oranı ρb = 0,85·k1·(fcd/fyd)·600/(600 + fyd)
// (εcu = 0,003, Es = 200 000 MPa). k1 = 0,85 − 0,006·(fck − 25), 0,70–0,85
// arasında. fctd = 0,35·√fck/1,5. Basınç donatısı (ρ') ihmal edilir; bu, üst
// sınır kontrolünü güvenli tarafta bırakır.
const BETON_GAMMA_C = 1.5;
const CELIK_GAMMA_S = 1.15;
const MUTLAK_UST_SINIR = 0.02;

export const kirisDonatiOraniKontroluInputSchema = z.object({
  betonKarakteristikDayanim_fck_MPa: z.number().positive(),
  celikAkmaDayanimi_fyk_MPa: z.number().positive(),
  govdeGenisligi_bw_mm: z.number().positive(),
  faydaliYukseklik_d_mm: z.number().positive(),
  cekmeDonatisiAlani_As_mm2: z.number().positive(),
});

export type KirisDonatiOraniKontroluInput = z.infer<typeof kirisDonatiOraniKontroluInputSchema>;

export interface KirisDonatiOraniKontroluOutput {
  donatiOrani: number;
}

function compute(input: KirisDonatiOraniKontroluInput): CalcResult<KirisDonatiOraniKontroluOutput> {
  const fck = input.betonKarakteristikDayanim_fck_MPa;
  const fcd = fck / BETON_GAMMA_C;
  const fyd = input.celikAkmaDayanimi_fyk_MPa / CELIK_GAMMA_S;
  const fctd = (0.35 * Math.sqrt(fck)) / BETON_GAMMA_C;
  const k1 = Math.min(0.85, Math.max(0.7, 0.85 - 0.006 * (fck - 25)));
  const kesitAlani = input.govdeGenisligi_bw_mm * input.faydaliYukseklik_d_mm;

  const rho = input.cekmeDonatisiAlani_As_mm2 / kesitAlani;
  const rhoMin = (0.8 * fctd) / fyd;
  const rhoB = 0.85 * k1 * (fcd / fyd) * (600 / (600 + fyd));
  const rhoMax = Math.min(MUTLAK_UST_SINIR, 0.85 * rhoB);

  const verdict: CalcResult<KirisDonatiOraniKontroluOutput>["verdict"] =
    rho < rhoMin
      ? {
          status: "uygunsuz",
          note: `ρ = ${rho.toFixed(5)} < ρmin = ${rhoMin.toFixed(5)}: en az ${(rhoMin * kesitAlani).toFixed(0)} mm² çekme donatısı gerekli.`,
        }
      : rho > rhoMax
        ? {
            status: "uygunsuz",
            note: `ρ = ${rho.toFixed(5)} > ρmax = ${rhoMax.toFixed(5)}: gevrek kırılma riski, kesiti büyütün veya basınç donatısı ekleyin.`,
          }
        : {
            status: "uygun",
            note: `ρmin = ${rhoMin.toFixed(5)} ≤ ρ = ${rho.toFixed(5)} ≤ ρmax = ${rhoMax.toFixed(5)}.`,
          };

  return {
    value: { donatiOrani: rho },
    intermediates: {
      minimum_donati_orani: rhoMin,
      dengeli_donati_orani_rhob: rhoB,
      maksimum_donati_orani: rhoMax,
      minimum_donati_alani_mm2: rhoMin * kesitAlani,
      maksimum_donati_alani_mm2: rhoMax * kesitAlani,
      k1,
    },
    standardsUsed: ["TS 500", "TBDY 2018"],
    verdict,
  };
}

export const kirisDonatiOraniKontrolu: CalcModule<
  KirisDonatiOraniKontroluInput,
  KirisDonatiOraniKontroluOutput
> = {
  id: "kiris-donati-orani-kontrolu",
  title: "Kiriş Donatı Oranı Sınırları Kontrolü",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: kirisDonatiOraniKontroluInputSchema,
  compute,
};
