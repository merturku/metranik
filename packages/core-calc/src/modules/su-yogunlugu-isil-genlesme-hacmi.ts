import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Saf suyun yoğunluğu (Tanaka vd. 2001, 0–40 °C ana; 0–100 °C yaklaşık geçerli):
// ρ(T) = 999,974950·[1 − (T + 288,9414)/(508929,2·(T + 68,12963))·(T − 3,9863)²]  kg/m³ (T °C).
// Kapalı devrede ısıl genleşme hacmi ΔV = V·(ρ_soğuk/ρ_sıcak − 1). Glikol/inhibitör katkı yoğunluğu değiştirir (bu modül saf su içindir).
// Genleşme tankı boyutlandırması için Genleşme Tankı modülünü kullanın; bu modül ΔV'nin kaynağını açıkça verir.
function yogunluk(t: number): number {
  return 999.97495 * (1 - ((t + 288.9414) / (508929.2 * (t + 68.12963))) * (t - 3.9863) ** 2);
}

export const suYogunluguIsilGenlesmeHacmiInputSchema = z.object({
  sistemHacmi_L: z.number().positive(),
  baslangicSicakligi_C: z.number().min(0).max(100),
  sonSicaklik_C: z.number().min(0).max(100),
});

export type SuYogunluguIsilGenlesmeHacmiInput = z.infer<typeof suYogunluguIsilGenlesmeHacmiInputSchema>;

export interface SuYogunluguIsilGenlesmeHacmiOutput {
  genlesmeHacmi_L: number;
}

function compute(input: SuYogunluguIsilGenlesmeHacmiInput): CalcResult<SuYogunluguIsilGenlesmeHacmiOutput> {
  const r1 = yogunluk(input.baslangicSicakligi_C);
  const r2 = yogunluk(input.sonSicaklik_C);
  const dv = input.sistemHacmi_L * (r1 / r2 - 1);
  return {
    value: { genlesmeHacmi_L: dv },
    intermediates: {
      baslangic_yogunlugu_kgm3: r1,
      son_yogunluk_kgm3: r2,
      genlesme_orani_yuzde: (r1 / r2 - 1) * 100,
    },
    standardsUsed: ["Tanaka vd. (2001) saf su yoğunluğu bağıntısı"],
  };
}

export const suYogunluguIsilGenlesmeHacmi: CalcModule<SuYogunluguIsilGenlesmeHacmiInput, SuYogunluguIsilGenlesmeHacmiOutput> = {
  id: "su-yogunlugu-isil-genlesme-hacmi",
  title: "Suyun Yoğunluğu ve Isıl Genleşme Hacmi",
  discipline: "mekanik",
  standards: [],
  inputSchema: suYogunluguIsilGenlesmeHacmiInputSchema,
  compute,
};
