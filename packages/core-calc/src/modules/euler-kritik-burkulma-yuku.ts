import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Euler kritik burkulma yükü (ideal, merkezi basınç, elastik): Ncr = π²·E·I/(Lk)²,  Lk = k·L (etkin boy).
// Kritik gerilme σcr = Ncr/A, narinlik λ = Lk/i (i = √(I/A)). Etkin boy katsayısı k: iki ucu mafsallı 1,0; ankastre–serbest 2,0;
// ankastre–mafsallı 0,7; iki ucu ankastre 0,5. Bu ideal elastik değerdir; gerçek kolonlarda geometrik kusur, artık gerilme ve
// akma sınırı ayrıca dikkate alınır (bkz. Çelik Basınç Elemanı Burkulma Dayanımı); σcr > fy ise Euler geçerli değildir (λ küçük).
export const eulerKritikBurkulmaYukuInputSchema = z.object({
  elastisiteModulu_GPa: z.number().positive(),
  atalet_mm4: z.number().positive(),
  alan_mm2: z.number().positive(),
  boy_m: z.number().positive(),
  boyKatsayisi_k: z.number().positive().max(3),
  akmaDayanimi_MPa: z.number().positive(),
});

export type EulerKritikBurkulmaYukuInput = z.infer<typeof eulerKritikBurkulmaYukuInputSchema>;

export interface EulerKritikBurkulmaYukuOutput {
  kritikYuk_kN: number;
}

function compute(input: EulerKritikBurkulmaYukuInput): CalcResult<EulerKritikBurkulmaYukuOutput> {
  const E = input.elastisiteModulu_GPa * 1000; // MPa
  const lk = input.boyKatsayisi_k * input.boy_m * 1000; // mm
  const ncr = (Math.PI ** 2 * E * input.atalet_mm4) / (lk * lk); // N
  const sigma = ncr / input.alan_mm2;
  const i = Math.sqrt(input.atalet_mm4 / input.alan_mm2);
  const lambda = lk / i;
  const lambdaLimit = Math.PI * Math.sqrt(E / input.akmaDayanimi_MPa);
  return {
    value: { kritikYuk_kN: ncr / 1000 },
    intermediates: {
      etkin_boy_mm: lk,
      atalet_yaricapi_mm: i,
      narinlik_lambda: lambda,
      kritik_gerilme_MPa: sigma,
      euler_gecerlilik_siniri_lambda: lambdaLimit,
      euler_gecerli_mi: sigma <= input.akmaDayanimi_MPa ? "evet (elastik burkulma)" : "hayır (σcr > fy, akma kontrol eder)",
    },
    standardsUsed: ["Euler kolon burkulma teorisi"],
  };
}

export const eulerKritikBurkulmaYuku: CalcModule<EulerKritikBurkulmaYukuInput, EulerKritikBurkulmaYukuOutput> = {
  id: "euler-kritik-burkulma-yuku",
  title: "Euler Kritik Burkulma Yükü ve Narinlik",
  discipline: "insaat",
  standards: [],
  inputSchema: eulerKritikBurkulmaYukuInputSchema,
  compute,
};
