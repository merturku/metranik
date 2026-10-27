import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dairesel boruda tam gelişmiş zorlanmış taşınım katsayısı (Incropera, Isı ve Kütle Transferi Bölüm 8):
// Re = V·D/ν;  laminer (Re < 2300): Nu = 3,66 (sabit yüzey sıcaklığı) / 4,36 (sabit ısı akısı)
// Türbülanslı: Gnielinski Nu = (f/8)(Re − 1000)Pr / [1 + 12,7·√(f/8)·(Pr^(2/3) − 1)],
// Petukhov f = (0,790·ln Re − 1,64)⁻² (Re 3000–5·10⁶, Pr 0,5–2000; 2300–3000 geçiş bölgesi).
// Karşılaştırma: Dittus-Boelter Nu = 0,023·Re^0,8·Pr^n, n = 0,4 ısıtma / 0,3 soğutma
// (Re ≥ 10 000, 0,6 ≤ Pr ≤ 160).  h = Nu·k/D.
export const boruIciTasinimKatsayisiInputSchema = z.object({
  hiz_ms: z.number().positive(),
  icCap_mm: z.number().positive(),
  kinematikViskozite_mm2s: z.number().positive(),
  isilIletkenlik_WmK: z.number().positive(),
  prandtl: z.number().positive(),
  isiAkisYonu: z.enum(["isitma", "sogutma"]),
  sinirKosulu: z.enum(["sabitSicaklik", "sabitIsiAkisi"]),
});

export type BoruIciTasinimKatsayisiInput = z.infer<typeof boruIciTasinimKatsayisiInputSchema>;

export interface BoruIciTasinimKatsayisiOutput {
  h_Wm2K: number;
}

function compute(input: BoruIciTasinimKatsayisiInput): CalcResult<BoruIciTasinimKatsayisiOutput> {
  const D = input.icCap_mm / 1000;
  const Pr = input.prandtl;
  const Re = (input.hiz_ms * D) / (input.kinematikViskozite_mm2s * 1e-6);

  let rejim: string;
  let nu: number;
  let f: number | string = "—";
  let nuGnielinski: number | string = "—";
  if (Re < 2300) {
    rejim = "laminer";
    nu = input.sinirKosulu === "sabitSicaklik" ? 3.66 : 4.36;
  } else {
    rejim = Re < 3000 ? "geçiş (belirsizlik yüksek)" : "türbülanslı";
    const fp = (0.79 * Math.log(Re) - 1.64) ** -2;
    const g = (fp / 8) * (Re - 1000) * Pr / (1 + 12.7 * Math.sqrt(fp / 8) * (Pr ** (2 / 3) - 1));
    f = fp;
    nuGnielinski = g;
    nu = g;
  }

  const n = input.isiAkisYonu === "isitma" ? 0.4 : 0.3;
  const nuDittusBoelter =
    Re < 10000
      ? "geçerli değil (Re < 10 000)"
      : Pr < 0.6 || Pr > 160
        ? "geçerli değil (Pr aralık dışı)"
        : 0.023 * Re ** 0.8 * Pr ** n;

  return {
    value: { h_Wm2K: (nu * input.isilIletkenlik_WmK) / D },
    intermediates: {
      reynolds_sayisi: Re,
      akis_rejimi: rejim,
      surtunme_katsayisi_f: f,
      nusselt_gnielinski: nuGnielinski,
      nusselt_kullanilan: nu,
      nusselt_dittus_boelter: nuDittusBoelter,
    },
    standardsUsed: ["Gnielinski (1976)", "Dittus-Boelter"],
  };
}

export const boruIciTasinimKatsayisi: CalcModule<BoruIciTasinimKatsayisiInput, BoruIciTasinimKatsayisiOutput> = {
  id: "boru-ici-tasinim-katsayisi",
  title: "Boru İçi Taşınım Katsayısı (Gnielinski / Dittus-Boelter)",
  discipline: "mekanik",
  standards: ["Gnielinski (1976)", "Dittus-Boelter"],
  inputSchema: boruIciTasinimKatsayisiInputSchema,
  compute,
};
