import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan basınçları: toplam basınç Pt = Ps + Pv, dinamik basınç Pv = ρ·V²/2, V = Q/A (fan çıkış ağzı).
// Fan katalog eğrileri statik (Ps) veya toplam (Pt) basınç üzerinden verilebilir; karşılaştırma için aynı tanımla çalışılmalıdır.
// Fan mil gücü için Fan Mil Gücü modülü Pt (veya Ps ile statik verim) kullanır. ρ rakıma/sıcaklığa göre düzeltilmelidir (bkz. Rakım Hava Yoğunluğu).
export const fanToplamStatikDinamikBasincInputSchema = z.object({
  statikBasinc_Pa: z.number(),
  debi_m3s: z.number().positive(),
  cikisAlani_m2: z.number().positive(),
  havaYogunlugu_kgm3: z.number().positive(),
});

export type FanToplamStatikDinamikBasincInput = z.infer<typeof fanToplamStatikDinamikBasincInputSchema>;

export interface FanToplamStatikDinamikBasincOutput {
  toplamBasinc_Pa: number;
}

function compute(input: FanToplamStatikDinamikBasincInput): CalcResult<FanToplamStatikDinamikBasincOutput> {
  const v = input.debi_m3s / input.cikisAlani_m2;
  const pv = (input.havaYogunlugu_kgm3 * v * v) / 2;
  const pt = input.statikBasinc_Pa + pv;
  return {
    value: { toplamBasinc_Pa: pt },
    intermediates: {
      cikis_hizi_ms: v,
      dinamik_basinc_Pa: pv,
      dinamik_oran_yuzde: pt !== 0 ? (pv / pt) * 100 : "—",
      hava_gucu_toplam_W: input.debi_m3s * pt,
      hava_gucu_statik_W: input.debi_m3s * input.statikBasinc_Pa,
    },
    standardsUsed: ["Bernoulli denklemi; ISO 5801 (fan basınç tanımları)"],
  };
}

export const fanToplamStatikDinamikBasinc: CalcModule<FanToplamStatikDinamikBasincInput, FanToplamStatikDinamikBasincOutput> = {
  id: "fan-toplam-statik-dinamik-basinc",
  title: "Fan Toplam, Statik ve Dinamik Basınç",
  discipline: "mekanik",
  standards: ["ISO 5801"],
  inputSchema: fanToplamStatikDinamikBasincInputSchema,
  compute,
};
