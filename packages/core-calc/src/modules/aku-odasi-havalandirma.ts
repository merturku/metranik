import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sabit (stasyoner) akü odasında hidrojen seyreltme havalandırması (EN IEC 62485-2, eski EN 50272-2):
// Q = v·q·s·n·Igas·Crt·10⁻³ = 0,05·n·Igas·Crt·10⁻³  [m³/h]
// v = (100 − 4)/4 = 24 seyreltme, q = 0,42·10⁻³ m³/Ah hidrojen, s = 5 genel güvenlik katsayısı.
// Igas = I(tampon/hızlı)·fg·fs [mA/Ah]; fs = 5. Tipik değerler: açık kurşun-asit (Sb < %3)
// Itampon 1, Ihızlı 4, fg 1; VRLA Itampon 1, Ihızlı 8, fg 0,2.
// Doğal havalandırmada giriş ve çıkış açıklığı her biri A = 28·Q [cm²] (hava hızı 0,1 m/s).
const SARJ_AKIMI: Record<"acik" | "vrla", Record<"tampon" | "hizli", number>> = {
  acik: { tampon: 1, hizli: 4 },
  vrla: { tampon: 1, hizli: 8 },
};
const GAZ_YAYILIM_FAKTORU: Record<"acik" | "vrla", number> = { acik: 1, vrla: 0.2 };
const GUVENLIK_FAKTORU_FS = 5;

export const akuOdasiHavalandirmaInputSchema = z.object({
  hucreSayisi: z.number().int().positive(),
  kapasite_Crt_Ah: z.number().positive(),
  akuTipi: z.enum(["acik", "vrla"]),
  sarjModu: z.enum(["tampon", "hizli"]),
});

export type AkuOdasiHavalandirmaInput = z.infer<typeof akuOdasiHavalandirmaInputSchema>;

export interface AkuOdasiHavalandirmaOutput {
  havaDebisi_m3h: number;
}

function compute(input: AkuOdasiHavalandirmaInput): CalcResult<AkuOdasiHavalandirmaOutput> {
  const sarjAkimi = SARJ_AKIMI[input.akuTipi][input.sarjModu];
  const fg = GAZ_YAYILIM_FAKTORU[input.akuTipi];
  const igas = sarjAkimi * fg * GUVENLIK_FAKTORU_FS;
  const q = 0.05 * input.hucreSayisi * igas * input.kapasite_Crt_Ah * 1e-3;

  return {
    value: { havaDebisi_m3h: q },
    intermediates: {
      sarj_akimi_mA_Ah: sarjAkimi,
      gaz_yayilim_faktoru_fg: fg,
      gazlasma_akimi_Igas_mA_Ah: igas,
      dogal_havalandirma_acikligi_cm2: 28 * q,
    },
    standardsUsed: ["EN IEC 62485-2"],
  };
}

export const akuOdasiHavalandirma: CalcModule<AkuOdasiHavalandirmaInput, AkuOdasiHavalandirmaOutput> = {
  id: "aku-odasi-havalandirma",
  title: "Akü Odası Havalandırma Debisi (Hidrojen)",
  discipline: "elektrik",
  standards: ["EN IEC 62485-2"],
  inputSchema: akuOdasiHavalandirmaInputSchema,
  compute,
};
