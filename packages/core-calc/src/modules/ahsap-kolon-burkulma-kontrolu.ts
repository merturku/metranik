import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen kesitli masif ahşap kolonda eksenel basınç + burkulma (TS EN 1995-1-1 §6.3.2):
// λ = Lef/i, i = boyut/√12;  λrel = (λ/π)·√(fc,0,k/E0,05)
// k = 0,5·[1 + βc·(λrel − 0,3) + λrel²], βc = 0,2 (masif ahşap);  kc = 1/(k + √(k² − λrel²))
// λrel ≤ 0,3 ise kc = 1.  Kontrol: σc,0,d = NEd/A ≤ kc·fc,0,d,  fc,0,d = kmod·fc,0,k/γM.
// TS EN 338 (2016): C16 fc,0,k 17 / E0,05 5400; C24 21 / 7400; C30 24 / 8000 MPa.
// kmod Tablo 3.1 (masif ahşap), ahşap kiriş eğilme modülüyle aynı.
const SINIF: Record<"C16" | "C24" | "C30", { fc0k: number; e005: number }> = {
  C16: { fc0k: 17, e005: 5400 },
  C24: { fc0k: 21, e005: 7400 },
  C30: { fc0k: 24, e005: 8000 },
};
const KMOD: Record<"1-2" | "3", Record<"kalici" | "uzun" | "orta" | "kisa" | "ani", number>> = {
  "1-2": { kalici: 0.6, uzun: 0.7, orta: 0.8, kisa: 0.9, ani: 1.1 },
  "3": { kalici: 0.5, uzun: 0.55, orta: 0.65, kisa: 0.7, ani: 0.9 },
};
const BETA_C = 0.2;

export const ahsapKolonBurkulmaKontroluInputSchema = z.object({
  dayanimSinifi: z.enum(["C16", "C24", "C30"]),
  genislik_b_mm: z.number().positive(),
  yukseklik_h_mm: z.number().positive(),
  burkulmaBoyu_y_m: z.number().positive(),
  burkulmaBoyu_z_m: z.number().positive(),
  eksenelYuk_NEd_kN: z.number().min(0),
  yukSuresi: z.enum(["kalici", "uzun", "orta", "kisa", "ani"]),
  servisSinifi: z.enum(["1-2", "3"]),
  gammaM: z.number().positive(),
});

export type AhsapKolonBurkulmaKontroluInput = z.infer<typeof ahsapKolonBurkulmaKontroluInputSchema>;

export interface AhsapKolonBurkulmaKontroluOutput {
  kullanimOrani: number;
}

function kcHesapla(lambdaRel: number): number {
  if (lambdaRel <= 0.3) return 1;
  const k = 0.5 * (1 + BETA_C * (lambdaRel - 0.3) + lambdaRel ** 2);
  return 1 / (k + Math.sqrt(k ** 2 - lambdaRel ** 2));
}

function compute(input: AhsapKolonBurkulmaKontroluInput): CalcResult<AhsapKolonBurkulmaKontroluOutput> {
  const { fc0k, e005 } = SINIF[input.dayanimSinifi];
  const kmod = KMOD[input.servisSinifi][input.yukSuresi];
  const b = input.genislik_b_mm;
  const h = input.yukseklik_h_mm;
  const alan = b * h;

  // y ekseni: h doğrultusunda eğilme (i = h/√12); z ekseni: b doğrultusunda (i = b/√12).
  const lambdaY = (input.burkulmaBoyu_y_m * 1000) / (h / Math.sqrt(12));
  const lambdaZ = (input.burkulmaBoyu_z_m * 1000) / (b / Math.sqrt(12));
  const oran = Math.sqrt(fc0k / e005) / Math.PI;
  const lambdaRelY = lambdaY * oran;
  const lambdaRelZ = lambdaZ * oran;
  const kcY = kcHesapla(lambdaRelY);
  const kcZ = kcHesapla(lambdaRelZ);
  const kc = Math.min(kcY, kcZ);

  const fc0d = (kmod * fc0k) / input.gammaM;
  const sigma = (input.eksenelYuk_NEd_kN * 1000) / alan;
  const kullanim = sigma / (kc * fc0d);
  const nrd = (kc * fc0d * alan) / 1000;
  const belirleyen = kcY <= kcZ ? "y (h doğrultusu)" : "z (b doğrultusu)";

  const verdict: CalcResult<AhsapKolonBurkulmaKontroluOutput>["verdict"] =
    kullanim <= 1
      ? {
          status: "uygun",
          note: `σc,0,d = ${sigma.toFixed(2)} MPa ≤ kc·fc,0,d = ${(kc * fc0d).toFixed(2)} MPa (kullanım %${(kullanim * 100).toFixed(0)}, belirleyen eksen ${belirleyen}).`,
        }
      : {
          status: "uygunsuz",
          note: `σc,0,d = ${sigma.toFixed(2)} MPa > kc·fc,0,d = ${(kc * fc0d).toFixed(2)} MPa (belirleyen eksen ${belirleyen}): kesiti büyütün, burkulma boyunu ara tutulumla kısaltın veya daha yüksek sınıf seçin. NRd = ${nrd.toFixed(1)} kN.`,
        };

  return {
    value: { kullanimOrani: kullanim },
    intermediates: {
      karakteristik_basinc_dayanimi_fc0k_MPa: fc0k,
      elastisite_modulu_E005_MPa: e005,
      narinlik_lambda_y: lambdaY,
      narinlik_lambda_z: lambdaZ,
      goreli_narinlik_lambda_rel_y: lambdaRelY,
      goreli_narinlik_lambda_rel_z: lambdaRelZ,
      burkulma_katsayisi_kc_y: kcY,
      burkulma_katsayisi_kc_z: kcZ,
      kmod,
      tasarim_basinc_dayanimi_fc0d_MPa: fc0d,
      basinc_gerilmesi_sigma_MPa: sigma,
      eksenel_tasima_kapasitesi_NRd_kN: nrd,
    },
    standardsUsed: ["TS EN 1995-1-1", "TS EN 338"],
    verdict,
  };
}

export const ahsapKolonBurkulmaKontrolu: CalcModule<AhsapKolonBurkulmaKontroluInput, AhsapKolonBurkulmaKontroluOutput> = {
  id: "ahsap-kolon-burkulma-kontrolu",
  title: "Ahşap Kolon Burkulma Kontrolü",
  discipline: "insaat",
  standards: ["TS EN 1995-1-1", "TS EN 338"],
  inputSchema: ahsapKolonBurkulmaKontroluInputSchema,
  compute,
};
