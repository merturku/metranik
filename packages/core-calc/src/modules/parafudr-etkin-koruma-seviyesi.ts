import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// SPD etkin koruma seviyesi: Ueff = Up + L'·l·(di/dt)  (bağlantı iletkenleri üzerindeki endüktif gerilim düşümü).
// L' ≈ 1 µH/m; µH/m × m × kA/µs = kV. Ueff ≤ 0,8·Uw (salınım payı) → uygun; ≤ Uw → sınırda.
export const parafudrEtkinKorumaSeviyesiInputSchema = z.object({
  spdKorumaSeviyesiUp_kV: z.number().positive(),
  baglantiUzunlugu_m: z.number().min(0),
  iletkenInduktansi_uH_m: z.number().positive(),
  akimDegisimHizi_kA_us: z.number().positive(),
  ekipmanDayanimUw_kV: z.number().positive(),
});

export type ParafudrEtkinKorumaSeviyesiInput = z.infer<typeof parafudrEtkinKorumaSeviyesiInputSchema>;
export interface ParafudrEtkinKorumaSeviyesiOutput {
  etkinKorumaSeviyesi_kV: number;
}

const STD = "IEC 62305-4 / IEC 60364-5-53 (SPD bağlantı iletkeni endüktif gerilim düşümü)";
const MARJ = 0.8;
const EPS = 1e-9;

function compute(input: ParafudrEtkinKorumaSeviyesiInput): CalcResult<ParafudrEtkinKorumaSeviyesiOutput> {
  const dU = input.iletkenInduktansi_uH_m * input.baglantiUzunlugu_m * input.akimDegisimHizi_kA_us;
  const Ueff = input.spdKorumaSeviyesiUp_kV + dU;
  const sinir = MARJ * input.ekipmanDayanimUw_kV;
  const lmaks = (sinir - input.spdKorumaSeviyesiUp_kV) / (input.iletkenInduktansi_uH_m * input.akimDegisimHizi_kA_us);
  const status = Ueff <= sinir + EPS ? "uygun" : Ueff <= input.ekipmanDayanimUw_kV + EPS ? "sinirda" : "uygunsuz";
  return {
    value: { etkinKorumaSeviyesi_kV: Ueff },
    intermediates: {
      iletken_gerilim_dusumu_kV: dU,
      izin_sinir_08Uw_kV: sinir,
      azami_baglanti_uzunlugu_m: Math.max(0, lmaks),
      Ueff_Uw_orani: Ueff / input.ekipmanDayanimUw_kV,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note:
        status === "uygun"
          ? `Ueff ${Ueff.toFixed(2)} kV ≤ 0,8·Uw = ${sinir.toFixed(2)} kV`
          : status === "sinirda"
            ? `Ueff ${Ueff.toFixed(2)} kV, 0,8·Uw'yi aşıyor ama Uw içinde; bağlantıyı en fazla ${Math.max(0, lmaks).toFixed(2)} m'ye kısaltın`
            : `Ueff ${Ueff.toFixed(2)} kV > Uw = ${input.ekipmanDayanimUw_kV} kV: daha düşük Up'li SPD veya kademeli koruma gerekir`,
    },
  };
}

export const parafudrEtkinKorumaSeviyesi: CalcModule<ParafudrEtkinKorumaSeviyesiInput, ParafudrEtkinKorumaSeviyesiOutput> = {
  id: "parafudr-etkin-koruma-seviyesi",
  title: "Parafudr (SPD) Etkin Koruma Seviyesi ve Bağlantı Uzunluğu",
  discipline: "elektrik",
  standards: [STD],
  inputSchema: parafudrEtkinKorumaSeviyesiInputSchema,
  compute,
};
