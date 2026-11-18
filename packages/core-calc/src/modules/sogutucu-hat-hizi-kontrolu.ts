import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hat hızı: v = ṁ·ν/A. Aralık [vMin, vMaks]; sınırlara %10 yakınlık "sınırda".
export const sogutucuHatHiziKontroluInputSchema = z
  .object({
    m_kgs: z.number().positive(),
    nu_m3kg: z.number().positive(),
    icCap_mm: z.number().positive(),
    vMin_ms: z.number().min(0),
    vMaks_ms: z.number().positive(),
  })
  .refine((v) => v.vMaks_ms > v.vMin_ms, { message: "Azami hız asgari hızdan büyük olmalı" });

export type SogutucuHatHiziKontroluInput = z.infer<typeof sogutucuHatHiziKontroluInputSchema>;

export interface SogutucuHatHiziKontroluOutput {
  hiz_ms: number;
}

function compute(input: SogutucuHatHiziKontroluInput): CalcResult<SogutucuHatHiziKontroluOutput> {
  const A = (Math.PI * Math.pow(input.icCap_mm / 1000, 2)) / 4;
  const Q = input.m_kgs * input.nu_m3kg;
  const v = Q / A;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (v < input.vMin_ms) {
    status = "uygunsuz";
    note = "Hız asgari değerin altında: yağ dönüşü sağlanamayabilir (çap küçültün).";
  } else if (v > input.vMaks_ms) {
    status = "uygunsuz";
    note = "Hız azami değerin üstünde: gürültü ve basınç kaybı yüksek (çap büyütün).";
  } else if (v < input.vMin_ms * 1.1 || v > input.vMaks_ms * 0.9) {
    status = "sinirda";
    note = "Hız aralık sınırına %10'dan yakın.";
  } else {
    status = "uygun";
    note = "Hat hızı önerilen aralık içinde.";
  }
  return {
    value: { hiz_ms: v },
    intermediates: { kesit_alani_mm2: A * 1e6, hacimsel_debi_m3h: Q * 3600 },
    standardsUsed: ["ASHRAE Refrigeration — hat hızı ilkesi"],
    verdict: { status, note },
  };
}

export const sogutucuHatHiziKontrolu: CalcModule<SogutucuHatHiziKontroluInput, SogutucuHatHiziKontroluOutput> = {
  id: "sogutucu-hat-hizi-kontrolu",
  title: "Soğutucu Akışkan Hat Hızı Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutucuHatHiziKontroluInputSchema,
  compute,
};
