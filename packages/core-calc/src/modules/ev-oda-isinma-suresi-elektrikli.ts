import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Elektrikli ısıtıcıyla oda ısınma süresi (tek kapasiteli ısıl model): C·dT/dt = P − UA·(T − Te).
// Kararlı sıcaklık T∞ = Te + P/UA, zaman sabiti τ = C/UA,  T(t) = T∞ − (T∞ − T0)·e^(−t/τ)  →  t = τ·ln[(T∞ − T0)/(T∞ − Tf)].
// Hedef Tf ≥ T∞ ise ısıtıcı gücü yetersizdir (hedefe hiç ulaşılmaz). C oda hava + eşya/yapı ısıl kütlesi (J/K); yalnız hava (V·1,2·1005) alınırsa süre
// kısa çıkar, gerçekte duvar ısıl kütlesi baskındır. UA Pencere/Duvar Isı Kaybı ve Havalandırma Isı Kaybı toplamından alınır.
export const evOdaIsinmaSuresiElektrikliInputSchema = z.object({
  isilKapasite_MJK: z.number().positive(),
  isiKaybiKatsayisi_UA_WK: z.number().positive(),
  isitaciGucu_W: z.number().positive(),
  disSicaklik_C: z.number(),
  baslangicSicakligi_C: z.number(),
  hedefSicaklik_C: z.number(),
});

export type EvOdaIsinmaSuresiElektrikliInput = z.infer<typeof evOdaIsinmaSuresiElektrikliInputSchema>;

export interface EvOdaIsinmaSuresiElektrikliOutput {
  isinmaSuresi_saat: number | null;
}

function compute(input: EvOdaIsinmaSuresiElektrikliInput): CalcResult<EvOdaIsinmaSuresiElektrikliOutput> {
  const c = input.isilKapasite_MJK * 1e6;
  const tau = c / input.isiKaybiKatsayisi_UA_WK;
  const tInf = input.disSicaklik_C + input.isitaciGucu_W / input.isiKaybiKatsayisi_UA_WK;
  const standards = ["Newton ısınma/soğuma yasası, tek kapasiteli model"];
  if (input.hedefSicaklik_C <= input.baslangicSicakligi_C) {
    return { value: { isinmaSuresi_saat: 0 }, intermediates: { kararli_sicaklik_C: tInf, zaman_sabiti_saat: tau / 3600 }, standardsUsed: standards };
  }
  if (input.hedefSicaklik_C >= tInf) {
    return {
      value: { isinmaSuresi_saat: null },
      intermediates: { kararli_sicaklik_C: tInf, zaman_sabiti_saat: tau / 3600, not: "Isıtıcı gücü hedef sıcaklığı sürdürmeye yetmiyor" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: `Kararlı sıcaklık ${tInf.toFixed(1)} °C; hedefe ulaşmak için güç artırılmalı veya yalıtım iyileştirilmeli.` },
    };
  }
  const t = tau * Math.log((tInf - input.baslangicSicakligi_C) / (tInf - input.hedefSicaklik_C));
  return {
    value: { isinmaSuresi_saat: t / 3600 },
    intermediates: {
      kararli_sicaklik_C: tInf,
      zaman_sabiti_saat: tau / 3600,
      sure_dakika: t / 60,
      gerekli_surekli_guc_W: input.isiKaybiKatsayisi_UA_WK * (input.hedefSicaklik_C - input.disSicaklik_C),
    },
    standardsUsed: standards,
  };
}

export const evOdaIsinmaSuresiElektrikli: CalcModule<EvOdaIsinmaSuresiElektrikliInput, EvOdaIsinmaSuresiElektrikliOutput> = {
  id: "ev-oda-isinma-suresi-elektrikli",
  title: "Odanın Isınma Süresi (Elektrikli Isıtıcı)",
  discipline: "ev",
  standards: [],
  inputSchema: evOdaIsinmaSuresiElektrikliInputSchema,
  compute,
};
