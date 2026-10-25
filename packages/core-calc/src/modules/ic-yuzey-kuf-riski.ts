import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duvar/pencere iç yüzey sıcaklığı ve küf/yoğuşma riski, TS EN ISO 13788 §5:
// sıcaklık faktörü fRsi = (θsi − θe)/(θi − θe) = 1 − U·Rsi;
// Rsi = 0,25 m²K/W (opak eleman, küf değerlendirmesi), 0,13 m²K/W (camda yoğuşma).
// İç buhar basıncı pi = φi·psat(θi); küf ölçütü: yüzeyde bağıl nem ≤ %80 → psat(θsi,min) = pi/0,8,
// yoğuşma ölçütü: psat(θsi) = pi (çiy noktası). Gerekli fRsi,min = (θsi,min − θe)/(θi − θe).
// psat (Ek E): θ ≥ 0: 610,5·e^(17,269θ/(237,3 + θ));  θ < 0: 610,5·e^(21,875θ/(265,5 + θ)) Pa.
function psat(t: number): number {
  return t >= 0 ? 610.5 * Math.exp((17.269 * t) / (237.3 + t)) : 610.5 * Math.exp((21.875 * t) / (265.5 + t));
}
function psatTersi(p: number): number {
  const x = Math.log(p / 610.5);
  return p >= 610.5 ? (237.3 * x) / (17.269 - x) : (265.5 * x) / (21.875 - x);
}

export const icYuzeyKufRiskiInputSchema = z
  .object({
    isilGecirgenlik_U_Wm2K: z.number().positive().max(10),
    icSicaklik_C: z.number().min(5).max(35),
    icBagilNem_yuzde: z.number().positive().max(100),
    disSicaklik_C: z.number().min(-40).max(30),
    elemanTipi: z.enum(["opak", "cam"]),
  })
  .refine((v) => v.icSicaklik_C > v.disSicaklik_C, { message: "İç sıcaklık dış sıcaklıktan yüksek olmalı" });

export type IcYuzeyKufRiskiInput = z.infer<typeof icYuzeyKufRiskiInputSchema>;

export interface IcYuzeyKufRiskiOutput {
  icYuzeySicakligi_C: number;
}

function compute(input: IcYuzeyKufRiskiInput): CalcResult<IcYuzeyKufRiskiOutput> {
  const ti = input.icSicaklik_C;
  const te = input.disSicaklik_C;
  const opak = input.elemanTipi === "opak";
  const Rsi = opak ? 0.25 : 0.13;
  const fRsi = 1 - input.isilGecirgenlik_U_Wm2K * Rsi;
  const tsi = te + fRsi * (ti - te);
  const pi = (input.icBagilNem_yuzde / 100) * psat(ti);
  const ciyNoktasi = psatTersi(pi);
  const kufSiniri = psatTersi(pi / 0.8);
  const fMinKuf = (kufSiniri - te) / (ti - te);
  const fMinYogusma = (ciyNoktasi - te) / (ti - te);

  const verdict: CalcResult<IcYuzeyKufRiskiOutput>["verdict"] =
    tsi < ciyNoktasi
      ? {
          status: "uygunsuz",
          note: `θsi = ${tsi.toFixed(1)} °C < çiy noktası ${ciyNoktasi.toFixed(1)} °C: yüzeyde yoğuşma (terleme) oluşur. Isı yalıtımını iyileştirin (U'yu düşürün) veya iç nemi azaltın (havalandırma).`,
        }
      : opak && tsi < kufSiniri
        ? {
            status: "sinirda",
            note: `Yoğuşma yok ama θsi = ${tsi.toFixed(1)} °C < küf sınırı ${kufSiniri.toFixed(1)} °C (yüzeyde bağıl nem > %80): küf riski. fRsi = ${fRsi.toFixed(2)} < gerekli ${fMinKuf.toFixed(2)}.`,
          }
        : {
            status: "uygun",
            note: `θsi = ${tsi.toFixed(1)} °C; ${opak ? `küf sınırı ${kufSiniri.toFixed(1)} °C` : `çiy noktası ${ciyNoktasi.toFixed(1)} °C`} üstünde.`,
          };

  return {
    value: { icYuzeySicakligi_C: tsi },
    intermediates: {
      ic_yuzey_direnci_Rsi_m2KW: Rsi,
      sicaklik_faktoru_fRsi: fRsi,
      ic_buhar_basinci_Pa: pi,
      ciy_noktasi_C: ciyNoktasi,
      kuf_siniri_yuzey_sicakligi_C: kufSiniri,
      gerekli_fRsi_kuf: fMinKuf,
      gerekli_fRsi_yogusma: fMinYogusma,
    },
    standardsUsed: ["TS EN ISO 13788"],
    verdict,
  };
}

export const icYuzeyKufRiski: CalcModule<IcYuzeyKufRiskiInput, IcYuzeyKufRiskiOutput> = {
  id: "ic-yuzey-kuf-riski",
  title: "Duvar/Pencere İç Yüzey Sıcaklığı ve Küf Riski",
  discipline: "ev",
  standards: ["TS EN ISO 13788"],
  inputSchema: icYuzeyKufRiskiInputSchema,
  compute,
};
