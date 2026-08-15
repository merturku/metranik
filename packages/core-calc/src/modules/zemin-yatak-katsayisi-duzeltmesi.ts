import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Zemin yatak katsayısı (subgrade reaction modulus) ölçek düzeltmesi
// (Terzaghi & Peck): standart plaka yükleme deneyi (genelde 0.3m×0.3m plaka)
// ile ölçülen k1 değeri, gerçek temel genişliği B'ye göre düzeltilir.
// Kohezyonsuz (granüler) zemin: k = k1 × [(B+0.3)/(2B)]².
// Kohezyonlu zemin: k = k1 × (0.3/B).
export const zeminYatakKatsayisiDuzeltmesiInputSchema = z.object({
  plakaYatakKatsayisi_k1_kNm3: z.number().positive(),
  temelGenisligi_B_m: z.number().positive(),
  zeminTipi: z.enum(["kohezyonsuz", "kohezyonlu"]),
});

export type ZeminYatakKatsayisiDuzeltmesiInput = z.infer<
  typeof zeminYatakKatsayisiDuzeltmesiInputSchema
>;

export interface ZeminYatakKatsayisiDuzeltmesiOutput {
  duzeltilmisYatakKatsayisi_k_kNm3: number;
}

const PLAKA_GENISLIGI_M = 0.3;

function compute(
  input: ZeminYatakKatsayisiDuzeltmesiInput,
): CalcResult<ZeminYatakKatsayisiDuzeltmesiOutput> {
  const duzeltmeKatsayisi =
    input.zeminTipi === "kohezyonsuz"
      ? ((input.temelGenisligi_B_m + PLAKA_GENISLIGI_M) / (2 * input.temelGenisligi_B_m)) ** 2
      : PLAKA_GENISLIGI_M / input.temelGenisligi_B_m;
  const duzeltilmisYatakKatsayisiKNm3 =
    input.plakaYatakKatsayisi_k1_kNm3 * duzeltmeKatsayisi;

  return {
    value: { duzeltilmisYatakKatsayisi_k_kNm3: duzeltilmisYatakKatsayisiKNm3 },
    intermediates: {
      duzeltmeKatsayisi,
    },
    standardsUsed: ["Terzaghi & Peck"],
  };
}

export const zeminYatakKatsayisiDuzeltmesi: CalcModule<
  ZeminYatakKatsayisiDuzeltmesiInput,
  ZeminYatakKatsayisiDuzeltmesiOutput
> = {
  id: "zemin-yatak-katsayisi-duzeltmesi",
  title: "Zemin Yatak Katsayısı Ölçek Düzeltmesi",
  discipline: "insaat",
  standards: ["Terzaghi & Peck"],
  inputSchema: zeminYatakKatsayisiDuzeltmesiInputSchema,
  compute,
};
