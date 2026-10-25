import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Tek düşey topraklama çubuğunun (kazık elektrot) yayılma direnci, Dwight
// formülü (IEEE Std 142): R = ρ/(2πL)·[ln(8L/d) − 1]; ince uzun elektrot (L ≫ d) içindir.
// ρ: homojen kabul edilen zemin özdirenci (Ωm, Wenner ölçümünden), L: gömülü boy,
// d: çubuk çapı. Hedef dirence ulaşmak için gereken boy, R(L) monoton azaldığı
// için ikiye bölme ile bulunur. Paralel çubuklar karşılıklı etkileştiği için
// toplam direnç R/n'den büyüktür; bu modül yalnız tek çubuk içindir.
const MAKS_BOY_M = 100;

function direnc(rho: number, L: number, d: number): number {
  return (rho / (2 * Math.PI * L)) * (Math.log((8 * L) / d) - 1);
}

export const topraklamaCubuguDirenciInputSchema = z
  .object({
    zeminOzdirenci_ohm_m: z.number().positive(),
    cubukBoyu_L_m: z.number().positive().max(MAKS_BOY_M),
    cubukCapi_d_mm: z.number().positive(),
    hedefDirenc_ohm: z.number().positive(),
  })
  .refine((v) => v.cubukBoyu_L_m / (v.cubukCapi_d_mm / 1000) >= 10, {
    message: "Çubuk boyu çapının en az 10 katı olmalı (formül ince uzun elektrot içindir)",
  });

export type TopraklamaCubuguDirenciInput = z.infer<typeof topraklamaCubuguDirenciInputSchema>;

export interface TopraklamaCubuguDirenciOutput {
  yayilmaDirenci_ohm: number;
}

function compute(input: TopraklamaCubuguDirenciInput): CalcResult<TopraklamaCubuguDirenciOutput> {
  const rho = input.zeminOzdirenci_ohm_m;
  const d = input.cubukCapi_d_mm / 1000;
  const R = direnc(rho, input.cubukBoyu_L_m, d);

  let gerekliBoy: number | string = `> ${MAKS_BOY_M} m (tek çubukla ulaşılamaz)`;
  if (direnc(rho, MAKS_BOY_M, d) <= input.hedefDirenc_ohm) {
    let alt = 10 * d;
    let ust = MAKS_BOY_M;
    for (let i = 0; i < 100; i++) {
      const orta = (alt + ust) / 2;
      if (direnc(rho, orta, d) > input.hedefDirenc_ohm) alt = orta;
      else ust = orta;
    }
    gerekliBoy = ust;
  }
  const gerekliMetin = typeof gerekliBoy === "number" ? `${gerekliBoy.toFixed(2)} m` : gerekliBoy;

  const verdict: CalcResult<TopraklamaCubuguDirenciOutput>["verdict"] =
    R <= input.hedefDirenc_ohm
      ? { status: "uygun", note: `R = ${R.toFixed(2)} Ω ≤ hedef ${input.hedefDirenc_ohm} Ω.` }
      : {
          status: "uygunsuz",
          note: `R = ${R.toFixed(2)} Ω > hedef ${input.hedefDirenc_ohm} Ω. Tek çubukla gereken boy: ${gerekliMetin}. Alternatif: aralıklı paralel çubuklar, şerit/halka topraklayıcı veya zemin iyileştirme.`,
        };

  return {
    value: { yayilmaDirenci_ohm: R },
    intermediates: {
      boy_cap_orani_L_d: input.cubukBoyu_L_m / d,
      logaritmik_terim: Math.log((8 * input.cubukBoyu_L_m) / d) - 1,
      hedef_icin_gerekli_boy_m: gerekliBoy,
    },
    standardsUsed: ["IEEE Std 142 (Dwight formülü)"],
    verdict,
  };
}

export const topraklamaCubuguDirenci: CalcModule<TopraklamaCubuguDirenciInput, TopraklamaCubuguDirenciOutput> = {
  id: "topraklama-cubugu-direnci",
  title: "Topraklama Çubuğu (Kazık) Yayılma Direnci",
  discipline: "elektrik",
  standards: ["IEEE Std 142 (Dwight formülü)"],
  inputSchema: topraklamaCubuguDirenciInputSchema,
  compute,
};
