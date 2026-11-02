import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kondens geri kazanımı: geri dönen kondens, makyaj suyunu ısıtma enerjisini ve yakıtı azaltır.
// q = ṁ·r·cp·(T_kondens − T_makyaj)/3600 [kWh/h];  yakıt = q/(η·Hu)  (doğalgaz Hu = 9,59 kWh/m³);
// ayrıca su tasarrufu ṁ·r. Flaş buhar kazancı ve su işleme maliyeti dahil değildir (muhafazakâr).
export const kondensGeriKazanimTasarrufuInputSchema = z.object({
  kondensDebisi_kgh: z.number().positive(),
  geriDonusOrani: z.number().min(0).max(1),
  kondensSicakligi_C: z.number().min(40).max(180),
  makyajSuSicakligi_C: z.number().min(0).max(40),
  kazanVerimi: z.number().gt(0).max(1.1),
  yakitFiyati_TLm3: z.number().min(0),
  yillikSaat: z.number().positive().max(8760),
});

export type KondensGeriKazanimTasarrufuInput = z.infer<typeof kondensGeriKazanimTasarrufuInputSchema>;

export interface KondensGeriKazanimTasarrufuOutput {
  yillikYakitTasarrufu_m3: number;
}

function compute(input: KondensGeriKazanimTasarrufuInput): CalcResult<KondensGeriKazanimTasarrufuOutput> {
  const m = input.kondensDebisi_kgh * input.geriDonusOrani;
  const qKW = (m * 4.186 * (input.kondensSicakligi_C - input.makyajSuSicakligi_C)) / 3600;
  const yakitKWh = qKW / input.kazanVerimi;
  const m3h = yakitKWh / 9.59;
  const yil = m3h * input.yillikSaat;
  return {
    value: { yillikYakitTasarrufu_m3: yil },
    intermediates: {
      geri_donen_kondens_kgh: m,
      geri_kazanilan_isi_kW: qKW,
      yakit_girisi_kWh_saat: yakitKWh,
      saatlik_yakit_m3: m3h,
      yillik_para_tasarrufu_TL: yil * input.yakitFiyati_TLm3,
      yillik_su_tasarrufu_m3: (m * input.yillikSaat) / 1000,
    },
    standardsUsed: ["Enerji dengesi (m·cp·ΔT)"],
  };
}

export const kondensGeriKazanimTasarrufu: CalcModule<KondensGeriKazanimTasarrufuInput, KondensGeriKazanimTasarrufuOutput> = {
  id: "kondens-geri-kazanim-tasarrufu",
  title: "Kondens Geri Kazanımı Yakıt Tasarrufu",
  discipline: "mekanik",
  standards: [],
  inputSchema: kondensGeriKazanimTasarrufuInputSchema,
  compute,
};
