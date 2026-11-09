import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dolaylı (akım/gerilim trafolu) sayaç tüketimi: tüketim = (son − ilk endeks)·çarpan,  çarpan = (CT primer/sekonder)·(VT primer/sekonder).
// Yarı dolaylı (yalnız akım trafolu) ölçümde VT oranı 1'dir. Endeks değerleri sayaç ekranından (kWh veya kVArh); sayaç sıfırlanmışsa
// (endeks taşması) sayaç basamak sayısı girilerek düzeltilir. Reaktif oran için Reaktif Enerji Oranı Kontrolü modülüne aktif ve reaktif tüketimi girin.
export const sayacCarpaniTuketimInputSchema = z.object({
  ilkEndeks: z.number().min(0),
  sonEndeks: z.number().min(0),
  ctPrimer_A: z.number().positive(),
  ctSekonder_A: z.number().positive(),
  vtOrani: z.number().positive(),
  sayacBasamakSayisi: z.number().int().min(0).max(10),
});

export type SayacCarpaniTuketimInput = z.infer<typeof sayacCarpaniTuketimInputSchema>;

export interface SayacCarpaniTuketimOutput {
  tuketim: number;
}

function compute(input: SayacCarpaniTuketimInput): CalcResult<SayacCarpaniTuketimOutput> {
  let fark = input.sonEndeks - input.ilkEndeks;
  let tasma = false;
  if (fark < 0 && input.sayacBasamakSayisi > 0) {
    fark += 10 ** input.sayacBasamakSayisi;
    tasma = true;
  }
  const carpan = (input.ctPrimer_A / input.ctSekonder_A) * input.vtOrani;
  return {
    value: { tuketim: fark * carpan },
    intermediates: {
      endeks_farki: fark,
      carpan,
      ct_orani: input.ctPrimer_A / input.ctSekonder_A,
      endeks_tasmasi_duzeltildi: tasma ? "evet" : "hayır",
    },
    standardsUsed: ["Dolaylı sayaç çarpanı (CT × VT)"],
    verdict: fark < 0 ? { status: "uygunsuz", note: "Son endeks ilk endeksten küçük; sayaç basamak sayısını girin veya endeksleri kontrol edin." } : undefined,
  };
}

export const sayacCarpaniTuketim: CalcModule<SayacCarpaniTuketimInput, SayacCarpaniTuketimOutput> = {
  id: "sayac-carpani-tuketim",
  title: "Sayaç Çarpanı ile Tüketim (CT × VT)",
  discipline: "elektrik",
  standards: [],
  inputSchema: sayacCarpaniTuketimInputSchema,
  compute,
};
