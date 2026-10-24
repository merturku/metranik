import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fanger PMV/PPD, ISO 7730:2005 Ek D'deki algoritma. Giysi yüzey sıcaklığı
// iteratif çözülür. Sınırlar ISO 7730 §4.2'deki geçerlilik aralığıdır.
export const evSicaklikKonforSchema = z.object({
  hava_sicakligi_C: z.number().min(10).max(30),
  ortalama_isinim_sicakligi_C: z.number().min(10).max(40),
  hava_hizi_ms: z.number().min(0).max(1),
  bagil_nem_yuzde: z.number().min(0).max(100),
  metabolizma_met: z.number().min(0.8).max(4),
  giysi_clo: z.number().min(0).max(2),
});

export type EvSicaklikKonforInput = z.infer<typeof evSicaklikKonforSchema>;

export interface EvSicaklikKonforOutput {
  pmv: number;
  ppd_yuzde: number;
}

const MET_W_M2 = 58.15;
const CLO_M2K_W = 0.155;

function compute(input: EvSicaklikKonforInput): CalcResult<EvSicaklikKonforOutput> {
  const ta = input.hava_sicakligi_C;
  const tr = input.ortalama_isinim_sicakligi_C;
  const pa = input.bagil_nem_yuzde * 10 * Math.exp(16.6536 - 4030.183 / (ta + 235));
  const icl = CLO_M2K_W * input.giysi_clo;
  const m = input.metabolizma_met * MET_W_M2;
  const fcl = icl <= 0.078 ? 1 + 1.29 * icl : 1.05 + 0.645 * icl;
  const hcf = 12.1 * Math.sqrt(input.hava_hizi_ms);
  const taa = ta + 273;
  const tra = tr + 273;

  const p1 = icl * fcl;
  const p2 = p1 * 3.96;
  const p3 = p1 * 100;
  const p4 = p1 * taa;
  const p5 = 308.7 - 0.028 * m + p2 * (tra / 100) ** 4;
  let xn = (taa + (35.5 - ta) / (3.5 * icl + 0.1)) / 100;
  let xf = xn * 2;
  let hc = hcf;
  for (let i = 0; i < 150 && Math.abs(xn - xf) > 0.00015; i++) {
    xf = (xf + xn) / 2;
    hc = Math.max(hcf, 2.38 * Math.abs(100 * xf - taa) ** 0.25);
    xn = (p5 + p4 * hc - p2 * xf ** 4) / (100 + p3 * hc);
  }
  const tcl = 100 * xn - 273;

  const deriDifuzyon = 3.05e-3 * (5733 - 6.99 * m - pa);
  const terleme = m > MET_W_M2 ? 0.42 * (m - MET_W_M2) : 0;
  const solunumGizli = 1.7e-5 * m * (5867 - pa);
  const solunumDuyulur = 0.0014 * m * (34 - ta);
  const isinim = 3.96 * fcl * (xn ** 4 - (tra / 100) ** 4);
  const tasinim = fcl * hc * (tcl - ta);
  const pmv =
    (0.303 * Math.exp(-0.036 * m) + 0.028) *
    (m - deriDifuzyon - terleme - solunumGizli - solunumDuyulur - isinim - tasinim);
  const ppd = 100 - 95 * Math.exp(-0.03353 * pmv ** 4 - 0.2179 * pmv ** 2);

  const mutlakPmv = Math.abs(pmv);
  const verdict: CalcResult<EvSicaklikKonforOutput>["verdict"] =
    mutlakPmv <= 0.5
      ? {
          status: "uygun",
          note: `PMV ${pmv.toFixed(2)}, PPD %${ppd.toFixed(1)}: ISO 7730 Kategori ${mutlakPmv <= 0.2 ? "A" : "B"} konfor aralığında.`,
        }
      : mutlakPmv <= 0.7
        ? {
            status: "sinirda",
            note: `PMV ${pmv.toFixed(2)}, PPD %${ppd.toFixed(1)}: yalnız ISO 7730 Kategori C'yi sağlıyor.`,
          }
        : {
            status: "uygunsuz",
            note: `PMV ${pmv.toFixed(2)}, PPD %${ppd.toFixed(1)}: ISO 7730 konfor kategorilerinin dışında (${pmv > 0 ? "sıcak" : "soğuk"}).`,
          };

  return {
    value: { pmv, ppd_yuzde: ppd },
    intermediates: {
      giysi_yuzey_sicakligi_C: tcl,
      buhar_basinci_Pa: pa,
      tasinim_katsayisi_Wm2K: hc,
    },
    standardsUsed: ["ISO 7730:2005"],
    verdict,
  };
}

export const evSicaklikKonforKontrolu: CalcModule<EvSicaklikKonforInput, EvSicaklikKonforOutput> = {
  id: "ev-sicaklik-konfor-kontrolu",
  title: "Ev Sıcaklık Konfor Kontrolü (PMV/PPD)",
  discipline: "ev",
  standards: ["ISO 7730:2005"],
  inputSchema: evSicaklikKonforSchema,
  compute,
};
