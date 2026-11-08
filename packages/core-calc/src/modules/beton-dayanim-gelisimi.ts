import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 1992-1-1 §3.1.2: fcm(t) = βcc(t)·fcm,  βcc(t) = exp{ s·[1 − √(28/t)] },  fcm = fck + 8 MPa.
// s: hızlı sertleşen çimento (CEM 42.5R, 52.5N/R) 0,20; normal (CEM 32.5R, 42.5N) 0,25; yavaş (CEM 32.5N) 0,38.
// 3 < t < 28 gün için fck(t) = fcm(t) − 8; t ≥ 28 gün fck(t) = fck. Hedef fck(t) için gerekli yaş
// t = 28/(1 − ln[(hedef+8)/fcm]/s)². Standart kür (20 °C) kabulü; sıcaklık düzeltmesi için Beton Olgunluk modülü.
const S = { hizli: 0.2, normal: 0.25, yavas: 0.38 } as const;

export const betonDayanimGelisimiInputSchema = z.object({
  fck_MPa: z.number().positive(),
  yas_gun: z.number().min(3).max(1000),
  cimento: z.enum(["hizli", "normal", "yavas"]),
  hedefDayanim_MPa: z.number().positive(),
});

export type BetonDayanimGelisimiInput = z.infer<typeof betonDayanimGelisimiInputSchema>;

export interface BetonDayanimGelisimiOutput {
  fckT_MPa: number;
}

function compute(input: BetonDayanimGelisimiInput): CalcResult<BetonDayanimGelisimiOutput> {
  const s = S[input.cimento];
  const fcm = input.fck_MPa + 8;
  const beta = Math.exp(s * (1 - Math.sqrt(28 / input.yas_gun)));
  const fcmT = beta * fcm;
  const fckT = input.yas_gun >= 28 ? input.fck_MPa : fcmT - 8;
  const h = input.hedefDayanim_MPa;
  const gerekliGun = h < input.fck_MPa ? 28 / (1 - Math.log((h + 8) / fcm) / s) ** 2 : null;
  return {
    value: { fckT_MPa: fckT },
    intermediates: {
      s_katsayisi: s,
      beta_cc: beta,
      fcm_MPa: fcm,
      fcm_t_MPa: fcmT,
      hedefe_ulasma_gunu: gerekliGun ?? "hedef ≥ fck (28 gün)",
    },
    standardsUsed: ["EN 1992-1-1 §3.1.2 (Eş. 3.1–3.2)"],
  };
}

export const betonDayanimGelisimi: CalcModule<BetonDayanimGelisimiInput, BetonDayanimGelisimiOutput> = {
  id: "beton-dayanim-gelisimi",
  title: "Beton Dayanım Gelişimi (Yaşa Göre)",
  discipline: "insaat",
  standards: ["EN 1992-1-1"],
  inputSchema: betonDayanimGelisimiInputSchema,
  compute,
};
