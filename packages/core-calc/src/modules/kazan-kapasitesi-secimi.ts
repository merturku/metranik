import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıtma kazanı kapasite seçimi: Q_kazan = Q_bina·(1 + f_boru)·(1 + f_ısınma) + Q_sıcaksu,
// f_boru dağıtım (boru/vana) kayıpları (yalıtımlı tesisatta %5–10), f_ısınma kesintili işletmede ısınma payı (%0–20).
// Yakıt giriş gücü Q_kazan/η. Standart kapasite aralığına yuvarlama üreticiye bırakılmıştır.
export const kazanKapasitesiSecimiInputSchema = z.object({
  binaIsiYuku_kW: z.number().positive(),
  boruKaybiYuzde: z.number().min(0).max(30),
  isinmaPayiYuzde: z.number().min(0).max(40),
  sicakSuYuku_kW: z.number().min(0),
  kazanVerimi: z.number().gt(0).max(1.1),
});

export type KazanKapasitesiSecimiInput = z.infer<typeof kazanKapasitesiSecimiInputSchema>;

export interface KazanKapasitesiSecimiOutput {
  kazanGucu_kW: number;
}

function compute(input: KazanKapasitesiSecimiInput): CalcResult<KazanKapasitesiSecimiOutput> {
  const isitma = input.binaIsiYuku_kW * (1 + input.boruKaybiYuzde / 100) * (1 + input.isinmaPayiYuzde / 100);
  const q = isitma + input.sicakSuYuku_kW;
  return {
    value: { kazanGucu_kW: q },
    intermediates: {
      payli_isitma_yuku_kW: isitma,
      sicak_su_yuku_kW: input.sicakSuYuku_kW,
      yakit_giris_gucu_kW: q / input.kazanVerimi,
      kcal_h: q * 859.845,
      toplam_pay_orani: q / input.binaIsiYuku_kW,
    },
    standardsUsed: ["TS EN 12831 (bina ısı yükü), TS EN 12828 (sistem tasarımı)"],
  };
}

export const kazanKapasitesiSecimi: CalcModule<KazanKapasitesiSecimiInput, KazanKapasitesiSecimiOutput> = {
  id: "kazan-kapasitesi-secimi",
  title: "Isıtma Kazanı Kapasite Seçimi",
  discipline: "mekanik",
  standards: ["TS EN 12831", "TS EN 12828"],
  inputSchema: kazanKapasitesiSecimiInputSchema,
  compute,
};
