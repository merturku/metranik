import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hava akımı rahatsızlığı (draught rate) — TS EN ISO 7730 §6.2:
// DR = (34 − ta,l)·(va,l − 0,05)^0,62·(0,37·va,l·Tu + 3,14)  [%]
// va,l < 0,05 m/s ise 0,05 alınır; DR > %100 ise %100 alınır.
// Geçerlilik: ta,l 20–26 °C, va,l < 0,5 m/s, Tu %10–60 (Tu bilinmiyorsa %40).
// Kategori sınırları Tablo A.1: A DR < %10, B DR < %20, C DR < %30.
const KATEGORI_SINIRI: Record<"A" | "B" | "C", number> = { A: 10, B: 20, C: 30 };

export const havaAkimiRahatsizligiDrInputSchema = z.object({
  havaSicakligi_C: z.number().min(10).max(33),
  havaHizi_ms: z.number().min(0).max(2),
  turbulansYogunlugu_yuzde: z.number().min(0).max(100),
  hedefKategori: z.enum(["A", "B", "C"]),
});

export type HavaAkimiRahatsizligiDrInput = z.infer<typeof havaAkimiRahatsizligiDrInputSchema>;

export interface HavaAkimiRahatsizligiDrOutput {
  dr_yuzde: number;
}

function draughtRate(ta: number, v: number, tu: number): number {
  const vv = Math.max(v, 0.05);
  return Math.min(100, (34 - ta) * (vv - 0.05) ** 0.62 * (0.37 * vv * tu + 3.14));
}

function compute(input: HavaAkimiRahatsizligiDrInput): CalcResult<HavaAkimiRahatsizligiDrOutput> {
  const ta = input.havaSicakligi_C;
  const tu = input.turbulansYogunlugu_yuzde;
  const vKullanilan = Math.max(input.havaHizi_ms, 0.05);
  const dr = draughtRate(ta, input.havaHizi_ms, tu);
  const ulasilan = dr < KATEGORI_SINIRI.A ? "A" : dr < KATEGORI_SINIRI.B ? "B" : dr < KATEGORI_SINIRI.C ? "C" : "kategori dışı";
  const sinir = KATEGORI_SINIRI[input.hedefKategori];

  // DR hızla monoton artar: hedef sınırı veren hız ikiye bölmeyle bulunur.
  let alt = 0.05;
  let ust = 2;
  for (let i = 0; i < 100; i++) {
    const orta = (alt + ust) / 2;
    if (draughtRate(ta, orta, tu) < sinir) alt = orta;
    else ust = orta;
  }
  const azamiHiz = alt;

  const gecerlilikDisi = ta < 20 || ta > 26 || input.havaHizi_ms >= 0.5 || tu < 10 || tu > 60;
  const gecerlilikNotu = gecerlilikDisi
    ? " Not: girdiler ISO 7730 geçerlilik aralığının (20–26 °C, < 0,5 m/s, Tu %10–60) dışında; sonuç yaklaşıktır."
    : "";

  const verdict: CalcResult<HavaAkimiRahatsizligiDrOutput>["verdict"] =
    dr < sinir
      ? {
          status: "uygun",
          note: `DR = %${dr.toFixed(1)} < %${sinir} (kategori ${input.hedefKategori}); ulaşılan kategori ${ulasilan}.${gecerlilikNotu}`,
        }
      : {
          status: "uygunsuz",
          note: `DR = %${dr.toFixed(1)} ≥ %${sinir} (kategori ${input.hedefKategori}): yerel hava hızını ${azamiHiz.toFixed(2)} m/s altına indirin (difüzör tipi/yerleşimi, atış mesafesi) veya hava sıcaklığını yükseltin.${gecerlilikNotu}`,
        };

  return {
    value: { dr_yuzde: dr },
    intermediates: {
      hesapta_kullanilan_hiz_ms: vKullanilan,
      sicaklik_terimi_34_eksi_ta: 34 - ta,
      ulasilan_kategori: ulasilan,
      hedef_kategori_siniri_yuzde: sinir,
      hedef_icin_azami_hiz_ms: azamiHiz,
    },
    standardsUsed: ["TS EN ISO 7730"],
    verdict,
  };
}

export const havaAkimiRahatsizligiDr: CalcModule<HavaAkimiRahatsizligiDrInput, HavaAkimiRahatsizligiDrOutput> = {
  id: "hava-akimi-rahatsizligi-dr",
  title: "Hava Akımı Rahatsızlığı (Draught Rate, DR)",
  discipline: "mekanik",
  standards: ["TS EN ISO 7730"],
  inputSchema: havaAkimiRahatsizligiDrInputSchema,
  compute,
};
