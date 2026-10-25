import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Elektrik borusu (konduit) içindeki kablo doluluk oranı:
// doluluk = n·(π·d²/4) / (π·D²/4) = n·d²/D² (D: boru iç çapı, d: kablo dış çapı).
// İzin verilen oranlar NEC Bölüm 9 Tablo 1: 1 kablo %53, 2 kablo %31, 3 ve daha fazla %40
// (iki kabloda oranın düşük olması, kabloların borunun çapına dizilip sıkışmasındandır).
// En az iç çap D = d·√(n/oran); 3+ kablo için en fazla kablo = ⌊0,40·D²/d²⌋.
const SINIR_YUZDE = (n: number) => (n === 1 ? 53 : n === 2 ? 31 : 40);

export const elektrikBorusuDolulukOraniInputSchema = z.object({
  boruIcCapi_D_mm: z.number().positive(),
  kabloDisCapi_d_mm: z.number().positive(),
  kabloSayisi: z.number().int().min(1),
});

export type ElektrikBorusuDolulukOraniInput = z.infer<typeof elektrikBorusuDolulukOraniInputSchema>;

export interface ElektrikBorusuDolulukOraniOutput {
  dolulukOrani_yuzde: number;
}

function compute(input: ElektrikBorusuDolulukOraniInput): CalcResult<ElektrikBorusuDolulukOraniOutput> {
  const D = input.boruIcCapi_D_mm;
  const d = input.kabloDisCapi_d_mm;
  const n = input.kabloSayisi;
  const doluluk = (n * d * d) / (D * D);
  const sinirYuzde = SINIR_YUZDE(n);
  const sinir = sinirYuzde / 100;
  const minCap = d * Math.sqrt(n / sinir);
  const maksKablo3Arti = Math.floor((0.4 * D * D) / (d * d) + 1e-9);

  const verdict: CalcResult<ElektrikBorusuDolulukOraniOutput>["verdict"] =
    d >= D
      ? { status: "uygunsuz", note: `Kablo dış çapı (${d} mm) boru iç çapından (${D} mm) küçük olmalı.` }
      : doluluk <= sinir
        ? { status: "uygun", note: `Doluluk %${(doluluk * 100).toFixed(1)} ≤ %${sinirYuzde} (${n} kablo).` }
        : {
            status: "uygunsuz",
            note: `Doluluk %${(doluluk * 100).toFixed(1)} > %${sinirYuzde}: kablolar çekilirken zorlanır ve ısınır. En az ${minCap.toFixed(1)} mm iç çaplı boru seçin veya kabloları bölün.`,
          };

  return {
    value: { dolulukOrani_yuzde: doluluk * 100 },
    intermediates: {
      izin_verilen_oran_yuzde: sinirYuzde,
      gereken_en_kucuk_ic_cap_mm: minCap,
      bu_boruya_3_ve_uzeri_azami_kablo: maksKablo3Arti >= 3 ? maksKablo3Arti : "< 3",
    },
    standardsUsed: ["NEC Bölüm 9 Tablo 1"],
    verdict,
  };
}

export const elektrikBorusuDolulukOrani: CalcModule<ElektrikBorusuDolulukOraniInput, ElektrikBorusuDolulukOraniOutput> = {
  id: "elektrik-borusu-doluluk-orani",
  title: "Elektrik Borusu (Konduit) Doluluk Oranı",
  discipline: "elektrik",
  standards: ["NEC Bölüm 9 Tablo 1"],
  inputSchema: elektrikBorusuDolulukOraniInputSchema,
  compute,
};
