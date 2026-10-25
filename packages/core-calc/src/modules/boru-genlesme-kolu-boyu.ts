import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isıl genleşmeyi yön değişimiyle (L dirsek / Z / U dönüşü) karşılayan dik kolun
// asgari boyu, kılavuzlu konsol (guided cantilever) yöntemi (M.W. Kellogg):
// ucu kılavuzlu konsol kiriş δ ötelendiğinde eğilme gerilmesi σ = 3·E·D·δ/L², yani
//   L = √(3·E·D·δ / SA).
// δ: kola dik gelen genleşme (Boru Termal Genleşme Payı modülünden), D: boru dış çapı,
// SA: izin verilen yer değiştirme gerilme aralığı (ASME B31.1/B31.3'ten, malzeme ve
// sıcaklığa göre). Yöntem dirsek esnekliğini ihmal ettiği için güvenli taraftadır.
export const boruGenlesmeKoluBoyuInputSchema = z.object({
  boruDisCapi_D_mm: z.number().positive(),
  genlesmeMiktari_delta_mm: z.number().positive(),
  elastisiteModulu_E_GPa: z.number().positive(),
  izinVerilenGerilme_SA_MPa: z.number().positive(),
  mevcutKolBoyu_m: z.number().min(0),
});

export type BoruGenlesmeKoluBoyuInput = z.infer<typeof boruGenlesmeKoluBoyuInputSchema>;

export interface BoruGenlesmeKoluBoyuOutput {
  gerekliKolBoyu_m: number;
}

function compute(input: BoruGenlesmeKoluBoyuInput): CalcResult<BoruGenlesmeKoluBoyuOutput> {
  const E = input.elastisiteModulu_E_GPa * 1000;
  const D = input.boruDisCapi_D_mm;
  const SA = input.izinVerilenGerilme_SA_MPa;
  const gerekli_mm = Math.sqrt((3 * E * D * input.genlesmeMiktari_delta_mm) / SA);
  const mevcut_mm = input.mevcutKolBoyu_m * 1000;
  const karsilanan_mm = mevcut_mm > 0 ? (SA * mevcut_mm ** 2) / (3 * E * D) : 0;
  const mevcutGerilme = mevcut_mm > 0 ? (3 * E * D * input.genlesmeMiktari_delta_mm) / mevcut_mm ** 2 : Infinity;

  const verdict: CalcResult<BoruGenlesmeKoluBoyuOutput>["verdict"] =
    mevcut_mm >= gerekli_mm
      ? {
          status: "uygun",
          note: `Mevcut kol ${input.mevcutKolBoyu_m} m ≥ gereken ${(gerekli_mm / 1000).toFixed(2)} m; kolda gerilme ${mevcutGerilme.toFixed(0)} MPa ≤ ${SA} MPa.`,
        }
      : {
          status: "uygunsuz",
          note: `Mevcut kol ${input.mevcutKolBoyu_m} m < gereken ${(gerekli_mm / 1000).toFixed(2)} m; bu kol en fazla ${karsilanan_mm.toFixed(1)} mm genleşme karşılar. Kolu uzatın, U dönüşü veya kompansatör ekleyin.`,
        };

  return {
    value: { gerekliKolBoyu_m: gerekli_mm / 1000 },
    intermediates: {
      gerekli_kol_boyu_mm: gerekli_mm,
      mevcut_kolun_karsiladigi_genlesme_mm: karsilanan_mm,
      mevcut_kolda_gerilme_MPa: mevcut_mm > 0 ? mevcutGerilme : "—",
    },
    standardsUsed: [],
    verdict,
  };
}

export const boruGenlesmeKoluBoyu: CalcModule<BoruGenlesmeKoluBoyuInput, BoruGenlesmeKoluBoyuOutput> = {
  id: "boru-genlesme-kolu-boyu",
  title: "Boru Genleşme Kolu Boyu (Kılavuzlu Konsol)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruGenlesmeKoluBoyuInputSchema,
  compute,
};
