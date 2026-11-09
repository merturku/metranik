import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Silindirik (boru/kablo) yalıtımda kritik yarıçap: r_kr = λ/h_dış. r1 < r_kr ise yalıtım kalınlığı r_kr'ye kadar ısı kaybını ARTIRIR
// (maksimum r2 = r_kr'de), r2 ≥ r_eq'ya ulaşınca çıplak boruyla eşitlenir; ancak bundan sonra azalır.
// Boyca ısı akısı q' = ΔT/[ln(r2/r1)/(2πλ) + 1/(2π·r2·h)];  çıplak q'0 = 2π·r1·h·ΔT.  Eşitlik yarıçapı r_eq: ln(r/r1)/λ = (1/h)(1/r1 − 1/r) çözülür (ikiye bölme).
// Küçük çaplı borularda (≲ 10 mm) ve düşük λ yalıtımda dikkat gerektirir; sıcak su/buhar hatlarında r1 genellikle r_kr'den büyüktür. h radyasyon dahil dış katsayıdır.
export const kritikYalitimYaricapiInputSchema = z.object({
  boruDisYaricapi_r1_mm: z.number().positive(),
  yalitimIletkenligi_lambda_WmK: z.number().positive(),
  disTasinimKatsayisi_h_Wm2K: z.number().positive(),
  yalitimDisYaricapi_r2_mm: z.number().positive(),
  sicaklikFarki_K: z.number().positive(),
});

export type KritikYalitimYaricapiInput = z.infer<typeof kritikYalitimYaricapiInputSchema>;

export interface KritikYalitimYaricapiOutput {
  kritikYaricap_mm: number;
}

function qIns(r1: number, r2: number, k: number, h: number, dt: number): number {
  return dt / (Math.log(r2 / r1) / (2 * Math.PI * k) + 1 / (2 * Math.PI * r2 * h));
}

function compute(input: KritikYalitimYaricapiInput): CalcResult<KritikYalitimYaricapiOutput> {
  const r1 = input.boruDisYaricapi_r1_mm / 1000;
  const r2 = input.yalitimDisYaricapi_r2_mm / 1000;
  const k = input.yalitimIletkenligi_lambda_WmK;
  const h = input.disTasinimKatsayisi_h_Wm2K;
  const dt = input.sicaklikFarki_K;
  const rkr = k / h;
  const qBos = 2 * Math.PI * r1 * h * dt;
  const standards = ["Silindirik yalıtımda kritik yarıçap (Incropera)"];
  if (r2 <= r1) {
    return { value: { kritikYaricap_mm: rkr * 1000 }, intermediates: { not: "Yalıtım dış yarıçapı boru yarıçapından büyük olmalı" }, standardsUsed: standards, verdict: { status: "uygunsuz", note: "r2 > r1 olmalıdır." } };
  }
  const q = qIns(r1, r2, k, h, dt);
  let rEq: number | null = null;
  if (r1 < rkr) {
    let lo = rkr;
    let hi = rkr * 1000;
    const f = (r: number) => qIns(r1, r, k, h, dt) - qBos;
    for (let i = 0; i < 200; i++) {
      const mid = (lo + hi) / 2;
      if (f(mid) > 0) lo = mid; else hi = mid;
    }
    rEq = (lo + hi) / 2;
  }
  const arttirir = r1 < rkr && r2 < (rEq ?? 0);
  return {
    value: { kritikYaricap_mm: rkr * 1000 },
    intermediates: {
      ciplak_isi_kaybi_Wm: qBos,
      yalitimli_isi_kaybi_Wm: q,
      kayip_azalmasi_yuzde: (1 - q / qBos) * 100,
      esitlik_yaricapi_mm: rEq !== null ? rEq * 1000 : "— (r1 ≥ r_kr: yalıtım her zaman kaybı azaltır)",
      yalitim_kalinligi_mm: (r2 - r1) * 1000,
    },
    standardsUsed: standards,
    verdict: arttirir
      ? { status: "uygunsuz", note: "Bu kalınlıkta yalıtım ısı kaybını çıplak boruya göre ARTIRIYOR (r1 < r_kr). Daha kalın yalıtım veya yalıtımsız bırakma değerlendirilmeli." }
      : { status: "uygun", note: "Yalıtım ısı kaybını çıplak boruya göre azaltıyor." },
  };
}

export const kritikYalitimYaricapi: CalcModule<KritikYalitimYaricapiInput, KritikYalitimYaricapiOutput> = {
  id: "kritik-yalitim-yaricapi",
  title: "Kritik Yalıtım Yarıçapı (Silindirik)",
  discipline: "mekanik",
  standards: [],
  inputSchema: kritikYalitimYaricapiInputSchema,
  compute,
};
