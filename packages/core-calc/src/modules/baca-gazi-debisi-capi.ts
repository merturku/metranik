import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Metan yanması: stokiyometrik hava = 2/0,21 = 9,524 Nm³/Nm³; yaş baca gazı = CO2 (1) + H2O (2) + N2 (0,79·9,524) + (λ−1)·9,524.
const HAVA_STOK = 2 / 0.21;

export const bacaGaziDebisiCapiInputSchema = z.object({
  yakitGucu_kW: z.number().positive(),
  hu_kWhNm3: z.number().positive(),
  fazlaHava: z.number().min(1),
  bacaSicakligi_C: z.number().min(0),
  hiz_ms: z.number().positive(),
});

export type BacaGaziDebisiCapiInput = z.infer<typeof bacaGaziDebisiCapiInputSchema>;

export interface BacaGaziDebisiCapiOutput {
  bacaCapi_mm: number;
}

function compute(input: BacaGaziDebisiCapiInput): CalcResult<BacaGaziDebisiCapiOutput> {
  const gazOrani = 1 + 2 + HAVA_STOK * 0.79 + (input.fazlaHava - 1) * HAVA_STOK;
  const yakitNm3h = input.yakitGucu_kW / input.hu_kWhNm3;
  const gazNm3h = yakitNm3h * gazOrani;
  const gazM3s = ((gazNm3h * (input.bacaSicakligi_C + 273.15)) / 273.15) / 3600;
  const A = gazM3s / input.hiz_ms;
  const D = Math.sqrt((4 * A) / Math.PI);
  return {
    value: { bacaCapi_mm: D * 1000 },
    intermediates: { baca_gazi_Nm3h: gazNm3h, baca_gazi_m3s: gazM3s, kesit_alani_m2: A, gaz_Nm3_per_Nm3: gazOrani },
    standardsUsed: ["Stokiyometrik yanma / süreklilik denklemi"],
  };
}

export const bacaGaziDebisiCapi: CalcModule<BacaGaziDebisiCapiInput, BacaGaziDebisiCapiOutput> = {
  id: "baca-gazi-debisi-capi",
  title: "Baca Gazı Debisi ve Baca İç Çapı (Doğalgaz)",
  discipline: "mekanik",
  standards: [],
  inputSchema: bacaGaziDebisiCapiInputSchema,
  compute,
};
