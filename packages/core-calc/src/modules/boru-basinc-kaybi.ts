import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Darcy-Weisbach denklemi: ΔP = f · (L/D) · (ρV²/2). Sürtünme katsayısı (f) normalde
// Moody diyagramından/Colebrook denkleminden gelir; burada tablo gömmek yerine
// mühendisin girdiği bir değer olarak alınır (fiziksel formül doğrulanabilir).
const YOGUNLUK_KG_M3 = 1000;

export const boruBasincKaybiInputSchema = z.object({
  debi: z.number().positive(),
  capD: z.number().positive(),
  uzunluk: z.number().positive(),
  surtunmeKatsayisi: z.number().positive(),
});

export type BoruBasincKaybiInput = z.infer<typeof boruBasincKaybiInputSchema>;

export interface BoruBasincKaybiOutput {
  basincKaybi_kPa: number;
}

function compute(input: BoruBasincKaybiInput): CalcResult<BoruBasincKaybiOutput> {
  const kesitAlaniM2 = (Math.PI * input.capD ** 2) / 4;
  const hizMS = input.debi / kesitAlaniM2;
  const basincKaybiPa =
    input.surtunmeKatsayisi *
    (input.uzunluk / input.capD) *
    ((YOGUNLUK_KG_M3 * hizMS ** 2) / 2);

  return {
    value: { basincKaybi_kPa: basincKaybiPa / 1000 },
    intermediates: {
      kesitAlani_m2: kesitAlaniM2,
      hiz_m_s: hizMS,
      basincKaybi_Pa: basincKaybiPa,
    },
    standardsUsed: [],
  };
}

export const boruBasincKaybi: CalcModule<BoruBasincKaybiInput, BoruBasincKaybiOutput> = {
  id: "boru-basinc-kaybi",
  title: "Boru Basınç Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruBasincKaybiInputSchema,
  compute,
};
