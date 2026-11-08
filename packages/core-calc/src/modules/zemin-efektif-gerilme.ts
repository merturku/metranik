import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Zeminde belirli derinlikte düşey gerilmeler (yeraltı suyu dahil):
// σv = γ·min(z, zw) + γsat·max(z − zw, 0);  u = γw·max(z − zw, 0);  σ'v = σv − u  (Terzaghi efektif gerilme ilkesi).
// Tek homojen zemin; su tablasının üstü doğal birim hacim ağırlık γ, altı doygun γsat (kılcal yükselme ihmal).
// Taşıma gücü, oturma ve istinat modüllerinin σ'v girdisini üretir. γw = 9,81 kN/m³.
const GAMMA_W = 9.81;

export const zeminEfektifGerilmeInputSchema = z.object({
  derinlik_z_m: z.number().positive(),
  suTablasiDerinligi_zw_m: z.number().min(0),
  dogalBirimHacimAgirlik_kNm3: z.number().positive(),
  doygunBirimHacimAgirlik_kNm3: z.number().positive(),
});

export type ZeminEfektifGerilmeInput = z.infer<typeof zeminEfektifGerilmeInputSchema>;

export interface ZeminEfektifGerilmeOutput {
  efektifGerilme_kPa: number;
}

function compute(input: ZeminEfektifGerilmeInput): CalcResult<ZeminEfektifGerilmeOutput> {
  const { derinlik_z_m: z, suTablasiDerinligi_zw_m: zw } = input;
  const kuru = Math.min(z, zw);
  const islak = Math.max(z - zw, 0);
  const sigma = input.dogalBirimHacimAgirlik_kNm3 * kuru + input.doygunBirimHacimAgirlik_kNm3 * islak;
  const u = GAMMA_W * islak;
  return {
    value: { efektifGerilme_kPa: sigma - u },
    intermediates: {
      toplam_dusey_gerilme_kPa: sigma,
      bosluk_suyu_basinci_kPa: u,
      batik_bolge_kalinligi_m: islak,
      batik_birim_hacim_agirligi_kNm3: input.doygunBirimHacimAgirlik_kNm3 - GAMMA_W,
    },
    standardsUsed: ["Terzaghi efektif gerilme ilkesi"],
  };
}

export const zeminEfektifGerilme: CalcModule<ZeminEfektifGerilmeInput, ZeminEfektifGerilmeOutput> = {
  id: "zemin-efektif-gerilme",
  title: "Zemin Efektif Düşey Gerilme (Yeraltı Suyu Dahil)",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminEfektifGerilmeInputSchema,
  compute,
};
