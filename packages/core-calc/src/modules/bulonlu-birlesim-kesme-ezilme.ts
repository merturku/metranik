import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1993-1-8 Tablo 3.4, kesmeye çalışan (A kategorisi, ezilme tipi) bulonlu birleşim.
// Kesme (bulon başına): Fv,Rd = m·αv·fub·A/γM2; diş düzleminde A = As, αv = 0,6
// (4.6, 5.6, 8.8) veya 0,5 (10.9); gövde düzleminde A = πd²/4, αv = 0,6.
// Ezilme: Fb,Rd = k1·αb·fu·d·t/γM2, αb = min(αd; fub/fu; 1),
//   αd = e1/(3d0) (uç bulon), p1/(3d0) − 1/4 (iç bulon);
//   k1 = min(2,8e2/d0 − 1,7; 1,4p2/d0 − 1,7; 2,5) (kenar bulon; tek sırada p2 terimi yok).
// Güvenli tarafta en elverişsiz bulon değerleri birlikte alınır. Grup: §3.7(1) ile
// n × min(Fv,Rd; Fb,Rd). Uzun birleşim (§3.8): Lj = (n1 − 1)p1 > 15d ise
// βLf = 1 − (Lj − 15d)/(200d), 0,75 ≤ βLf ≤ 1, kesme dayanımına uygulanır.
// Asgari mesafeler Tablo 3.3: e1, e2 ≥ 1,2d0; p1 ≥ 2,2d0; p2 ≥ 2,4d0.
// Delik çapı d0: normal yuvarlak delik boşluğu (EN 1090-2) M12–M14 1 mm, M16–M24 2 mm, M27+ 3 mm.
const BULON: Record<"M12" | "M16" | "M20" | "M22" | "M24" | "M27" | "M30", { d: number; As: number; d0: number }> = {
  M12: { d: 12, As: 84.3, d0: 13 },
  M16: { d: 16, As: 157, d0: 18 },
  M20: { d: 20, As: 245, d0: 22 },
  M22: { d: 22, As: 303, d0: 24 },
  M24: { d: 24, As: 353, d0: 26 },
  M27: { d: 27, As: 459, d0: 30 },
  M30: { d: 30, As: 561, d0: 33 },
};
const SINIF: Record<"4.6" | "5.6" | "8.8" | "10.9", { fub: number; alfaVDis: number }> = {
  "4.6": { fub: 400, alfaVDis: 0.6 },
  "5.6": { fub: 500, alfaVDis: 0.6 },
  "8.8": { fub: 800, alfaVDis: 0.6 },
  "10.9": { fub: 1000, alfaVDis: 0.5 },
};
const LEVHA_FU: Record<"S235" | "S275" | "S355", number> = { S235: 360, S275: 430, S355: 510 };

export const bulonluBirlesimKesmeEzilmeInputSchema = z.object({
  bulonCapi: z.enum(["M12", "M16", "M20", "M22", "M24", "M27", "M30"]),
  bulonSinifi: z.enum(["4.6", "5.6", "8.8", "10.9"]),
  kesmeDuzlemi: z.enum(["dis", "govde"]),
  kesmeDuzlemiSayisi: z.number().int().min(1).max(2),
  levhaCelikSinifi: z.enum(["S235", "S275", "S355"]),
  levhaKalinligi_t_mm: z.number().positive(),
  ucMesafesi_e1_mm: z.number().positive(),
  bulonAraligi_p1_mm: z.number().positive(),
  kenarMesafesi_e2_mm: z.number().positive(),
  siraAraligi_p2_mm: z.number().positive(),
  kuvvetYonundeBulonSayisi_n1: z.number().int().min(1),
  siraSayisi_n2: z.number().int().min(1),
  tasarimKuvveti_FEd_kN: z.number().min(0),
  gammaM2: z.number().positive(),
});

export type BulonluBirlesimKesmeEzilmeInput = z.infer<typeof bulonluBirlesimKesmeEzilmeInputSchema>;

export interface BulonluBirlesimKesmeEzilmeOutput {
  grupDayanimi_kN: number;
}

