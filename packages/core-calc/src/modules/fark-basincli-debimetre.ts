import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fark basınçlı debi ölçer (orifis / nozul / venturi), sıkıştırılamaz akış (ISO 5167-1 temel denklem):
// qm = C/√(1−β⁴) · (π/4)·d² · √(2·Δp·ρ),  β = d/D.  C boşaltım katsayısı cihaz tipine ve Re'ye bağlıdır
// (ISO 5167-2 Reader-Harris/Gallagher; keskin kenarlı orifis için yaklaşık 0,60–0,62) — girdi olarak alınır.
export const farkBasincliDebimetreInputSchema = z
  .object({
    boruIcCapi_mm: z.number().positive(),
    daralmaCapi_mm: z.number().positive(),
    farkBasinc_Pa: z.number().positive(),
    yogunluk_kgm3: z.number().positive(),
    boşaltimKatsayisi: z.number().gt(0).max(1.1),
  })
  .refine((v) => v.daralmaCapi_mm / v.boruIcCapi_mm >= 0.1 && v.daralmaCapi_mm / v.boruIcCapi_mm <= 0.75, {
    message: "β = d/D 0,10–0,75 aralığında olmalı",
  });

export type FarkBasincliDebimetreInput = z.infer<typeof farkBasincliDebimetreInputSchema>;

export interface FarkBasincliDebimetreOutput {
  debi_m3h: number;
}

function compute(input: FarkBasincliDebimetreInput): CalcResult<FarkBasincliDebimetreOutput> {
  const beta = input.daralmaCapi_mm / input.boruIcCapi_mm;
  const d = input.daralmaCapi_mm / 1000;
  const e = 1 / Math.sqrt(1 - beta ** 4);
  const a = (Math.PI / 4) * d * d;
  const qm = input.boşaltimKatsayisi * e * a * Math.sqrt(2 * input.farkBasinc_Pa * input.yogunluk_kgm3);
  const qv = qm / input.yogunluk_kgm3;
  return {
    value: { debi_m3h: qv * 3600 },
    intermediates: {
      beta,
      yaklasma_hizi_faktoru_E: e,
      kutlesel_debi_kgs: qm,
      hacimsel_debi_ls: qv * 1000,
      daralma_hizi_ms: qv / a,
    },
    standardsUsed: ["ISO 5167-1"],
  };
}

export const farkBasincliDebimetre: CalcModule<FarkBasincliDebimetreInput, FarkBasincliDebimetreOutput> = {
  id: "fark-basincli-debimetre",
  title: "Fark Basınçlı Debi Ölçer (Orifis / Venturi)",
  discipline: "mekanik",
  standards: ["ISO 5167-1"],
  inputSchema: farkBasincliDebimetreInputSchema,
  compute,
};
