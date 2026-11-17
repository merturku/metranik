import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ohm + Joule: iki büyüklükten (V, I, R, P) diğerleri. x1, x2 çift sırasındadır (örn. "VR": x1 = V, x2 = R).
export const evOhmYasasiGucInputSchema = z.object({
  cift: z.enum(["VI", "VR", "VP", "IR", "IP", "RP"]),
  x1: z.number().positive(),
  x2: z.number().positive(),
});

export type EvOhmYasasiGucInput = z.infer<typeof evOhmYasasiGucInputSchema>;

export interface EvOhmYasasiGucOutput {
  guc_W: number;
}

function compute(input: EvOhmYasasiGucInput): CalcResult<EvOhmYasasiGucOutput> {
  const { x1, x2 } = input;
  let V: number, I: number, R: number, P: number;
  switch (input.cift) {
    case "VI": V = x1; I = x2; R = V / I; P = V * I; break;
    case "VR": V = x1; R = x2; I = V / R; P = V * I; break;
    case "VP": V = x1; P = x2; I = P / V; R = V / I; break;
    case "IR": I = x1; R = x2; V = I * R; P = V * I; break;
    case "IP": I = x1; P = x2; V = P / I; R = V / I; break;
    case "RP": R = x1; P = x2; I = Math.sqrt(P / R); V = I * R; break;
  }
  return {
    value: { guc_W: P },
    intermediates: { gerilim_V: V, akim_A: I, direnc_ohm: R },
    standardsUsed: [],
  };
}

export const evOhmYasasiGuc: CalcModule<EvOhmYasasiGucInput, EvOhmYasasiGucOutput> = {
  id: "ev-ohm-yasasi-guc",
  title: "Ohm Yasası ve Elektriksel Güç Hesabı",
  discipline: "ev",
  standards: [],
  inputSchema: evOhmYasasiGucInputSchema,
  compute,
};
