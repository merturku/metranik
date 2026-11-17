import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pnömatik silindir: Vçevrim = (π d²/4)·s·k (k: çift etkili 2, tek etkili 1); serbest hava = Vçevrim·(pg + patm)/patm.
const P_ATM = 1.01325; // bar

export const pnomatikSilindirHavaTuketimiInputSchema = z.object({
  piston_mm: z.number().positive(),
  kurs_mm: z.number().positive(),
  devir_dk: z.number().positive(),
  basinc_barg: z.number().positive(),
  etki: z.enum(["cift", "tek"]),
});

export type PnomatikSilindirHavaTuketimiInput = z.infer<typeof pnomatikSilindirHavaTuketimiInputSchema>;

export interface PnomatikSilindirHavaTuketimiOutput {
  serbestHava_Ldk: number;
}

function compute(input: PnomatikSilindirHavaTuketimiInput): CalcResult<PnomatikSilindirHavaTuketimiOutput> {
  const k = input.etki === "cift" ? 2 : 1;
  const A = (Math.PI * Math.pow(input.piston_mm / 1000, 2)) / 4; // m²
  const Vcevrim = A * (input.kurs_mm / 1000) * k * 1000; // L
  const oran = (input.basinc_barg + P_ATM) / P_ATM;
  const serbestCevrim = Vcevrim * oran;
  return {
    value: { serbestHava_Ldk: serbestCevrim * input.devir_dk },
    intermediates: { cevrim_hacmi_L: Vcevrim, sikistirma_orani: oran, serbest_hava_cevrim_L: serbestCevrim },
    standardsUsed: ["Boyle yasası (izotermal sıkıştırma)"],
  };
}

export const pnomatikSilindirHavaTuketimi: CalcModule<PnomatikSilindirHavaTuketimiInput, PnomatikSilindirHavaTuketimiOutput> = {
  id: "pnomatik-silindir-hava-tuketimi",
  title: "Pnömatik Silindir Hava Tüketimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: pnomatikSilindirHavaTuketimiInputSchema,
  compute,
};
