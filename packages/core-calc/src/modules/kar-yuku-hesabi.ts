import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// EN 1991-1-3 (Eurocode 1) çatı kar yükü formülü: S = μ · Ce · Ct · Sk.
// Zemin kar yükü (Sk) yer/bölgeye göre standart haritasından alınır; bu
// modülde gömülü değildir, mühendis girdisidir.
export const karYukuHesabiInputSchema = z.object({
  sekilKatsayisi_mu: z.number().positive(),
  maruziyetKatsayisi_Ce: z.number().positive(),
  isilKatsayi_Ct: z.number().positive(),
  zeminKarYuku_Sk_kNm2: z.number().positive(),
});

export type KarYukuHesabiInput = z.infer<typeof karYukuHesabiInputSchema>;

export interface KarYukuHesabiOutput {
  karYuku_kNm2: number;
}

function compute(input: KarYukuHesabiInput): CalcResult<KarYukuHesabiOutput> {
  const karYukuKNm2 =
    input.sekilKatsayisi_mu *
    input.maruziyetKatsayisi_Ce *
    input.isilKatsayi_Ct *
    input.zeminKarYuku_Sk_kNm2;

  return {
    value: { karYuku_kNm2: karYukuKNm2 },
    intermediates: {
      sekilKatsayisi_mu: input.sekilKatsayisi_mu,
      maruziyetKatsayisi_Ce: input.maruziyetKatsayisi_Ce,
      isilKatsayi_Ct: input.isilKatsayi_Ct,
      zeminKarYuku_Sk_kNm2: input.zeminKarYuku_Sk_kNm2,
    },
    standardsUsed: ["EN 1991-1-3"],
  };
}

export const karYukuHesabi: CalcModule<KarYukuHesabiInput, KarYukuHesabiOutput> = {
  id: "kar-yuku-hesabi",
  title: "Kar Yükü Hesabı",
  discipline: "insaat",
  standards: ["EN 1991-1-3"],
  inputSchema: karYukuHesabiInputSchema,
  compute,
};
