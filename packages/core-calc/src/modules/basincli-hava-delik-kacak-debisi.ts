import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Delikten hava kaçağı (ideal gaz, izentropik orifis): p0/pa ≥ ((γ+1)/2)^(γ/(γ−1)) = 1,893 → tıkanmış akış.
const GAMMA = 1.4;
const R = 287; // J/kgK
const T0 = 293.15; // K
const PA = 101325; // Pa
const RHO_FAD = PA / (R * T0); // kg/m³ (20 °C, 1 atm)

export const basincliHavaDelikKacakDebisiInputSchema = z.object({
  delikCapi_mm: z.number().positive(),
  hatBasinci_barg: z.number().positive(),
  cd: z.number().positive().max(1),
  ozgulEnerji_kWhm3: z.number().positive(),
  yillikSaat_h: z.number().positive(),
  elektrikFiyati: z.number().min(0),
});

export type BasincliHavaDelikKacakDebisiInput = z.infer<typeof basincliHavaDelikKacakDebisiInputSchema>;

export interface BasincliHavaDelikKacakDebisiOutput {
  kacakDebisi_m3dk: number;
}

function compute(input: BasincliHavaDelikKacakDebisiInput): CalcResult<BasincliHavaDelikKacakDebisiOutput> {
  const A = (Math.PI * Math.pow(input.delikCapi_mm / 1000, 2)) / 4;
  const p0 = input.hatBasinci_barg * 1e5 + PA;
  const pr = PA / p0;
  const kritik = Math.pow(2 / (GAMMA + 1), GAMMA / (GAMMA - 1));
  let m: number;
  let rejim: string;
  if (pr <= kritik) {
    m = input.cd * A * p0 * Math.sqrt(GAMMA / (R * T0)) * Math.pow(2 / (GAMMA + 1), (GAMMA + 1) / (2 * (GAMMA - 1)));
    rejim = "Tıkanmış (sesüstü)";
  } else {
    m =
      input.cd * A * p0 *
      Math.sqrt(((2 * GAMMA) / ((GAMMA - 1) * R * T0)) * (Math.pow(pr, 2 / GAMMA) - Math.pow(pr, (GAMMA + 1) / GAMMA)));
    rejim = "Alt-kritik";
  }
  const Qm3dk = (m / RHO_FAD) * 60;
  const kWh = Qm3dk * 60 * input.yillikSaat_h * input.ozgulEnerji_kWhm3;
  return {
    value: { kacakDebisi_m3dk: Qm3dk },
    intermediates: {
      kutlesel_debi_kgs: m,
      akis_rejimi: rejim,
      yillik_enerji_kWh: kWh,
      yillik_maliyet: kWh * input.elektrikFiyati,
    },
    standardsUsed: ["ISO 6358 (orifis akışı)"],
  };
}

export const basincliHavaDelikKacakDebisi: CalcModule<BasincliHavaDelikKacakDebisiInput, BasincliHavaDelikKacakDebisiOutput> = {
  id: "basincli-hava-delik-kacak-debisi",
  title: "Basınçlı Hava Delik Kaçak Debisi ve Maliyeti",
  discipline: "mekanik",
  standards: ["ISO 6358 (orifis akışı)"],
  inputSchema: basincliHavaDelikKacakDebisiInputSchema,
  compute,
};
