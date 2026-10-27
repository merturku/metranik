import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kapalı havuzda yüzey buharlaşması (ASHRAE HVAC Applications, Natatoriums):
// wp = 4,0·10⁻⁵·A·(pw − pa)·Fa  [kg/s; A m², p kPa]
// pw: su sıcaklığında doyma basıncı, pa: havadaki buhar basıncı = φ·psat(ta).
// Fa aktivite katsayısı: kullanılmayan havuz 0,5, kullanılan 1,0, dalga/kaydırak ≥ 1,5.
// psat (TS EN ISO 13788 Ek E, θ ≥ 0): 610,5·exp(17,269·θ/(237,3 + θ)) Pa.
// Gizli ısı: hfg ≈ 2501 − 2,361·t kJ/kg (doymuş su buhar tablolarına doğrusal yaklaşım).
export const havuzBuharlasmaIsiKaybiInputSchema = z.object({
  havuzAlani_m2: z.number().positive(),
  suSicakligi_C: z.number().min(0).max(45),
  havaSicakligi_C: z.number().min(0).max(45),
  bagilNem_yuzde: z.number().min(0).max(100),
  aktiviteKatsayisi_Fa: z.number().positive(),
});

export type HavuzBuharlasmaIsiKaybiInput = z.infer<typeof havuzBuharlasmaIsiKaybiInputSchema>;

export interface HavuzBuharlasmaIsiKaybiOutput {
  buharlasma_kgh: number;
}

function doymaBasinci_kPa(t: number): number {
  return (610.5 * Math.exp((17.269 * t) / (237.3 + t))) / 1000;
}

function compute(input: HavuzBuharlasmaIsiKaybiInput): CalcResult<HavuzBuharlasmaIsiKaybiOutput> {
  const pw = doymaBasinci_kPa(input.suSicakligi_C);
  const pa = (input.bagilNem_yuzde / 100) * doymaBasinci_kPa(input.havaSicakligi_C);
  const wp = Math.max(0, 4.0e-5 * input.havuzAlani_m2 * (pw - pa) * input.aktiviteKatsayisi_Fa);
  const hfg = 2501 - 2.361 * input.suSicakligi_C;

  return {
    value: { buharlasma_kgh: wp * 3600 },
    intermediates: {
      su_yuzeyi_doyma_basinci_pw_kPa: pw,
      havadaki_buhar_basinci_pa_kPa: pa,
      basinc_farki_kPa: pw - pa,
      buharlasma_kgs: wp,
      buharlasma_gizli_isisi_hfg_kJkg: hfg,
      buharlasma_isi_kaybi_kW: wp * hfg,
      gunluk_su_kaybi_L: wp * 86400,
    },
    standardsUsed: ["ASHRAE HVAC Applications", "TS EN ISO 13788"],
  };
}

export const havuzBuharlasmaIsiKaybi: CalcModule<HavuzBuharlasmaIsiKaybiInput, HavuzBuharlasmaIsiKaybiOutput> = {
  id: "havuz-buharlasma-isi-kaybi",
  title: "Kapalı Havuz Buharlaşma ve Isı Kaybı",
  discipline: "ev",
  standards: ["ASHRAE HVAC Applications", "TS EN ISO 13788"],
  inputSchema: havuzBuharlasmaIsiKaybiInputSchema,
  compute,
};
