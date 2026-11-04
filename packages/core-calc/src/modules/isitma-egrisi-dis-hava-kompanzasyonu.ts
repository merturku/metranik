import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıtma eğrisi (dış hava kompanzasyonu): radyatör üstel yasası Φ/ΦN = (ΔT/ΔTN)^n (EN 442).
// Yük oranı φ = (Ti − Te)/(Ti − Te,tas); ortalama su sıcaklığı Tm = Ti + ΔTN·φ^(1/n),
// sabit debide su farkı ΔTw = ΔTw,N·φ; gidiş = Tm + ΔTw/2, dönüş = Tm − ΔTw/2.
// ΔTN aritmetik ortalama: (Tg + Td)/2 − Ti.
export const isitmaEgrisiDisHavaKompanzasyonuInputSchema = z
  .object({
    icSicaklik_C: z.number(),
    tasarimDisSicaklik_C: z.number(),
    anlikDisSicaklik_C: z.number(),
    tasarimGidis_C: z.number(),
    tasarimDonus_C: z.number(),
    radyatorUssu: z.number().min(1).max(2),
  })
  .refine(
    (v) =>
      v.tasarimDisSicaklik_C < v.icSicaklik_C &&
      v.anlikDisSicaklik_C < v.icSicaklik_C &&
      v.tasarimDonus_C < v.tasarimGidis_C &&
      (v.tasarimGidis_C + v.tasarimDonus_C) / 2 > v.icSicaklik_C,
    { message: "Dış sıcaklıklar iç sıcaklıktan düşük, gidiş > dönüş > iç ortalama olmalı" },
  );

export type IsitmaEgrisiDisHavaKompanzasyonuInput = z.infer<typeof isitmaEgrisiDisHavaKompanzasyonuInputSchema>;

export interface IsitmaEgrisiDisHavaKompanzasyonuOutput {
  gidisSicakligi_C: number;
}

function compute(input: IsitmaEgrisiDisHavaKompanzasyonuInput): CalcResult<IsitmaEgrisiDisHavaKompanzasyonuOutput> {
  const dtN = (input.tasarimGidis_C + input.tasarimDonus_C) / 2 - input.icSicaklik_C;
  const dtwN = input.tasarimGidis_C - input.tasarimDonus_C;
  const phi = (input.icSicaklik_C - input.anlikDisSicaklik_C) / (input.icSicaklik_C - input.tasarimDisSicaklik_C);
  const tm = input.icSicaklik_C + dtN * Math.pow(phi, 1 / input.radyatorUssu);
  const dtw = dtwN * phi;
  return {
    value: { gidisSicakligi_C: tm + dtw / 2 },
    intermediates: {
      yuk_orani: phi,
      tasarim_ortalama_asiri_sicaklik_K: dtN,
      ortalama_su_sicakligi_C: tm,
      su_sicaklik_farki_K: dtw,
      donus_sicakligi_C: tm - dtw / 2,
    },
    standardsUsed: ["TS EN 442-2 (radyatör üstel yasası)"],
  };
}

export const isitmaEgrisiDisHavaKompanzasyonu: CalcModule<IsitmaEgrisiDisHavaKompanzasyonuInput, IsitmaEgrisiDisHavaKompanzasyonuOutput> = {
  id: "isitma-egrisi-dis-hava-kompanzasyonu",
  title: "Isıtma Eğrisi (Dış Hava Kompanzasyonu)",
  discipline: "mekanik",
  standards: ["TS EN 442-2"],
  inputSchema: isitmaEgrisiDisHavaKompanzasyonuInputSchema,
  compute,
};
