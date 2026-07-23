import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 825 dört derece-gün bölgesi tanımlar (1: en ılıman .. 4: en soğuk).
// Şehir -> bölge eşlemesi ve birim yük (W/m²) katsayıları burada YER TUTUCUDUR;
// resmi TS 825 Ek-A/Ek-B tablolarıyla doğrulanmadan üretimde güvenilmemelidir.
const IKLIM_BOLGESI = {
  istanbul: 2,
  izmir: 1,
  ankara: 3,
  erzurum: 4,
} as const;

type Sehir = keyof typeof IKLIM_BOLGESI;

const BIRIM_YUK_W_M2: Record<1 | 2 | 3 | 4, number> = {
  1: 55,
  2: 65,
  3: 80,
  4: 100,
};

const CAM_FAKTORU: Record<"tek" | "cift", number> = {
  cift: 1.0,
  tek: 1.25,
};

export const isitmaYukuInputSchema = z.object({
  alan: z.number().positive(),
  sehir: z.enum(Object.keys(IKLIM_BOLGESI) as [Sehir, ...Sehir[]]),
  cam: z.enum(["tek", "cift"]),
});

export type IsitmaYukuInput = z.infer<typeof isitmaYukuInputSchema>;

export interface IsitmaYukuOutput {
  kW: number;
}

function compute(input: IsitmaYukuInput): CalcResult<IsitmaYukuOutput> {
  const bolge = IKLIM_BOLGESI[input.sehir];
  const birimYuk = BIRIM_YUK_W_M2[bolge];
  const camFaktoru = CAM_FAKTORU[input.cam];
  const toplamYukW = input.alan * birimYuk * camFaktoru;
  const kW = toplamYukW / 1000;

  return {
    value: { kW },
    intermediates: {
      iklimBolgesi: bolge,
      birimYuk_W_m2: birimYuk,
      camFaktoru,
      toplamYuk_W: toplamYukW,
    },
    standardsUsed: ["TS 825"],
  };
}

export const isitmaYukuTs825: CalcModule<IsitmaYukuInput, IsitmaYukuOutput> = {
  id: "isitma-yuku-ts825",
  title: "Isıtma Yükü",
  discipline: "mekanik",
  standards: ["TS 825"],
  inputSchema: isitmaYukuInputSchema,
  compute,
};
