import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Seri RLC devresi: XL = 2πfL, XC = 1/(2πfC), Z = √(R² + (XL − XC)²), I = V/Z, φ = atan((XL − XC)/R), f0 = 1/(2π√(LC)), Q = (1/R)√(L/C).
// Klasik devre analizi (sinüsoidal kalıcı durum, ideal elemanlar). Birimler: R Ω, L mH, C µF, f Hz, V volt.
export const rlcSeriEmpedansRezonansInputSchema = z.object({
  direnc_ohm: z.number().positive(),
  enduktans_mH: z.number().positive(),
  kapasitans_uF: z.number().positive(),
  frekans_Hz: z.number().positive(),
  gerilim_V: z.number().positive(),
});

export type RlcSeriEmpedansRezonansInput = z.infer<typeof rlcSeriEmpedansRezonansInputSchema>;

export interface RlcSeriEmpedansRezonansOutput {
  empedans_ohm: number;
}

function compute(input: RlcSeriEmpedansRezonansInput): CalcResult<RlcSeriEmpedansRezonansOutput> {
  const L = input.enduktans_mH * 1e-3;
  const C = input.kapasitans_uF * 1e-6;
  const w = 2 * Math.PI * input.frekans_Hz;
  const xl = w * L;
  const xc = 1 / (w * C);
  const x = xl - xc;
  const z = Math.hypot(input.direnc_ohm, x);
  const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
  return {
    value: { empedans_ohm: z },
    intermediates: {
      enduktif_reaktans_ohm: xl,
      kapasitif_reaktans_ohm: xc,
      net_reaktans_ohm: x,
      akim_A: input.gerilim_V / z,
      faz_acisi_derece: (Math.atan2(x, input.direnc_ohm) * 180) / Math.PI,
      guc_faktoru: input.direnc_ohm / z,
      rezonans_frekansi_Hz: f0,
      kalite_faktoru_Q: Math.sqrt(L / C) / input.direnc_ohm,
      karakter: x > 0 ? "Endüktif" : x < 0 ? "Kapasitif" : "Rezonans",
    },
    standardsUsed: ["Seri RLC devre analizi"],
  };
}

export const rlcSeriEmpedansRezonans: CalcModule<RlcSeriEmpedansRezonansInput, RlcSeriEmpedansRezonansOutput> = {
  id: "rlc-seri-empedans-rezonans",
  title: "Seri RLC Empedansı ve Rezonans Frekansı",
  discipline: "elektrik",
  standards: [],
  inputSchema: rlcSeriEmpedansRezonansInputSchema,
  compute,
};
