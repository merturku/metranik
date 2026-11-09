import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Fan–sistem eğrisi kesişimi: fan ΔP = A + B·Q + C·Q² (Pa, Q m³/h; üretici eğrisine 3 noktadan uydurulur), sistem ΔP = k·Q² (türbülanslı kanal ağı).
// (C − k)·Q² + B·Q + A = 0 çözülür, pozitif kök işletme debisidir. Mil gücü P = Q·ΔP/(3600·η). Fan eğrisi stall bölgesini temsil etmez; çalışma noktasını katalog eğrisiyle doğrulayın.
export const fanIsletmeNoktasiInputSchema = z.object({
  fanA_Pa: z.number().positive(),
  fanB: z.number().finite(),
  fanC: z.number().finite(),
  sistemK: z.number().positive(),
  fanVerimi: z.number().gt(0).max(1),
});

export type FanIsletmeNoktasiInput = z.infer<typeof fanIsletmeNoktasiInputSchema>;

export interface FanIsletmeNoktasiOutput {
  debi_m3h: number | null;
}

function compute(input: FanIsletmeNoktasiInput): CalcResult<FanIsletmeNoktasiOutput> {
  const a = input.fanC - input.sistemK;
  const b = input.fanB;
  const c = input.fanA_Pa;
  const roots: number[] = [];
  if (Math.abs(a) < 1e-15) {
    if (b < 0) roots.push(-c / b);
  } else {
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      roots.push((-b + s) / (2 * a), (-b - s) / (2 * a));
    }
  }
  const pos = roots.filter((q) => q > 0).sort((x, y) => x - y);
  const q = pos[0] ?? null;
  if (q === null) {
    return {
      value: { debi_m3h: null },
      intermediates: { basinc_Pa: "—", mil_gucu_kW: "—" },
      standardsUsed: ["Fan–sistem eğrisi kesişimi"],
      verdict: { status: "uygunsuz", note: "Eğriler pozitif debide kesişmiyor." },
    };
  }
  const dp = input.sistemK * q * q;
  return {
    value: { debi_m3h: q },
    intermediates: {
      basinc_Pa: dp,
      mil_gucu_kW: (q * dp) / (3600 * input.fanVerimi * 1000),
      debi_Ls: q / 3.6,
    },
    standardsUsed: ["Fan–sistem eğrisi kesişimi"],
  };
}

export const fanIsletmeNoktasi: CalcModule<FanIsletmeNoktasiInput, FanIsletmeNoktasiOutput> = {
  id: "fan-isletme-noktasi",
  title: "Fan İşletme Noktası (Fan–Sistem Eğrisi)",
  discipline: "mekanik",
  standards: [],
  inputSchema: fanIsletmeNoktasiInputSchema,
  compute,
};