function compute(input: BulonluBirlesimKesmeEzilmeInput): CalcResult<BulonluBirlesimKesmeEzilmeOutput> {
  const { d, As, d0 } = BULON[input.bulonCapi];
  const { fub, alfaVDis } = SINIF[input.bulonSinifi];
  const fu = LEVHA_FU[input.levhaCelikSinifi];
  const { ucMesafesi_e1_mm: e1, bulonAraligi_p1_mm: p1, kenarMesafesi_e2_mm: e2, siraAraligi_p2_mm: p2 } = input;
  const n1 = input.kuvvetYonundeBulonSayisi_n1;
  const n2 = input.siraSayisi_n2;
  const g = input.gammaM2;

  const disDuzlemi = input.kesmeDuzlemi === "dis";
  const alfaV = disDuzlemi ? alfaVDis : 0.6;
  const A = disDuzlemi ? As : (Math.PI * d * d) / 4;
  const Lj = (n1 - 1) * p1;
  const betaLf = Lj > 15 * d ? Math.min(1, Math.max(0.75, 1 - (Lj - 15 * d) / (200 * d))) : 1;
  const FvRd = (betaLf * input.kesmeDuzlemiSayisi * alfaV * fub * A) / g / 1000;

  const alfaD = n1 >= 2 ? Math.min(e1 / (3 * d0), p1 / (3 * d0) - 0.25) : e1 / (3 * d0);
  const alfaB = Math.min(alfaD, fub / fu, 1);
  const k1 =
    n2 >= 2 ? Math.min((2.8 * e2) / d0 - 1.7, (1.4 * p2) / d0 - 1.7, 2.5) : Math.min((2.8 * e2) / d0 - 1.7, 2.5);
  const FbRd = (k1 * alfaB * fu * d * input.levhaKalinligi_t_mm) / g / 1000;

  const n = n1 * n2;
  const grup = n * Math.min(FvRd, FbRd);
  const kullanim = input.tasarimKuvveti_FEd_kN / grup;

  const ihlaller: string[] = [];
  if (e1 < 1.2 * d0) ihlaller.push(`e1 = ${e1} < 1,2d0 = ${(1.2 * d0).toFixed(1)} mm`);
  if (e2 < 1.2 * d0) ihlaller.push(`e2 = ${e2} < 1,2d0 = ${(1.2 * d0).toFixed(1)} mm`);
  if (n1 >= 2 && p1 < 2.2 * d0) ihlaller.push(`p1 = ${p1} < 2,2d0 = ${(2.2 * d0).toFixed(1)} mm`);
  if (n2 >= 2 && p2 < 2.4 * d0) ihlaller.push(`p2 = ${p2} < 2,4d0 = ${(2.4 * d0).toFixed(1)} mm`);

  const belirleyici = FvRd <= FbRd ? "bulon kesmesi" : "levha ezilmesi";
  const verdict: CalcResult<BulonluBirlesimKesmeEzilmeOutput>["verdict"] =
    ihlaller.length > 0
      ? { status: "uygunsuz", note: `Asgari mesafe koşulu sağlanmıyor (Tablo 3.3): ${ihlaller.join("; ")}.` }
      : kullanim <= 1
        ? {
            status: "uygun",
            note: `FEd = ${input.tasarimKuvveti_FEd_kN} kN ≤ ${grup.toFixed(1)} kN (${n} bulon, belirleyici: ${belirleyici}, kullanım %${(kullanim * 100).toFixed(0)}).`,
          }
        : {
            status: "uygunsuz",
            note: `FEd = ${input.tasarimKuvveti_FEd_kN} kN > ${grup.toFixed(1)} kN (belirleyici: ${belirleyici}): bulon sayısını/çapını veya ${belirleyici === "levha ezilmesi" ? "levha kalınlığını, uç ve kenar mesafelerini" : "bulon sınıfını"} artırın.`,
          };

  return {
    value: { grupDayanimi_kN: grup },
    intermediates: {
      delik_capi_d0_mm: d0,
      kesme_alani_A_mm2: A,
      alfa_v: alfaV,
      uzun_birlesim_betaLf: betaLf,
      bulon_kesme_dayanimi_FvRd_kN: FvRd,
      alfa_d: alfaD,
      alfa_b: alfaB,
      k1,
      levha_ezilme_dayanimi_FbRd_kN: FbRd,
      bulon_sayisi: n,
      kullanim_orani: kullanim,
    },
    standardsUsed: ["TS EN 1993-1-8"],
    verdict,
  };
}

export const bulonluBirlesimKesmeEzilme: CalcModule<
  BulonluBirlesimKesmeEzilmeInput,
  BulonluBirlesimKesmeEzilmeOutput
> = {
  id: "bulonlu-birlesim-kesme-ezilme",
  title: "Bulonlu Birleşim Kesme ve Ezilme Dayanımı",
  discipline: "insaat",
  standards: ["TS EN 1993-1-8"],
  inputSchema: bulonluBirlesimKesmeEzilmeInputSchema,
  compute,
};
