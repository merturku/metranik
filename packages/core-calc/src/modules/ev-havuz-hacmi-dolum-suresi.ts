import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Havuz/su deposu hacmi ve dolum süresi: dikdörtgen V = boy·en·derinlik; dairesel V = π·D²/4·derinlik (düz tabanlı, dik cidarlı).
// Dolum süresi t = V/Q. Eğimli tabanlı havuzda ortalama derinlik kullanılmalıdır. Klor dozajı ve sirkülasyon debisi için Havuz Klor Dozajı ve Havuz Su Sirkülasyon Debisi modülleri
// bu hacmi girdi alır; ilk ısıtma için Havuz İlk Isıtma Süresi modülünü kullanın.
export const evHavuzHacmiDolumSuresiInputSchema = z.object({
  sekil: z.enum(["dikdortgen", "daire"]),
  boyut1_m: z.number().positive(),
  boyut2_m: z.number().min(0),
  derinlik_m: z.number().positive(),
  dolumDebisi_Ldk: z.number().positive(),
});

export type EvHavuzHacmiDolumSuresiInput = z.infer<typeof evHavuzHacmiDolumSuresiInputSchema>;

export interface EvHavuzHacmiDolumSuresiOutput {
  hacim_m3: number;
}

function compute(input: EvHavuzHacmiDolumSuresiInput): CalcResult<EvHavuzHacmiDolumSuresiOutput> {
  const alan = input.sekil === "dikdortgen" ? input.boyut1_m * input.boyut2_m : (Math.PI * input.boyut1_m ** 2) / 4;
  const v = alan * input.derinlik_m;
  const dk = (v * 1000) / input.dolumDebisi_Ldk;
  return {
    value: { hacim_m3: v },
    intermediates: {
      yuzey_alani_m2: alan,
      hacim_L: v * 1000,
      dolum_suresi_saat: dk / 60,
      dolum_suresi_dakika: dk,
      dolum_suresi_gun: dk / 1440,
    },
    standardsUsed: [],
    verdict: input.sekil === "dikdortgen" && input.boyut2_m <= 0 ? { status: "uygunsuz", note: "Dikdörtgen havuz için boyut 2 (en) girilmelidir." } : undefined,
  };
}

export const evHavuzHacmiDolumSuresi: CalcModule<EvHavuzHacmiDolumSuresiInput, EvHavuzHacmiDolumSuresiOutput> = {
  id: "ev-havuz-hacmi-dolum-suresi",
  title: "Havuz Hacmi ve Dolum Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: evHavuzHacmiDolumSuresiInputSchema,
  compute,
};
