import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Reynolds sayısı ile boru içi akış rejimi belirlenir: Re = ρ×v×D / μ.
// ρ: akışkan yoğunluğu (kg/m³), v: akış hızı (m/s), D: boru iç çapı (m),
// μ: dinamik viskozite (Pa·s). Klasik sınırlar: Re<2300 laminer,
// 2300≤Re≤4000 geçiş bölgesi, Re>4000 türbülanslı (bir "uygun/uygunsuz"
// durumu değil, sürtünme kaybı hesabında hangi korelasyonun kullanılacağını
// belirleyen bir sınıflandırmadır).
export const boruAkisRejimiKontroluInputSchema = z.object({
  yogunluk_rho_kgm3: z.number().positive(),
  akisHizi_v_ms: z.number().positive(),
  boruIcCapi_D_m: z.number().positive(),
  dinamikViskozite_mu_Pas: z.number().positive(),
});

export type BoruAkisRejimiKontroluInput = z.infer<
  typeof boruAkisRejimiKontroluInputSchema
>;

export interface BoruAkisRejimiKontroluOutput {
  reynoldsSayisi_Re: number;
  akisRejimi: "laminer" | "gecis" | "turbulansli";
}

function compute(
  input: BoruAkisRejimiKontroluInput,
): CalcResult<BoruAkisRejimiKontroluOutput> {
  const reynoldsSayisi_Re =
    (input.yogunluk_rho_kgm3 * input.akisHizi_v_ms * input.boruIcCapi_D_m) /
    input.dinamikViskozite_mu_Pas;

  let akisRejimi: "laminer" | "gecis" | "turbulansli";
  if (reynoldsSayisi_Re < 2300) {
    akisRejimi = "laminer";
  } else if (reynoldsSayisi_Re <= 4000) {
    akisRejimi = "gecis";
  } else {
    akisRejimi = "turbulansli";
  }

  return {
    value: { reynoldsSayisi_Re, akisRejimi },
    intermediates: {
      dinamikViskozite_mu_Pas: input.dinamikViskozite_mu_Pas,
      akisRejimi,
    },
    standardsUsed: [],
  };
}

export const boruAkisRejimiKontrolu: CalcModule<
  BoruAkisRejimiKontroluInput,
  BoruAkisRejimiKontroluOutput
> = {
  id: "boru-akis-rejimi-kontrolu",
  title: "Boru Akış Rejimi (Reynolds Sayısı)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruAkisRejimiKontroluInputSchema,
  compute,
};
