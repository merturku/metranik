import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Doğalgaz cihazlarının anlık tüketim debisi ve gaz sayacı seçimi:
// V̇ = f · ΣQgiriş / Hu   (m³/h; Qgiriş: cihazın ısıl yükü, Hu: alt ısıl değer).
// Türkiye'deki dağıtım şirketleri genellikle Hu = 8250 kcal/m³ ≈ 9,59 kWh/m³ kullanır.
// Diyaframlı sayaçların G sınıfı ile azami debisi (TS EN 1359): G1,6 2,5; G2,5 4; G4 6;
// G6 10; G10 16; G16 25; G25 40 m³/h. G40 (65) ve üzeri genellikle rotari/türbin sayaçtır.
const SAYACLAR: [string, number][] = [
  ["G1,6", 2.5],
  ["G2,5", 4],
  ["G4", 6],
  ["G6", 10],
  ["G10", 16],
  ["G16", 25],
  ["G25", 40],
  ["G40", 65],
  ["G65", 100],
  ["G100", 160],
];

export const dogalgazTuketimSayacSecimiInputSchema = z.object({
  kombiKazanYuku_kW: z.number().min(0),
  ocakYuku_kW: z.number().min(0),
  digerCihazYuku_kW: z.number().min(0),
  esZamanlilikKatsayisi: z.number().positive().max(1),
  altIsilDeger_Hu_kWhm3: z.number().positive(),
});

export type DogalgazTuketimSayacSecimiInput = z.infer<typeof dogalgazTuketimSayacSecimiInputSchema>;

export interface DogalgazTuketimSayacSecimiOutput {
  gazDebisi_m3h: number;
}

function compute(input: DogalgazTuketimSayacSecimiInput): CalcResult<DogalgazTuketimSayacSecimiOutput> {
  const toplam = input.kombiKazanYuku_kW + input.ocakYuku_kW + input.digerCihazYuku_kW;
  const esZamanli = toplam * input.esZamanlilikKatsayisi;
  const debi = esZamanli / input.altIsilDeger_Hu_kWhm3;
  const sayac = SAYACLAR.find(([, qmax]) => qmax >= debi);

  return {
    value: { gazDebisi_m3h: debi },
    intermediates: {
      toplam_isil_yuk_kW: toplam,
      es_zamanli_isil_yuk_kW: esZamanli,
      onerilen_sayac: sayac ? sayac[0] : "> G100 (özel sayaç)",
      sayac_azami_debisi_m3h: sayac ? sayac[1] : "—",
      sayac_doluluk_yuzde: sayac ? (debi / sayac[1]) * 100 : "—",
    },
    standardsUsed: ["TS EN 1359"],
  };
}

export const dogalgazTuketimSayacSecimi: CalcModule<
  DogalgazTuketimSayacSecimiInput,
  DogalgazTuketimSayacSecimiOutput
> = {
  id: "dogalgaz-tuketim-sayac-secimi",
  title: "Doğalgaz Tüketim Debisi ve Sayaç Seçimi",
  discipline: "mekanik",
  standards: ["TS EN 1359"],
  inputSchema: dogalgazTuketimSayacSecimiInputSchema,
  compute,
};
