import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Suyun doyma sıcaklığı–basıncı (Antoine denklemi): log10(P[mmHg]) = A − B/(C + T[°C]).
// 1–100 °C: A = 8,07131, B = 1730,63, C = 233,426;  99–374 °C: A = 8,14019, B = 1810,94, C = 244,485 (NIST Webbook / Dortmund veri).
// Buhar tablolarından yaklaşık %0,2 (100 °C'ye kadar) – %1 (150 °C) sapma; hassas buhar hesabı için IAPWS-IF97 tabloları kullanılmalıdır.
// Sıcaklıktan basınç veya basınçtan sıcaklık (ters) hesaplanır; basınç mutlak basınçtır (kPa). 1 mmHg = 0,133322 kPa.
const MMHG_KPA = 0.133322;
const BIRINCI = { A: 8.07131, B: 1730.63, C: 233.426 };
const IKINCI = { A: 8.14019, B: 1810.94, C: 244.485 };

export const suDoymaSicakligiBasinciAntoineInputSchema = z.object({
  yon: z.enum(["sicakliktan-basinc", "basinctan-sicaklik"]),
  deger: z.number().positive(),
});

export type SuDoymaSicakligiBasinciAntoineInput = z.infer<typeof suDoymaSicakligiBasinciAntoineInputSchema>;

export interface SuDoymaSicakligiBasinciAntoineOutput {
  sonuc: number | null;
}

function compute(input: SuDoymaSicakligiBasinciAntoineInput): CalcResult<SuDoymaSicakligiBasinciAntoineOutput> {
  const standards = ["Antoine denklemi (su için iki aralıklı katsayılar)"];
  if (input.yon === "sicakliktan-basinc") {
    const t = input.deger;
    if (t < 1 || t > 374) {
      return { value: { sonuc: null }, intermediates: { not: "Geçerlilik: 1–374 °C" }, standardsUsed: standards, verdict: { status: "uygunsuz", note: "Sıcaklık aralık dışında." } };
    }
    const k = t <= 100 ? BIRINCI : IKINCI;
    const pmm = 10 ** (k.A - k.B / (k.C + t));
    const kpa = pmm * MMHG_KPA;
    return {
      value: { sonuc: kpa },
      intermediates: { birim: "kPa (mutlak)", basinc_bar: kpa / 100, basinc_mmHg: pmm, kullanilan_aralik: t <= 100 ? "1–100 °C" : "99–374 °C" },
      standardsUsed: standards,
    };
  }
  const pmm = input.deger / MMHG_KPA;
  const k = pmm <= 760 ? BIRINCI : IKINCI;
  const t = k.B / (k.A - Math.log10(pmm)) - k.C;
  return {
    value: { sonuc: t },
    intermediates: { birim: "°C", kullanilan_aralik: pmm <= 760 ? "1–100 °C" : "99–374 °C", basinc_mmHg: pmm },
    standardsUsed: standards,
  };
}

export const suDoymaSicakligiBasinciAntoine: CalcModule<SuDoymaSicakligiBasinciAntoineInput, SuDoymaSicakligiBasinciAntoineOutput> = {
  id: "su-doyma-sicakligi-basinci-antoine",
  title: "Su Doyma Sıcaklığı – Basıncı (Antoine)",
  discipline: "mekanik",
  standards: [],
  inputSchema: suDoymaSicakligiBasinciAntoineInputSchema,
  compute,
};
