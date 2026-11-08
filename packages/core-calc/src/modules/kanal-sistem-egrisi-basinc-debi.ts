import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sistem (kanal/boru) eğrisi: türbülanslı akışta basınç kaybı debinin üssüyle değişir, ΔP2 = ΔP1·(Q2/Q1)^n, n ≈ 2
// (tam türbülans; sürtünme kaybı baskınsa n ≈ 1,8–2,0). Fan/pompa gücü Q·ΔP ile orantılı olduğundan P2/P1 = (Q2/Q1)^(n+1).
// Statik (sabit) yük içeren sistemlerde (açık devre, filtre sabit terimi) bu bağıntı yalnız dinamik kısım için geçerlidir.
export const kanalSistemEgrisiBasincDebiInputSchema = z.object({
  referansDebi: z.number().positive(),
  referansBasincKaybi: z.number().positive(),
  yeniDebi: z.number().positive(),
  us_n: z.number().min(1).max(2.2),
});

export type KanalSistemEgrisiBasincDebiInput = z.infer<typeof kanalSistemEgrisiBasincDebiInputSchema>;

export interface KanalSistemEgrisiBasincDebiOutput {
  yeniBasincKaybi: number;
}

function compute(input: KanalSistemEgrisiBasincDebiInput): CalcResult<KanalSistemEgrisiBasincDebiOutput> {
  const r = input.yeniDebi / input.referansDebi;
  const dp2 = input.referansBasincKaybi * r ** input.us_n;
  return {
    value: { yeniBasincKaybi: dp2 },
    intermediates: {
      debi_orani: r,
      basinc_orani: r ** input.us_n,
      guc_orani_P2_P1: r ** (input.us_n + 1),
      direnc_katsayisi_k: input.referansBasincKaybi / input.referansDebi ** input.us_n,
    },
    standardsUsed: ["Sistem eğrisi ΔP ∝ Q^n (ASHRAE Fundamentals, Duct Design / fan sistem etkisi)"],
  };
}

export const kanalSistemEgrisiBasincDebi: CalcModule<KanalSistemEgrisiBasincDebiInput, KanalSistemEgrisiBasincDebiOutput> = {
  id: "kanal-sistem-egrisi-basinc-debi",
  title: "Sistem Eğrisi: Debi Değişiminde Basınç Kaybı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kanalSistemEgrisiBasincDebiInputSchema,
  compute,
};
