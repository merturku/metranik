import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basınçlı hava kaçak oranı (yük/boşta süresi yöntemi, üretim yokken):
// kaçak % = T_yük/(T_yük + T_boşta)·100 ;  kaçak debisi = oran·FAD ;  kayıp güç = kaçak debisi·özgül güç (kW per m³/min).
// Özgül güç tipik 6–7 kW/(m³/min) (7 bar, vidalı kompresör, toplam sistem) — üretici verisinden alın.
// Yıllık enerji = kayıp güç·işletme saati;  maliyet = enerji·elektrik fiyatı.
export const basincliHavaKacakOraniInputSchema = z.object({
  yukSuresi_s: z.number().positive(),
  bostaSuresi_s: z.number().positive(),
  kompresorFAD_m3min: z.number().positive(),
  ozgulGuc_kWm3min: z.number().positive().max(15),
  yillikSaat: z.number().positive().max(8760),
  elektrikFiyati_TLkWh: z.number().min(0),
});

export type BasincliHavaKacakOraniInput = z.infer<typeof basincliHavaKacakOraniInputSchema>;

export interface BasincliHavaKacakOraniOutput {
  kacakOrani_yuzde: number;
}

function compute(input: BasincliHavaKacakOraniInput): CalcResult<BasincliHavaKacakOraniOutput> {
  const oran = input.yukSuresi_s / (input.yukSuresi_s + input.bostaSuresi_s);
  const q = oran * input.kompresorFAD_m3min;
  const p = q * input.ozgulGuc_kWm3min;
  const e = p * input.yillikSaat;
  const status = oran <= 0.1 ? "uygun" : oran <= 0.2 ? "sinirda" : "uygunsuz";
  return {
    value: { kacakOrani_yuzde: oran * 100 },
    intermediates: {
      kacak_debisi_m3min: q,
      kayip_guc_kW: p,
      yillik_kayip_enerji_kWh: e,
      yillik_kayip_maliyet_TL: e * input.elektrikFiyati_TLkWh,
    },
    standardsUsed: ["ISO 11011 (basınçlı hava enerji değerlendirmesi)"],
    verdict: {
      status,
      note:
        status === "uygun"
          ? "Kaçak oranı %10 ve altında (iyi durumdaki sistem)."
          : status === "sinirda"
            ? "Kaçak oranı %10–20: tespit ve onarım programı önerilir."
            : "Kaçak oranı %20'nin üstünde: ciddi enerji kaybı, ultrasonik kaçak taraması gerekir.",
    },
  };
}

export const basincliHavaKacakOrani: CalcModule<BasincliHavaKacakOraniInput, BasincliHavaKacakOraniOutput> = {
  id: "basincli-hava-kacak-orani",
  title: "Basınçlı Hava Kaçak Oranı (Yük/Boşta Süresi)",
  discipline: "mekanik",
  standards: ["ISO 11011"],
  inputSchema: basincliHavaKacakOraniInputSchema,
  compute,
};
