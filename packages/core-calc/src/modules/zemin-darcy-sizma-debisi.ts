import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Darcy yasası ile zeminde sızma: Q = k·i·A,  i = Δh/L (hidrolik gradyan); Darcy (görünür) hızı v = k·i, gerçek sızma hızı v_s = v/n (n gözeneklilik).
// k doygun hidrolik iletkenlik (kum ≈ 10⁻⁵–10⁻³ m/s, silt ≈ 10⁻⁸–10⁻⁶, kil ≈ 10⁻¹⁰ m/s; laboratuvar/arazi deneyi esastır). Kritik gradyan i_kr ≈ (G_s − 1)/(1 + e)
// (≈ 1) ile çıkış gradyanı karşılaştırılarak kaynama (boru oluşumu) güvenliği FS = i_kr/i kontrol edilir; FS ≥ 3–5 tipik istenir (proje şartnamesinden teyit edin).
export const zeminDarcySizmaDebisiInputSchema = z.object({
  hidrolikIletkenlik_k_ms: z.number().positive(),
  yuksekFarki_dh_m: z.number().positive(),
  sizmaYolu_L_m: z.number().positive(),
  kesitAlani_A_m2: z.number().positive(),
  gozeneklilik_n: z.number().gt(0).lt(1),
  ozgulAgirlik_Gs: z.number().min(2).max(3.2),
});

export type ZeminDarcySizmaDebisiInput = z.infer<typeof zeminDarcySizmaDebisiInputSchema>;

export interface ZeminDarcySizmaDebisiOutput {
  sizmaDebisi_m3s: number;
}

function compute(input: ZeminDarcySizmaDebisiInput): CalcResult<ZeminDarcySizmaDebisiOutput> {
  const i = input.yuksekFarki_dh_m / input.sizmaYolu_L_m;
  const v = input.hidrolikIletkenlik_k_ms * i;
  const q = v * input.kesitAlani_A_m2;
  const e = input.gozeneklilik_n / (1 - input.gozeneklilik_n);
  const ikr = (input.ozgulAgirlik_Gs - 1) / (1 + e);
  const fs = ikr / i;
  return {
    value: { sizmaDebisi_m3s: q },
    intermediates: {
      hidrolik_gradyan_i: i,
      darcy_hizi_ms: v,
      sizma_hizi_ms: v / input.gozeneklilik_n,
      debi_m3h: q * 3600,
      debi_Lgun: q * 86400 * 1000,
      kritik_gradyan_ikr: ikr,
      kaynama_guvenligi_FS: fs,
    },
    standardsUsed: ["Darcy yasası; kritik gradyan (Terzaghi) — FS eşiği şartnameden teyit edilmeli"],
    verdict: fs >= 3 ? { status: "uygun", note: "Çıkış gradyanı kritik gradyana göre yeterli güvenlikte (FS ≥ 3)." } : fs >= 1.5 ? { status: "sinirda", note: "Kaynama güvenliği düşük (1,5 ≤ FS < 3); filtre/uzatılmış sızma yolu düşünün." } : { status: "uygunsuz", note: "Kaynama (boru oluşumu) riski: FS < 1,5." },
  };
}

export const zeminDarcySizmaDebisi: CalcModule<ZeminDarcySizmaDebisiInput, ZeminDarcySizmaDebisiOutput> = {
  id: "zemin-darcy-sizma-debisi",
  title: "Zeminde Darcy Sızma Debisi ve Kaynama Güvenliği",
  discipline: "insaat",
  standards: [],
  inputSchema: zeminDarcySizmaDebisiInputSchema,
  compute,
};
