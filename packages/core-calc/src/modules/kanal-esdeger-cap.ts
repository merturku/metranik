import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// ASHRAE/SMACNA eşit sürtünme yöntemi: dikdörtgen bir kanalın, aynı debide
// aynı birim uzunluk sürtünme kaybını veren dairesel eşdeğer çapı.
// Deq = 1.30×(a×b)^0.625 / (a+b)^0.25. Kanal Boyutlandırma modülü doğrudan
// dairesel kanal çapını süreklilik denkleminden (Q=V×A) hesaplar; bu modül
// alan kısıtı nedeniyle seçilen dikdörtgen kanalın sürtünme kaybı
// hesaplarında (Kanal Sürtünme Basınç Kaybı) kullanılacak eşdeğer çapı üretir.
export const kanalEsdegerCapInputSchema = z.object({
  kanalGenisligi_a_mm: z.number().positive(),
  kanalYuksekligi_b_mm: z.number().positive(),
});

export type KanalEsdegerCapInput = z.infer<typeof kanalEsdegerCapInputSchema>;

export interface KanalEsdegerCapOutput {
  esdegerCap_Deq_mm: number;
}

function compute(input: KanalEsdegerCapInput): CalcResult<KanalEsdegerCapOutput> {
  const esdegerCapDeqMm =
    (1.3 * Math.pow(input.kanalGenisligi_a_mm * input.kanalYuksekligi_b_mm, 0.625)) /
    Math.pow(input.kanalGenisligi_a_mm + input.kanalYuksekligi_b_mm, 0.25);

  return {
    value: { esdegerCap_Deq_mm: esdegerCapDeqMm },
    intermediates: {
      kesitAlani_mm2: input.kanalGenisligi_a_mm * input.kanalYuksekligi_b_mm,
    },
    standardsUsed: ["ASHRAE/SMACNA"],
  };
}

export const kanalEsdegerCap: CalcModule<KanalEsdegerCapInput, KanalEsdegerCapOutput> = {
  id: "kanal-esdeger-cap",
  title: "Kanal Eşdeğer Çapı (Dikdörtgen → Dairesel)",
  discipline: "mekanik",
  standards: ["ASHRAE/SMACNA"],
  inputSchema: kanalEsdegerCapInputSchema,
  compute,
};
