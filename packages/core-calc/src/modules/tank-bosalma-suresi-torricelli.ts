import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikey düzgün kesitli açık tankın alt delikten boşalma süresi (Torricelli, kararsız akış):
// çıkış debisi Q = Cd·a·√(2g·h);  dh/dt = −Q/A  →  t = (A/(Cd·a))·√(2/g)·(√H − √h2).
// Tamamen boşalma için h2 = 0. a = πd²/4 çıkış delik/boru kesiti, Cd ≈ 0,60–0,62 (keskin kenarlı delik), 0,8–0,98 (yuvarlatılmış/boru).
// Boru sürtünmesi ve vana kayıpları Cd içinde toplanmalıdır; basınçlı/kapalı tankta ek basınç yükü eklenmez.
const G = 9.81;

export const tankBosalmaSuresiTorricelliInputSchema = z.object({
  tankKesitAlani_m2: z.number().positive(),
  baslangicYuksekligi_m: z.number().positive(),
  sonYukseklik_m: z.number().min(0),
  cikisCapi_mm: z.number().positive(),
  debiKatsayisi_Cd: z.number().gt(0).max(1),
});

export type TankBosalmaSuresiTorricelliInput = z.infer<typeof tankBosalmaSuresiTorricelliInputSchema>;

export interface TankBosalmaSuresiTorricelliOutput {
  bosalmaSuresi_s: number | null;
}

function compute(input: TankBosalmaSuresiTorricelliInput): CalcResult<TankBosalmaSuresiTorricelliOutput> {
  const standards = ["Torricelli teoremi / Bernoulli denklemi"];
  if (input.sonYukseklik_m >= input.baslangicYuksekligi_m) {
    return {
      value: { bosalmaSuresi_s: null },
      intermediates: { not: "Son seviye başlangıç seviyesinden düşük olmalı" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Son yükseklik başlangıç yüksekliğinden küçük olmalıdır." },
    };
  }
  const a = (Math.PI * (input.cikisCapi_mm / 1000) ** 2) / 4;
  const k = (input.tankKesitAlani_m2 / (input.debiKatsayisi_Cd * a)) * Math.sqrt(2 / G);
  const t = k * (Math.sqrt(input.baslangicYuksekligi_m) - Math.sqrt(input.sonYukseklik_m));
  const q0 = input.debiKatsayisi_Cd * a * Math.sqrt(2 * G * input.baslangicYuksekligi_m);
  const hacim = input.tankKesitAlani_m2 * (input.baslangicYuksekligi_m - input.sonYukseklik_m);
  return {
    value: { bosalmaSuresi_s: t },
    intermediates: {
      cikis_kesit_alani_m2: a,
      baslangic_debisi_m3s: q0,
      baslangic_debisi_Ls: q0 * 1000,
      bosalan_hacim_m3: hacim,
      sure_dakika: t / 60,
      ortalama_debi_m3s: hacim / t,
    },
    standardsUsed: standards,
  };
}

export const tankBosalmaSuresiTorricelli: CalcModule<TankBosalmaSuresiTorricelliInput, TankBosalmaSuresiTorricelliOutput> = {
  id: "tank-bosalma-suresi-torricelli",
  title: "Tank Boşalma Süresi (Torricelli)",
  discipline: "mekanik",
  standards: [],
  inputSchema: tankBosalmaSuresiTorricelliInputSchema,
  compute,
};
