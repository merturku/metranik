import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS EN 1264-2 temel karakteristik eğri: döşeme yüzeyinden odaya ısı akısı
// q = 8,92·(θF,m − θi)^1,1 (W/m²), yani θF,m = θi + (q/8,92)^(1/1,1).
// Bu ilişki yüzey-oda ısı geçişidir; döşeme kaplamasından bağımsızdır (kaplama
// yalnız gereken su sıcaklığını etkiler). Fizyolojik yüzey sıcaklığı sınırları:
// oturma bölgesi 29 °C, kenar (çevre) bölgesi 35 °C, banyo θi + 9 K.
// Sınır ısı akısı qG = 8,92·(θF,maks − θi)^1,1 (θi = 20 °C'de oturma bölgesi ≈ 100 W/m²).
export const yerdenIsitmaYuzeySicakligiInputSchema = z.object({
  isiKaybi_W: z.number().positive(),
  aktifDosemeAlani_m2: z.number().positive(),
  odaSicakligi_C: z.number().min(5).max(30),
  bolge: z.enum(["oturma", "kenar", "banyo"]),
});

export type YerdenIsitmaYuzeySicakligiInput = z.infer<typeof yerdenIsitmaYuzeySicakligiInputSchema>;

export interface YerdenIsitmaYuzeySicakligiOutput {
  ortalamaYuzeySicakligi_C: number;
}

function compute(input: YerdenIsitmaYuzeySicakligiInput): CalcResult<YerdenIsitmaYuzeySicakligiOutput> {
  const ti = input.odaSicakligi_C;
  const q = input.isiKaybi_W / input.aktifDosemeAlani_m2;
  const yuzey = ti + (q / 8.92) ** (1 / 1.1);
  const sinirYuzey = input.bolge === "oturma" ? 29 : input.bolge === "kenar" ? 35 : ti + 9;
  const sinirAkisi = 8.92 * Math.max(0, sinirYuzey - ti) ** 1.1;

  const verdict: CalcResult<YerdenIsitmaYuzeySicakligiOutput>["verdict"] =
    yuzey <= sinirYuzey
      ? {
          status: "uygun",
          note: `θF,m = ${yuzey.toFixed(1)} °C ≤ ${sinirYuzey} °C; q = ${q.toFixed(0)} W/m² ≤ qG = ${sinirAkisi.toFixed(0)} W/m².`,
        }
      : {
          status: "uygunsuz",
          note: `θF,m = ${yuzey.toFixed(1)} °C > ${sinirYuzey} °C: q = ${q.toFixed(0)} W/m² sınır ısı akısı ${sinirAkisi.toFixed(0)} W/m²'yi aşıyor. Isı kaybını azaltın (yalıtım), aktif alanı artırın veya ek ısıtıcı kullanın.`,
        };

  return {
    value: { ortalamaYuzeySicakligi_C: yuzey },
    intermediates: {
      isi_akisi_q_Wm2: q,
      yuzey_oda_sicaklik_farki_K: yuzey - ti,
      sinir_yuzey_sicakligi_C: sinirYuzey,
      sinir_isi_akisi_qG_Wm2: sinirAkisi,
    },
    standardsUsed: ["TS EN 1264-2"],
    verdict,
  };
}

export const yerdenIsitmaYuzeySicakligi: CalcModule<
  YerdenIsitmaYuzeySicakligiInput,
  YerdenIsitmaYuzeySicakligiOutput
> = {
  id: "yerden-isitma-yuzey-sicakligi",
  title: "Yerden Isıtma Yüzey Sıcaklığı Kontrolü",
  discipline: "mekanik",
  standards: ["TS EN 1264-2"],
  inputSchema: yerdenIsitmaYuzeySicakligiInputSchema,
  compute,
};
