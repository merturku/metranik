import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Glob termometre ölçümünden ortalama ışınım sıcaklığı (TS EN ISO 7726 Ek B):
// glob üzerinde ışınım ve taşınım dengesi; taşınım katsayısı doğal (1,4·(Δt/D)^0,25)
// ve zorlanmış (6,3·va^0,6/D^0,4) değerlerinin büyüğü:
//   zorlanmış: t̄r = [(tg + 273)⁴ + 1,1·10⁸·va^0,6/(ε·D^0,4)·(tg − ta)]^(1/4) − 273
//   doğal:     t̄r = [(tg + 273)⁴ + 0,25·10⁸/ε·(|tg − ta|/D)^(1/4)·(tg − ta)]^(1/4) − 273
// (1,1·10⁸ ve 0,25·10⁸ = taşınım katsayıları / Stefan-Boltzmann sabiti). Standart glob D = 0,15 m, ε = 0,95.
// Operatif sıcaklık: to = A·ta + (1 − A)·t̄r; A = 0,5 (va < 0,2), 0,6 (0,2–0,6), 0,7 (0,6–1,0 m/s).
export const globTermometreOperatifSicaklikInputSchema = z.object({
  globSicakligi_C: z.number().min(-20).max(100),
  havaSicakligi_C: z.number().min(-20).max(60),
  havaHizi_ms: z.number().min(0).max(1),
  globCapi_m: z.number().positive().max(0.3),
  globYayiciligi: z.number().positive().max(1),
});

export type GlobTermometreOperatifSicaklikInput = z.infer<typeof globTermometreOperatifSicaklikInputSchema>;

export interface GlobTermometreOperatifSicaklikOutput {
  operatifSicaklik_C: number;
}

function compute(input: GlobTermometreOperatifSicaklikInput): CalcResult<GlobTermometreOperatifSicaklikOutput> {
  const tg = input.globSicakligi_C;
  const ta = input.havaSicakligi_C;
  const va = input.havaHizi_ms;
  const D = input.globCapi_m;
  const eps = input.globYayiciligi;
  const dt = tg - ta;

  const hcZorlanmis = (6.3 * va ** 0.6) / D ** 0.4;
  const hcDogal = 1.4 * (Math.abs(dt) / D) ** 0.25;
  const zorlanmis = hcZorlanmis >= hcDogal;
  const katsayi = zorlanmis ? (1.1e8 * va ** 0.6) / (eps * D ** 0.4) : (0.25e8 / eps) * (Math.abs(dt) / D) ** 0.25;
  const tr = ((tg + 273.15) ** 4 + katsayi * dt) ** 0.25 - 273.15;
  const A = va < 0.2 ? 0.5 : va < 0.6 ? 0.6 : 0.7;
  const to = A * ta + (1 - A) * tr;

  return {
    value: { operatifSicaklik_C: to },
    intermediates: {
      ortalama_isinim_sicakligi_C: tr,
      tasinim_turu: zorlanmis ? "Zorlanmış taşınım" : "Doğal taşınım",
      tasinim_katsayisi_hcg_Wm2K: Math.max(hcZorlanmis, hcDogal),
      agirlik_katsayisi_A: A,
      isinim_hava_farki_K: tr - ta,
    },
    standardsUsed: ["TS EN ISO 7726", "TS EN ISO 7730"],
  };
}

export const globTermometreOperatifSicaklik: CalcModule<
  GlobTermometreOperatifSicaklikInput,
  GlobTermometreOperatifSicaklikOutput
> = {
  id: "glob-termometre-operatif-sicaklik",
  title: "Ortalama Işınım ve Operatif Sıcaklık (Glob Termometre)",
  discipline: "mekanik",
  standards: ["TS EN ISO 7726", "TS EN ISO 7730"],
  inputSchema: globTermometreOperatifSicaklikInputSchema,
  compute,
};
