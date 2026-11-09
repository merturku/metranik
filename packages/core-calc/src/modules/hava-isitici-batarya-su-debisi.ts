import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıcak sulu hava ısıtıcı batarya: hava tarafı Q = V̇·ρ·cp·ΔTh  (ρ = 1,2 kg/m³, cp = 1,005 kJ/kg·K → ρcp = 1,206 kJ/m³K),
// su tarafı ṁ = Q/(cw·ΔTw),  cw = 4,186 kJ/kg·K; hacimsel su debisi ≈ ṁ/1000 (m³/h × 3600).
// Isı transfer yüzeyi ve kanat verimi bu modülde yoktur (üretici seçimi); kapasite gereksinimi ve su debisini verir.
// Su debisi Kontrol Vanası Otoritesi ve Pompa modüllerine girdi olur. Hava yoğunluğu yükseklikte düzeltilmelidir.
const RHO_CP_HAVA = 1.2 * 1.005; // kJ/m³K
const CP_SU = 4.186;

export const havaIsiticiBataryaSuDebisiInputSchema = z.object({
  havaDebisi_m3h: z.number().positive(),
  havaSicaklikArtisi_K: z.number().positive(),
  suGidis_C: z.number(),
  suDonus_C: z.number(),
});

export type HavaIsiticiBataryaSuDebisiInput = z.infer<typeof havaIsiticiBataryaSuDebisiInputSchema>;

export interface HavaIsiticiBataryaSuDebisiOutput {
  isitmaKapasitesi_kW: number;
}

function compute(input: HavaIsiticiBataryaSuDebisiInput): CalcResult<HavaIsiticiBataryaSuDebisiOutput> {
  const q = (input.havaDebisi_m3h / 3600) * RHO_CP_HAVA * input.havaSicaklikArtisi_K;
  const dtw = input.suGidis_C - input.suDonus_C;
  const standards = ["Enerji dengesi Q = ṁ·cp·ΔT (hava ve su tarafı)"];
  if (dtw <= 0) {
    return {
      value: { isitmaKapasitesi_kW: q },
      intermediates: { not: "Su gidiş sıcaklığı dönüşten yüksek olmalı" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Su sıcaklık farkı sıfır veya negatif." },
    };
  }
  const m = q / (CP_SU * dtw);
  return {
    value: { isitmaKapasitesi_kW: q },
    intermediates: {
      su_kutle_debisi_kgs: m,
      su_debisi_m3h: (m * 3600) / 1000,
      su_debisi_Ls: m,
      su_sicaklik_farki_K: dtw,
    },
    standardsUsed: standards,
  };
}

export const havaIsiticiBataryaSuDebisi: CalcModule<HavaIsiticiBataryaSuDebisiInput, HavaIsiticiBataryaSuDebisiOutput> = {
  id: "hava-isitici-batarya-su-debisi",
  title: "Hava Isıtıcı Batarya Kapasitesi ve Su Debisi",
  discipline: "mekanik",
  standards: [],
  inputSchema: havaIsiticiBataryaSuDebisiInputSchema,
  compute,
};
