import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yanıcı (A2L/A3) soğutucu akışkanlı konfor klimasında oda alanına bağlı azami şarj
// (TS EN 378-1 Ek C, IEC 60335-2-40 Ek GG):
// mmax = 2,5·LFL^(5/4)·h0·A^(1/2)  [kg; LFL kg/m³, h0 m, A m²]
// Amin = (m / (2,5·LFL^(5/4)·h0))²
// m1 = 4 m³·LFL altında oda alanı şartı yoktur; m2 = 26 m³·LFL üstü formül kapsamı dışıdır.
// LFL (ISO 817): R32 0,307, R1234yf 0,289, R290 0,038 kg/m³.
// h0 (montaj yüksekliği): zemin 0,6, pencere 1,0, duvar 1,8, tavan 2,2 m.
const LFL: Record<"R32" | "R1234yf" | "R290", number> = { R32: 0.307, R1234yf: 0.289, R290: 0.038 };
const H0: Record<"zemin" | "pencere" | "duvar" | "tavan", number> = { zemin: 0.6, pencere: 1.0, duvar: 1.8, tavan: 2.2 };

export const sogutucuAkiskanAzamiSarjInputSchema = z.object({
  akiskan: z.enum(["R32", "R1234yf", "R290"]),
  sarjMiktari_kg: z.number().positive(),
  odaAlani_m2: z.number().positive(),
  montajTipi: z.enum(["zemin", "pencere", "duvar", "tavan"]),
});

export type SogutucuAkiskanAzamiSarjInput = z.infer<typeof sogutucuAkiskanAzamiSarjInputSchema>;

export interface SogutucuAkiskanAzamiSarjOutput {
  azamiSarj_kg: number;
}

function compute(input: SogutucuAkiskanAzamiSarjInput): CalcResult<SogutucuAkiskanAzamiSarjOutput> {
  const lfl = LFL[input.akiskan];
  const h0 = H0[input.montajTipi];
  const m = input.sarjMiktari_kg;
  const katsayi = 2.5 * lfl ** 1.25 * h0;
  const mmax = katsayi * Math.sqrt(input.odaAlani_m2);
  const amin = (m / katsayi) ** 2;
  const m1 = 4 * lfl;
  const m2 = 26 * lfl;

  let verdict: CalcResult<SogutucuAkiskanAzamiSarjOutput>["verdict"];
  if (m <= m1) {
    verdict = {
      status: "uygun",
      note: `m = ${m.toFixed(2)} kg ≤ m1 = ${m1.toFixed(3)} kg: oda alanına bağlı şarj sınırı uygulanmaz.`,
    };
  } else if (m > m2) {
    verdict = {
      status: "sinirda",
      note: `m = ${m.toFixed(2)} kg > m2 = ${m2.toFixed(2)} kg: oda alanı formülünün kapsamı dışında; mekanik havalandırma, sızıntı algılama gibi ek önlemler için standardın ilgili sürümüne bakın (A2L üst sınırı sürüme göre değişir).`,
    };
  } else if (m <= mmax) {
    verdict = {
      status: "uygun",
      note: `m = ${m.toFixed(2)} kg ≤ mmax = ${mmax.toFixed(2)} kg (asgari oda alanı ${amin.toFixed(1)} m²).`,
    };
  } else {
    verdict = {
      status: "uygunsuz",
      note: `m = ${m.toFixed(2)} kg > mmax = ${mmax.toFixed(2)} kg: oda en az ${amin.toFixed(1)} m² olmalı, daha yükseğe monte edin veya şarjı azaltın.`,
    };
  }

  return {
    value: { azamiSarj_kg: mmax },
    intermediates: {
      alt_yanicilik_siniri_LFL_kgm3: lfl,
      montaj_yuksekligi_h0_m: h0,
      asgari_oda_alani_m2: amin,
      m1_kg: m1,
      m2_kg: m2,
    },
    standardsUsed: ["TS EN 378-1", "IEC 60335-2-40", "ISO 817"],
    verdict,
  };
}

export const sogutucuAkiskanAzamiSarj: CalcModule<SogutucuAkiskanAzamiSarjInput, SogutucuAkiskanAzamiSarjOutput> = {
  id: "sogutucu-akiskan-azami-sarj",
  title: "Yanıcı Soğutucu Akışkan Azami Şarj Miktarı",
  discipline: "mekanik",
  standards: ["TS EN 378-1", "IEC 60335-2-40", "ISO 817"],
  inputSchema: sogutucuAkiskanAzamiSarjInputSchema,
  compute,
};
