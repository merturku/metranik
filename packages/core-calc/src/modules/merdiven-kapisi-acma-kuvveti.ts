import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınçlandırılmış merdiven kapısını açma kuvveti (NFPA 92 / TS EN 12101-6 yaklaşımı):
// F = F_dc + (W·A·ΔP)/(2·(W − d)),  F_dc kapı kapatıcı kuvveti (N), W kapı genişliği (m), A kapı alanı (m²),
// ΔP kapı iki yanı basınç farkı (Pa), d kolundan kapı kenarına mesafe (m, tutamak). 133 N (30 lbf) tipik üst sınır
// (erişilebilirlik için ≤ 100 N tercih edilir) — şartnameden teyit edin.
export const merdivenKapisiAcmaKuvvetiInputSchema = z
  .object({
    kapiKapaticiKuvveti_N: z.number().min(0),
    kapiGenisligi_m: z.number().positive(),
    kapiYuksekligi_m: z.number().positive(),
    basincFarki_Pa: z.number().min(0),
    tutamakMesafesi_m: z.number().min(0),
    azamiKuvvet_N: z.number().positive(),
  })
  .refine((v) => v.tutamakMesafesi_m < v.kapiGenisligi_m, { message: "Tutamak mesafesi kapı genişliğinden küçük olmalı" });

export type MerdivenKapisiAcmaKuvvetiInput = z.infer<typeof merdivenKapisiAcmaKuvvetiInputSchema>;

export interface MerdivenKapisiAcmaKuvvetiOutput {
  acmaKuvveti_N: number;
}

function compute(input: MerdivenKapisiAcmaKuvvetiInput): CalcResult<MerdivenKapisiAcmaKuvvetiOutput> {
  const W = input.kapiGenisligi_m;
  const A = W * input.kapiYuksekligi_m;
  const fBasinc = (W * A * input.basincFarki_Pa) / (2 * (W - input.tutamakMesafesi_m));
  const f = input.kapiKapaticiKuvveti_N + fBasinc;
  const azamiDP = Math.max(0, (input.azamiKuvvet_N - input.kapiKapaticiKuvveti_N) * 2 * (W - input.tutamakMesafesi_m) / (W * A));
  const uygun = f <= input.azamiKuvvet_N;
  return {
    value: { acmaKuvveti_N: f },
    intermediates: {
      basinc_kuvveti_N: fBasinc,
      kapi_alani_m2: A,
      izin_verilen_azami_basinc_farki_Pa: azamiDP,
      kuvvet_kgf: f / 9.80665,
    },
    standardsUsed: ["NFPA 92", "TS EN 12101-6"],
    verdict: {
      status: uygun ? "uygun" : "uygunsuz",
      note: uygun
        ? `Açma kuvveti ${f.toFixed(0)} N ≤ ${input.azamiKuvvet_N} N.`
        : `Açma kuvveti ${f.toFixed(0)} N > ${input.azamiKuvvet_N} N; basınç farkını ${azamiDP.toFixed(0)} Pa'a indirin (basınç tahliye damperi).`,
    },
  };
}

export const merdivenKapisiAcmaKuvveti: CalcModule<MerdivenKapisiAcmaKuvvetiInput, MerdivenKapisiAcmaKuvvetiOutput> = {
  id: "merdiven-kapisi-acma-kuvveti",
  title: "Basınçlandırılmış Merdiven Kapısı Açma Kuvveti",
  discipline: "mekanik",
  standards: ["NFPA 92", "TS EN 12101-6"],
  inputSchema: merdivenKapisiAcmaKuvvetiInputSchema,
  compute,
};
