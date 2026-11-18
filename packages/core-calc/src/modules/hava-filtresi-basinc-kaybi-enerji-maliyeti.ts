import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Filtre fan gücü: P = V̇·Δp_ort/η; Δp_ort = (Δp_temiz + Δp_kirli)/2; yıllık enerji + filtre değişim bedeli.
export const havaFiltresiBasincKaybiEnerjiMaliyetiInputSchema = z
  .object({
    debi_m3h: z.number().positive(),
    temizDp_Pa: z.number().min(0),
    kirliDp_Pa: z.number().min(0),
    fanVerimi: z.number().gt(0).max(1),
    yillikSaat_h: z.number().positive(),
    elektrikFiyati_TLkWh: z.number().min(0),
    filtreAdedi: z.number().min(0),
    filtreBirimFiyati_TL: z.number().min(0),
    yilda_degisim: z.number().min(0),
  })
  .refine((v) => v.kirliDp_Pa >= v.temizDp_Pa, { message: "Kirli filtre Δp ≥ temiz filtre Δp olmalı" });

export type HavaFiltresiBasincKaybiEnerjiMaliyetiInput = z.infer<typeof havaFiltresiBasincKaybiEnerjiMaliyetiInputSchema>;

export interface HavaFiltresiBasincKaybiEnerjiMaliyetiOutput {
  yillikEnerji_kWh: number;
}

function compute(input: HavaFiltresiBasincKaybiEnerjiMaliyetiInput): CalcResult<HavaFiltresiBasincKaybiEnerjiMaliyetiOutput> {
  const dpOrt = (input.temizDp_Pa + input.kirliDp_Pa) / 2;
  const P_W = ((input.debi_m3h / 3600) * dpOrt) / input.fanVerimi;
  const E = (P_W * input.yillikSaat_h) / 1000;
  const enerjiTL = E * input.elektrikFiyati_TLkWh;
  const filtreTL = input.filtreAdedi * input.filtreBirimFiyati_TL * input.yilda_degisim;
  return {
    value: { yillikEnerji_kWh: E },
    intermediates: {
      ortalama_dp_Pa: dpOrt,
      ek_fan_gucu_W: P_W,
      yillik_enerji_maliyeti_TL: enerjiTL,
      yillik_filtre_maliyeti_TL: filtreTL,
      toplam_yillik_maliyet_TL: enerjiTL + filtreTL,
    },
    standardsUsed: [],
  };
}

export const havaFiltresiBasincKaybiEnerjiMaliyeti: CalcModule<HavaFiltresiBasincKaybiEnerjiMaliyetiInput, HavaFiltresiBasincKaybiEnerjiMaliyetiOutput> = {
  id: "hava-filtresi-basinc-kaybi-enerji-maliyeti",
  title: "Hava Filtresi Basınç Kaybı ve Yıllık Enerji Maliyeti",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaFiltresiBasincKaybiEnerjiMaliyetiInputSchema,
  compute,
};
