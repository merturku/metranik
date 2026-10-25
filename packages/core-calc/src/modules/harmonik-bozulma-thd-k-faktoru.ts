import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Akım harmonik bozulması (IEC 61000-2-2 tanımı): THDI = √(Σh≥2 Ih²)/I1.
// Toplam efektif akım Irms = √(Σ Ih²). K-faktörü (UL 1561; IEEE C57.110'daki
// harmonik kayıp faktörüyle aynı ifade) K = Σ(Ih²·h²)/Σ Ih² — trafodaki girdap
// akımı kayıplarının harmoniklerle kaç kat arttığını gösterir. Dengeli üç fazlı
// sistemde üçün katı harmonikler (3., 9.) nötrde toplanır: In = 3·√(I3² + I9²).
// Hesap yalnız girilen 13. mertebeye kadar olan harmonikleri kapsar.
const HARMONIK_MERTEBELERI = [3, 5, 7, 9, 11, 13] as const;

export const harmonikBozulmaThdKFaktoruInputSchema = z.object({
  temelBilesenAkimi_I1_A: z.number().positive(),
  harmonik3_A: z.number().nonnegative(),
  harmonik5_A: z.number().nonnegative(),
  harmonik7_A: z.number().nonnegative(),
  harmonik9_A: z.number().nonnegative(),
  harmonik11_A: z.number().nonnegative(),
  harmonik13_A: z.number().nonnegative(),
  izinVerilenThd_yuzde: z.number().positive(),
});

export type HarmonikBozulmaThdKFaktoruInput = z.infer<typeof harmonikBozulmaThdKFaktoruInputSchema>;

export interface HarmonikBozulmaThdKFaktoruOutput {
  thd_yuzde: number;
}

function compute(input: HarmonikBozulmaThdKFaktoruInput): CalcResult<HarmonikBozulmaThdKFaktoruOutput> {
  const i1 = input.temelBilesenAkimi_I1_A;
  const harmonikler = [
    input.harmonik3_A,
    input.harmonik5_A,
    input.harmonik7_A,
    input.harmonik9_A,
    input.harmonik11_A,
    input.harmonik13_A,
  ];

  const harmonikKareToplami = harmonikler.reduce((t, ih) => t + ih ** 2, 0);
  const toplamKare = i1 ** 2 + harmonikKareToplami;
  const agirlikliKareToplami =
    i1 ** 2 + harmonikler.reduce((t, ih, i) => t + ih ** 2 * (HARMONIK_MERTEBELERI[i] ?? 1) ** 2, 0);

  const thdYuzde = (Math.sqrt(harmonikKareToplami) / i1) * 100;
  const irms = Math.sqrt(toplamKare);
  const kFaktoru = agirlikliKareToplami / toplamKare;
  const notrAkimiA = 3 * Math.sqrt(input.harmonik3_A ** 2 + input.harmonik9_A ** 2);
  const uygun = thdYuzde <= input.izinVerilenThd_yuzde;

  return {
    value: { thd_yuzde: thdYuzde },
    intermediates: {
      toplam_efektif_akim_A: irms,
      k_faktoru: kFaktoru,
      notr_harmonik_akimi_A: notrAkimiA,
      notr_faz_akim_orani: notrAkimiA / irms,
    },
    standardsUsed: ["IEC 61000-2-2", "UL 1561"],
    verdict: uygun
      ? {
          status: "uygun",
          note: `THDI = %${thdYuzde.toFixed(1)} ≤ %${input.izinVerilenThd_yuzde}.`,
        }
      : {
          status: "uygunsuz",
          note: `THDI = %${thdYuzde.toFixed(1)} > %${input.izinVerilenThd_yuzde}: harmonik filtre, reaktör veya K-sınıfı trafo değerlendirin.`,
        },
  };
}

export const harmonikBozulmaThdKFaktoru: CalcModule<
  HarmonikBozulmaThdKFaktoruInput,
  HarmonikBozulmaThdKFaktoruOutput
> = {
  id: "harmonik-bozulma-thd-k-faktoru",
  title: "Akım Harmonik Bozulması (THD) ve K-Faktörü",
  discipline: "elektrik",
  standards: ["IEC 61000-2-2", "UL 1561"],
  inputSchema: harmonikBozulmaThdKFaktoruInputSchema,
  compute,
};
