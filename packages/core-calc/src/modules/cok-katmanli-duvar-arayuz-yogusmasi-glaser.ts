import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Glaser: arayüz sıcaklığı θj = Ti − ΔT·ΣR/Rt; pv,j = pv,i − (pv,i − pv,e)·Σsd/Σsd,t; pv/psat ≥ 1 → yoğuşma.
export const cokKatmanliDuvarArayuzYogusmasiGlaserInputSchema = z.object({
  icSicaklik_C: z.number(),
  icNem: z.number().gt(0).lte(1),
  disSicaklik_C: z.number(),
  disNem: z.number().gt(0).lte(1),
  d1_m: z.number().positive(), lambda1: z.number().positive(), mu1: z.number().min(1),
  d2_m: z.number().positive(), lambda2: z.number().positive(), mu2: z.number().min(1),
  d3_m: z.number().positive(), lambda3: z.number().positive(), mu3: z.number().min(1),
});

export type CokKatmanliDuvarArayuzYogusmasiGlaserInput = z.infer<typeof cokKatmanliDuvarArayuzYogusmasiGlaserInputSchema>;

export interface CokKatmanliDuvarArayuzYogusmasiGlaserOutput {
  maksDoymaOrani: number;
}

function compute(input: CokKatmanliDuvarArayuzYogusmasiGlaserInput): CalcResult<CokKatmanliDuvarArayuzYogusmasiGlaserOutput> {
  const psat = (t: number) =>
    t >= 0 ? 610.5 * Math.exp((17.269 * t) / (237.3 + t)) : 610.5 * Math.exp((21.875 * t) / (265.5 + t));
  const Rsi = 0.13;
  const Rse = 0.04;
  const d = [input.d1_m, input.d2_m, input.d3_m];
  const lam = [input.lambda1, input.lambda2, input.lambda3];
  const mu = [input.mu1, input.mu2, input.mu3];
  const R = d.map((x, i) => x / lam[i]!);
  const sd = d.map((x, i) => x * mu[i]!);
  const Rt = Rsi + Rse + R.reduce((a, b) => a + b, 0);
  const SdT = sd.reduce((a, b) => a + b, 0);
  const dT = input.icSicaklik_C - input.disSicaklik_C;
  const pvi = input.icNem * psat(input.icSicaklik_C);
  const pve = input.disNem * psat(input.disSicaklik_C);
  const oranlar: number[] = [];
  const inter: Record<string, number | string> = {};
  let rKum = Rsi;
  let sdKum = 0;
  for (let j = 0; j < 2; j++) {
    rKum += R[j]!;
    sdKum += sd[j]!;
    const th = input.icSicaklik_C - (dT * rKum) / Rt;
    const pv = pvi - ((pvi - pve) * sdKum) / SdT;
    const ps = psat(th);
    oranlar.push(pv / ps);
    inter[`arayuz${j + 1}_sicaklik_C`] = th;
    inter[`arayuz${j + 1}_pv_Pa`] = pv;
    inter[`arayuz${j + 1}_psat_Pa`] = ps;
  }
  const maks = Math.max(...oranlar);
  inter["U_degeri_Wm2K"] = 1 / Rt;
  inter["toplam_sd_m"] = SdT;
  return {
    value: { maksDoymaOrani: maks },
    intermediates: inter,
    standardsUsed: ["TS EN ISO 13788"],
    verdict:
      maks < 0.95
        ? { status: "uygun", note: "Arayüzlerde buhar basıncı doyma basıncının altında; yoğuşma beklenmez." }
        : maks < 1
          ? { status: "sinirda", note: "Arayüzde doyma oranı %95'in üzerinde; yoğuşma sınırında." }
          : { status: "uygunsuz", note: "Arayüzde buhar basıncı doyma basıncını aşıyor; iç yoğuşma riski var." },
  };
}

export const cokKatmanliDuvarArayuzYogusmasiGlaser: CalcModule<CokKatmanliDuvarArayuzYogusmasiGlaserInput, CokKatmanliDuvarArayuzYogusmasiGlaserOutput> = {
  id: "cok-katmanli-duvar-arayuz-yogusmasi-glaser",
  title: "Çok Katmanlı Duvarda Arayüz Yoğuşma Kontrolü (Glaser)",
  discipline: "ev",
  standards: ["TS EN ISO 13788"],
  inputSchema: cokKatmanliDuvarArayuzYogusmasiGlaserInputSchema,
  compute,
};
