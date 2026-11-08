import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Hava kompresörü atık ısı geri kazanımı: kompresöre verilen mil gücünün büyük bölümü ısıya dönüşür
// (yağ enjeksiyonlu vidalıda geri kazanılabilir ısı ≈ mil gücünün %70–94'ü).
// Q_geri = P·yük·η_geri;  yıllık ısı = Q·h;  yakıt tasarrufu = ısı/η_kazan;  mali tasarruf = yakıt × birim fiyat.
// η_geri üreticiden alınır (girdi). Isı ancak talep varsa değerlendirilebilir (ısıtma/proses suyu): talep saati kompresör
// çalışma saatinden kısa ise "değerlendirilen oran" ile azaltın.
export const kompresorAtikIsiGeriKazanimiInputSchema = z.object({
  milGucu_kW: z.number().positive(),
  yukOrani: z.number().gt(0).max(1),
  geriKazanimOrani_yuzde: z.number().min(0).max(100),
  yillikCalismaSaati_h: z.number().positive(),
  degerlendirilenOran_yuzde: z.number().min(0).max(100),
  kazanVerimi_yuzde: z.number().min(30).max(110),
  isiBirimFiyati_TLkWh: z.number().min(0),
});

export type KompresorAtikIsiGeriKazanimiInput = z.infer<typeof kompresorAtikIsiGeriKazanimiInputSchema>;

export interface KompresorAtikIsiGeriKazanimiOutput {
  geriKazanilanIsi_kW: number;
}

function compute(input: KompresorAtikIsiGeriKazanimiInput): CalcResult<KompresorAtikIsiGeriKazanimiOutput> {
  const q = input.milGucu_kW * input.yukOrani * (input.geriKazanimOrani_yuzde / 100);
  const yillikIsi = q * input.yillikCalismaSaati_h * (input.degerlendirilenOran_yuzde / 100);
  const yakit = yillikIsi / (input.kazanVerimi_yuzde / 100);
  return {
    value: { geriKazanilanIsi_kW: q },
    intermediates: {
      yillik_degerlendirilen_isi_kWh: yillikIsi,
      yillik_yakit_tasarrufu_kWh: yakit,
      yillik_mali_tasarruf_TL: yakit * input.isiBirimFiyati_TLkWh,
    },
    standardsUsed: ["Enerji dengesi (kompresör mil gücü → ısı)"],
  };
}

export const kompresorAtikIsiGeriKazanimi: CalcModule<KompresorAtikIsiGeriKazanimiInput, KompresorAtikIsiGeriKazanimiOutput> = {
  id: "kompresor-atik-isi-geri-kazanimi",
  title: "Kompresör Atık Isı Geri Kazanımı",
  discipline: "mekanik",
  standards: [],
  inputSchema: kompresorAtikIsiGeriKazanimiInputSchema,
  compute,
};
