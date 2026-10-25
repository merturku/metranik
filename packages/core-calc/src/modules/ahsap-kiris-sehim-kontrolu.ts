import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit mesnetli, düzgün yayılı yüklü masif ahşap kirişte sehim, TS EN 1995-1-1 §2.2.3:
// uinst = 5·w·L⁴/(384·E0,mean·I),  I = b·h³/12;
// sünme ile nihai sehim: ufin,G = uinst,G·(1 + kdef),  ufin,Q = uinst,Q·(1 + ψ2·kdef).
// E0,mean TS EN 338 (C16 8000, C24 11 000, C30 12 000 MPa); kdef Tablo 3.2 (masif ahşap,
// servis sınıfı 1: 0,60; 2: 0,80; 3: 2,00); ψ2 TS EN 1990 (konut kullanım yükü 0,3).
// Sınırlar §7.2 Tablo 7.2'nin önerdiği aralıklardan kullanıcı seçer (winst L/300–L/500,
// wfin L/150–L/300). Kayma deformasyonu ihmal edilmiştir (L/h > 15 için küçüktür).
const E0MEAN: Record<"C16" | "C24" | "C30", number> = { C16: 8000, C24: 11000, C30: 12000 };
const KDEF: Record<"1" | "2" | "3", number> = { "1": 0.6, "2": 0.8, "3": 2.0 };

export const ahsapKirisSehimKontroluInputSchema = z.object({
  dayanimSinifi: z.enum(["C16", "C24", "C30"]),
  genislik_b_mm: z.number().positive(),
  yukseklik_h_mm: z.number().positive(),
  aciklik_L_m: z.number().positive(),
  kaliciYuk_gk_kNm: z.number().min(0),
  hareketliYuk_qk_kNm: z.number().min(0),
  yariKaliciKatsayi_psi2: z.number().min(0).max(1),
  servisSinifi: z.enum(["1", "2", "3"]),
  anlikSinirPaydasi: z.number().positive(),
  nihaiSinirPaydasi: z.number().positive(),
});

export type AhsapKirisSehimKontroluInput = z.infer<typeof ahsapKirisSehimKontroluInputSchema>;

export interface AhsapKirisSehimKontroluOutput {
  nihaiSehim_mm: number;
}

function compute(input: AhsapKirisSehimKontroluInput): CalcResult<AhsapKirisSehimKontroluOutput> {
  const E = E0MEAN[input.dayanimSinifi];
  const kdef = KDEF[input.servisSinifi];
  const I = (input.genislik_b_mm * input.yukseklik_h_mm ** 3) / 12;
  const L = input.aciklik_L_m * 1000;
  const sehim = (w_kNm: number) => (5 * w_kNm * L ** 4) / (384 * E * I);
  const uG = sehim(input.kaliciYuk_gk_kNm);
  const uQ = sehim(input.hareketliYuk_qk_kNm);
  const anlik = uG + uQ;
  const nihai = uG * (1 + kdef) + uQ * (1 + input.yariKaliciKatsayi_psi2 * kdef);
  const anlikSinir = L / input.anlikSinirPaydasi;
  const nihaiSinir = L / input.nihaiSinirPaydasi;

  const verdict: CalcResult<AhsapKirisSehimKontroluOutput>["verdict"] =
    anlik <= anlikSinir && nihai <= nihaiSinir
      ? {
          status: "uygun",
          note: `winst = ${anlik.toFixed(1)} ≤ L/${input.anlikSinirPaydasi} = ${anlikSinir.toFixed(1)} mm; wfin = ${nihai.toFixed(1)} ≤ L/${input.nihaiSinirPaydasi} = ${nihaiSinir.toFixed(1)} mm.`,
        }
      : {
          status: "uygunsuz",
          note: `${anlik > anlikSinir ? `winst = ${anlik.toFixed(1)} > ${anlikSinir.toFixed(1)} mm` : `wfin = ${nihai.toFixed(1)} > ${nihaiSinir.toFixed(1)} mm`}: kesit yüksekliğini artırın (sehim h³ ile azalır) veya açıklığı kısaltın.`,
        };

  return {
    value: { nihaiSehim_mm: nihai },
    intermediates: {
      elastisite_modulu_E0mean_MPa: E,
      atalet_momenti_I_cm4: I / 1e4,
      kalici_yuk_anlik_sehimi_mm: uG,
      hareketli_yuk_anlik_sehimi_mm: uQ,
      toplam_anlik_sehim_mm: anlik,
      sunme_katsayisi_kdef: kdef,
      anlik_sehim_siniri_mm: anlikSinir,
      nihai_sehim_siniri_mm: nihaiSinir,
    },
    standardsUsed: ["TS EN 1995-1-1", "TS EN 338"],
    verdict,
  };
}

export const ahsapKirisSehimKontrolu: CalcModule<AhsapKirisSehimKontroluInput, AhsapKirisSehimKontroluOutput> = {
  id: "ahsap-kiris-sehim-kontrolu",
  title: "Ahşap Kiriş Sehim Kontrolü (Sünme Dahil)",
  discipline: "insaat",
  standards: ["TS EN 1995-1-1", "TS EN 338"],
  inputSchema: ahsapKirisSehimKontroluInputSchema,
  compute,
};
