import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 12237 (dairesel) / EN 1507 (dikdörtgen) sac kanal sızdırmazlık testi:
// ölçülen sızıntı, kanal yüzey alanına bölünerek sızıntı faktörüne çevrilir
// (f = q/A) ve sınıf sınırıyla karşılaştırılır: fmax = c × p^0,65. c katsayıları
// (L·s⁻¹·m⁻²·Pa⁻⁰·⁶⁵) sınıf tablosundandır, yerel baskıdan teyit edin. Sınıfa
// göre izin verilen azami test basıncı kontrolü bu modülün kapsamı dışındadır.
const SINIF_KATSAYISI: Record<"A" | "B" | "C" | "D", number> = {
  A: 0.027,
  B: 0.009,
  C: 0.003,
  D: 0.001,
};
const BASINC_USSU = 0.65;

export const kanalSizdirmazlikSinifiKontroluInputSchema = z.object({
  testBasinci_Pa: z.number().positive(),
  kanalYuzeyAlani_m2: z.number().positive(),
  olculenSizinti_Ls: z.number().nonnegative(),
  hedefSinif: z.enum(["A", "B", "C", "D"]),
});

export type KanalSizdirmazlikSinifiKontroluInput = z.infer<
  typeof kanalSizdirmazlikSinifiKontroluInputSchema
>;

export interface KanalSizdirmazlikSinifiKontroluOutput {
  sizintiFaktoru_Lsm2: number;
}

function compute(
  input: KanalSizdirmazlikSinifiKontroluInput,
): CalcResult<KanalSizdirmazlikSinifiKontroluOutput> {
  const basincCarpani = input.testBasinci_Pa ** BASINC_USSU;
  const sizintiFaktoru = input.olculenSizinti_Ls / input.kanalYuzeyAlani_m2;
  const izinliFaktor = SINIF_KATSAYISI[input.hedefSinif] * basincCarpani;
  const saglananEnIyiSinif =
    (["D", "C", "B", "A"] as const).find((s) => sizintiFaktoru <= SINIF_KATSAYISI[s] * basincCarpani) ??
    "sınıf dışı";
  const uygun = sizintiFaktoru <= izinliFaktor;

  return {
    value: { sizintiFaktoru_Lsm2: sizintiFaktoru },
    intermediates: {
      izinVerilenSizintiFaktoru_Lsm2: izinliFaktor,
      izinVerilenSizinti_Ls: izinliFaktor * input.kanalYuzeyAlani_m2,
      kullanimOrani_yuzde: (sizintiFaktoru / izinliFaktor) * 100,
      saglananEnIyiSinif,
    },
    standardsUsed: ["EN 12237", "EN 1507"],
    verdict: uygun
      ? {
          status: "uygun",
          note: `f = ${sizintiFaktoru.toFixed(3)} ≤ ${izinliFaktor.toFixed(3)} L/(s·m²): Sınıf ${input.hedefSinif} sağlanıyor.`,
        }
      : {
          status: "uygunsuz",
          note: `f = ${sizintiFaktoru.toFixed(3)} > ${izinliFaktor.toFixed(3)} L/(s·m²): Sınıf ${input.hedefSinif} sağlanmıyor (ulaşılan: ${saglananEnIyiSinif}).`,
        },
  };
}

export const kanalSizdirmazlikSinifiKontrolu: CalcModule<
  KanalSizdirmazlikSinifiKontroluInput,
  KanalSizdirmazlikSinifiKontroluOutput
> = {
  id: "kanal-sizdirmazlik-sinifi-kontrolu",
  title: "Kanal Sızdırmazlık Sınıfı Kontrolü",
  discipline: "mekanik",
  standards: ["EN 12237", "EN 1507"],
  inputSchema: kanalSizdirmazlikSinifiKontroluInputSchema,
  compute,
};
