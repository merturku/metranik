import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Şebeke basıncıyla en üst musluktaki akış basıncı (hidrostatik + kayıp dengesi):
// Püst = Pşebeke − ρ·g·Δh − ΔPkayıp,  ρ·g = 1000 × 9,81 Pa/m = 0,0981 bar/m
// Hidroforsuz azami yükseklik = (Pşebeke − ΔPkayıp − Pmin)/0,0981;  gereken artış = max(0, Pmin − Püst).
// En alt katta statik basınç ≈ Pşebeke; azami statik sınır aşılırsa basınç düşürücü önerilir.
const BAR_PER_M = (1000 * 9.81) / 1e5;

export const ustKatSuBasinciKontroluInputSchema = z.object({
  sebekeBasinci_bar: z.number().positive(),
  yukseklikFarki_m: z.number().min(0),
  boruKayiplari_bar: z.number().min(0),
  asgariMuslukBasinci_bar: z.number().positive(),
  azamiStatikBasinc_bar: z.number().positive(),
});

export type UstKatSuBasinciKontroluInput = z.infer<typeof ustKatSuBasinciKontroluInputSchema>;

export interface UstKatSuBasinciKontroluOutput {
  ustKatBasinci_bar: number;
}

function compute(input: UstKatSuBasinciKontroluInput): CalcResult<UstKatSuBasinciKontroluOutput> {
  const statikKayip = BAR_PER_M * input.yukseklikFarki_m;
  const pUst = input.sebekeBasinci_bar - statikKayip - input.boruKayiplari_bar;
  const gerekenArtis = Math.max(0, input.asgariMuslukBasinci_bar - pUst);
  const azamiYukseklik = Math.max(
    0,
    (input.sebekeBasinci_bar - input.boruKayiplari_bar - input.asgariMuslukBasinci_bar) / BAR_PER_M,
  );
  const altKatYuksek = input.sebekeBasinci_bar > input.azamiStatikBasinc_bar;

  let verdict: CalcResult<UstKatSuBasinciKontroluOutput>["verdict"];
  if (gerekenArtis > 0) {
    verdict = {
      status: "uygunsuz",
      note: `Üst katta ${pUst.toFixed(2)} bar < ${input.asgariMuslukBasinci_bar} bar: hidrofor gerekli, en az ${gerekenArtis.toFixed(2)} bar (${(gerekenArtis / BAR_PER_M).toFixed(1)} mSS) basınç artışı + hidrofor kendi kayıpları.`,
    };
  } else if (altKatYuksek) {
    verdict = {
      status: "sinirda",
      note: `Üst kat basıncı yeterli (${pUst.toFixed(2)} bar) ama alt katta statik basınç ${input.sebekeBasinci_bar} bar > ${input.azamiStatikBasinc_bar} bar: girişe basınç düşürücü takın.`,
    };
  } else {
    verdict = {
      status: "uygun",
      note: `Üst katta ${pUst.toFixed(2)} bar ≥ ${input.asgariMuslukBasinci_bar} bar; hidrofor gerekmez (hidroforsuz azami yükseklik ${azamiYukseklik.toFixed(1)} m).`,
    };
  }

  return {
    value: { ustKatBasinci_bar: pUst },
    intermediates: {
      statik_yukseklik_kaybi_bar: statikKayip,
      ust_kat_statik_basinci_bar: input.sebekeBasinci_bar - statikKayip,
      hidroforsuz_azami_yukseklik_m: azamiYukseklik,
      gereken_basinc_artisi_bar: gerekenArtis,
      gereken_basinc_artisi_mSS: gerekenArtis / BAR_PER_M,
    },
    standardsUsed: [],
    verdict,
  };
}

export const ustKatSuBasinciKontrolu: CalcModule<UstKatSuBasinciKontroluInput, UstKatSuBasinciKontroluOutput> = {
  id: "ust-kat-su-basinci-kontrolu",
  title: "Üst Kat Su Basıncı ve Hidrofor İhtiyacı",
  discipline: "ev",
  standards: [],
  inputSchema: ustKatSuBasinciKontroluInputSchema,
  compute,
};
