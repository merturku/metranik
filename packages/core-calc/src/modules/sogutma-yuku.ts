import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit "ön boyutlandırma" modeli: birim soğutma yükü (W/m²) x iklim faktörü.
// Katsayılar YER TUTUCUDUR; resmi bir standart tablosuyla (örn. TS EN ISO 13790
// pratisyen tabloları) doğrulanmadan üretimde güvenilmemelidir. Isıtmanın tersine,
// iklim faktörü sıcak/kurak bölgelerde daha yüksektir.
const IKLIM_FAKTORU = {
  istanbul: 1.0,
  izmir: 1.15,
  ankara: 1.05,
  erzurum: 0.85,
} as const;

type Sehir = keyof typeof IKLIM_FAKTORU;

const BIRIM_YUK_W_M2: Record<"konut" | "ofis", number> = {
  konut: 60,
  ofis: 90,
};

export const sogutmaYukuInputSchema = z.object({
  alan: z.number().positive(),
  sehir: z.enum(Object.keys(IKLIM_FAKTORU) as [Sehir, ...Sehir[]]),
  kullanim: z.enum(["konut", "ofis"]),
});

export type SogutmaYukuInput = z.infer<typeof sogutmaYukuInputSchema>;

export interface SogutmaYukuOutput {
  kW: number;
}

function compute(input: SogutmaYukuInput): CalcResult<SogutmaYukuOutput> {
  const iklimFaktoru = IKLIM_FAKTORU[input.sehir];
  const birimYuk = BIRIM_YUK_W_M2[input.kullanim];
  const toplamYukW = input.alan * birimYuk * iklimFaktoru;
  const kW = toplamYukW / 1000;

  return {
    value: { kW },
    intermediates: {
      birimYuk_W_m2: birimYuk,
      iklimFaktoru,
      toplamYuk_W: toplamYukW,
    },
    standardsUsed: [],
  };
}

export const sogutmaYuku: CalcModule<SogutmaYukuInput, SogutmaYukuOutput> = {
  id: "sogutma-yuku",
  title: "Soğutma Yükü",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaYukuInputSchema,
  compute,
};
