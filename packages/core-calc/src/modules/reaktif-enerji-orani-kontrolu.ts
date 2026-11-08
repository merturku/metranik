import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aylık reaktif enerji oranı kontrolü: endüktif oran = Qind/P·100, kapasitif oran = Qkap/P·100 (kVArh/kWh).
// Türkiye dağıtım/tarife uygulamasında (EPDK) endüktif %20 ve kapasitif %15 sınırı aşılınca reaktif enerji
// bedeli uygulanır; sınırlar dönemine göre değiştiği için girdidir (varsayılanlar teyit edilmelidir).
// Ortalama güç faktörü cosφ = P/√(P² + Q²). Sınırı aşan reaktif enerji = Q − sınır·P.
export const reaktifEnerjiOraniKontroluInputSchema = z.object({
  aktifEnerji_kWh: z.number().positive(),
  enduktifReaktif_kVArh: z.number().min(0),
  kapasitifReaktif_kVArh: z.number().min(0),
  enduktifSinir_yuzde: z.number().positive(),
  kapasitifSinir_yuzde: z.number().positive(),
});

export type ReaktifEnerjiOraniKontroluInput = z.infer<typeof reaktifEnerjiOraniKontroluInputSchema>;

export interface ReaktifEnerjiOraniKontroluOutput {
  enduktifOran_yuzde: number;
}

function compute(input: ReaktifEnerjiOraniKontroluInput): CalcResult<ReaktifEnerjiOraniKontroluOutput> {
  const P = input.aktifEnerji_kWh;
  const oi = (input.enduktifReaktif_kVArh / P) * 100;
  const ok = (input.kapasitifReaktif_kVArh / P) * 100;
  const cosEnd = P / Math.hypot(P, input.enduktifReaktif_kVArh);
  const asimI = Math.max(0, input.enduktifReaktif_kVArh - (input.enduktifSinir_yuzde / 100) * P);
  const asimK = Math.max(0, input.kapasitifReaktif_kVArh - (input.kapasitifSinir_yuzde / 100) * P);
  const rI = oi / input.enduktifSinir_yuzde;
  const rK = ok / input.kapasitifSinir_yuzde;
  const durum = rI > 1 || rK > 1 ? "uygunsuz" : rI >= 0.9 || rK >= 0.9 ? "sinirda" : "uygun";
  return {
    value: { enduktifOran_yuzde: oi },
    intermediates: {
      kapasitif_oran_yuzde: ok,
      ortalama_cosphi_enduktif: cosEnd,
      sinir_asan_enduktif_kVArh: asimI,
      sinir_asan_kapasitif_kVArh: asimK,
    },
    standardsUsed: ["EPDK tarife uygulaması (reaktif enerji sınırları; güncel mevzuattan teyit edin)"],
    verdict: {
      status: durum,
      note:
        durum === "uygunsuz"
          ? "Reaktif oran sınırı aşıyor; kompanzasyon gücünü artırın (endüktif) veya kademe/otomatik kontrolü gözden geçirin (kapasitif)."
          : durum === "sinirda"
            ? "Oran sınırın %90'ından fazla; marj dar."
            : "Reaktif oranlar sınırların içinde.",
    },
  };
}

export const reaktifEnerjiOraniKontrolu: CalcModule<ReaktifEnerjiOraniKontroluInput, ReaktifEnerjiOraniKontroluOutput> = {
  id: "reaktif-enerji-orani-kontrolu",
  title: "Reaktif Enerji Oranı Kontrolü (Endüktif / Kapasitif)",
  discipline: "elektrik",
  standards: [],
  inputSchema: reaktifEnerjiOraniKontroluInputSchema,
  compute,
};
