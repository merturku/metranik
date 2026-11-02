import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıtma yakıtlarının faydalı ısı birim maliyeti (₺ / kWh ısı):  c = fiyat/(Hu·η)  (yakıtlar),
// elektrik direnç: fiyat; ısı pompası: fiyat/SCOP.  Hu: doğalgaz 9,59 kWh/m³ (≈34,5 MJ/m³), pelet 4,6, LPG 12,8 kWh/kg.
// Fiyatlar kullanıcı girdisidir (sayfadaki varsayılanlar yalnız örnektir — güncel tarifeyi girin).
export const isitmaYakitiMaliyetKarsilastirmasiInputSchema = z.object({
  dogalgazFiyati_TLm3: z.number().min(0),
  kombiVerimi: z.number().gt(0).max(1.1),
  elektrikFiyati_TLkWh: z.number().min(0),
  isiPompasiSCOP: z.number().gt(1).max(8),
  peletFiyati_TLkg: z.number().min(0),
  peletVerimi: z.number().gt(0).max(1),
  lpgFiyati_TLkg: z.number().min(0),
  lpgVerimi: z.number().gt(0).max(1.1),
});

export type IsitmaYakitiMaliyetKarsilastirmasiInput = z.infer<typeof isitmaYakitiMaliyetKarsilastirmasiInputSchema>;

export interface IsitmaYakitiMaliyetKarsilastirmasiOutput {
  enUcuzBirimMaliyet_TLkWh: number;
}

function compute(input: IsitmaYakitiMaliyetKarsilastirmasiInput): CalcResult<IsitmaYakitiMaliyetKarsilastirmasiOutput> {
  const sec = {
    "Doğalgaz kombi": input.dogalgazFiyati_TLm3 / (9.59 * input.kombiVerimi),
    "Elektrik (direnç)": input.elektrikFiyati_TLkWh,
    "Isı pompası": input.elektrikFiyati_TLkWh / input.isiPompasiSCOP,
    "Pelet": input.peletFiyati_TLkg / (4.6 * input.peletVerimi),
    "LPG": input.lpgFiyati_TLkg / (12.8 * input.lpgVerimi),
  };
  const sirali = Object.entries(sec).sort((a, b) => a[1] - b[1]);
  const [enUcuzAd, enUcuz] = sirali[0] as [string, number];
  return {
    value: { enUcuzBirimMaliyet_TLkWh: enUcuz },
    intermediates: {
      en_ucuz_secenek: enUcuzAd,
      dogalgaz_TLkWh: sec["Doğalgaz kombi"],
      elektrik_direnc_TLkWh: sec["Elektrik (direnç)"],
      isi_pompasi_TLkWh: sec["Isı pompası"],
      pelet_TLkWh: sec["Pelet"],
      lpg_TLkWh: sec["LPG"],
      en_pahali_enucuz_orani: (sirali[sirali.length - 1] as [string, number])[1] / enUcuz,
    },
    standardsUsed: [],
  };
}

export const isitmaYakitiMaliyetKarsilastirmasi: CalcModule<IsitmaYakitiMaliyetKarsilastirmasiInput, IsitmaYakitiMaliyetKarsilastirmasiOutput> = {
  id: "isitma-yakiti-maliyet-karsilastirmasi",
  title: "Isıtma Yakıtı Maliyet Karşılaştırması",
  discipline: "ev",
  standards: [],
  inputSchema: isitmaYakitiMaliyetKarsilastirmasiInputSchema,
  compute,
};
