import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Dikdörtgen kesitli masif ahşap kirişte eğilme kontrolü (TS EN 1995-1-1):
// σm,d = MEd/W, W = b·h²/6;  fm,d = kmod·kh·fm,k/γM  (§2.4.1, §6.1.6).
// fm,k: TS EN 338 dayanım sınıfı (C16 16, C24 24, C30 30 MPa).
// kmod Tablo 3.1 (masif ahşap): servis sınıfı 1–2 → kalıcı 0,60 / uzun 0,70 / orta 0,80 /
// kısa 0,90 / ani 1,10; servis sınıfı 3 → 0,50 / 0,55 / 0,65 / 0,70 / 0,90.
// kh (§3.2): h < 150 mm ise min((150/h)^0,2; 1,3). γM = 1,3 (masif ahşap, Tablo 2.3).
const FMK: Record<"C16" | "C24" | "C30", number> = { C16: 16, C24: 24, C30: 30 };
const KMOD: Record<"1-2" | "3", Record<"kalici" | "uzun" | "orta" | "kisa" | "ani", number>> = {
  "1-2": { kalici: 0.6, uzun: 0.7, orta: 0.8, kisa: 0.9, ani: 1.1 },
  "3": { kalici: 0.5, uzun: 0.55, orta: 0.65, kisa: 0.7, ani: 0.9 },
};

export const ahsapKirisEgilmeKontroluInputSchema = z.object({
  dayanimSinifi: z.enum(["C16", "C24", "C30"]),
  genislik_b_mm: z.number().positive(),
  yukseklik_h_mm: z.number().positive(),
  tasarimMomenti_MEd_kNm: z.number().min(0),
  yukSuresi: z.enum(["kalici", "uzun", "orta", "kisa", "ani"]),
  servisSinifi: z.enum(["1-2", "3"]),
  gammaM: z.number().positive(),
});

export type AhsapKirisEgilmeKontroluInput = z.infer<typeof ahsapKirisEgilmeKontroluInputSchema>;

export interface AhsapKirisEgilmeKontroluOutput {
  egilmeGerilmesi_MPa: number;
}

function compute(input: AhsapKirisEgilmeKontroluInput): CalcResult<AhsapKirisEgilmeKontroluOutput> {
  const fmk = FMK[input.dayanimSinifi];
  const kmod = KMOD[input.servisSinifi][input.yukSuresi];
  const b = input.genislik_b_mm;
  const h = input.yukseklik_h_mm;
  const kh = h < 150 ? Math.min((150 / h) ** 0.2, 1.3) : 1;
  const fmd = (kmod * kh * fmk) / input.gammaM;
  const W = (b * h * h) / 6;
  const sigma = (input.tasarimMomenti_MEd_kNm * 1e6) / W;
  const kullanim = sigma / fmd;
  const gerekliH = Math.sqrt((6 * input.tasarimMomenti_MEd_kNm * 1e6) / (b * ((kmod * fmk) / input.gammaM)));

  const verdict: CalcResult<AhsapKirisEgilmeKontroluOutput>["verdict"] =
    kullanim <= 1
      ? {
          status: "uygun",
          note: `σm,d = ${sigma.toFixed(2)} MPa ≤ fm,d = ${fmd.toFixed(2)} MPa (kullanım %${(kullanim * 100).toFixed(0)}).`,
        }
      : {
          status: "uygunsuz",
          note: `σm,d = ${sigma.toFixed(2)} MPa > fm,d = ${fmd.toFixed(2)} MPa: kesit yüksekliğini artırın (b = ${b} mm için h ≥ ${gerekliH.toFixed(0)} mm) veya daha yüksek sınıf seçin.`,
        };

  return {
    value: { egilmeGerilmesi_MPa: sigma },
    intermediates: {
      karakteristik_egilme_dayanimi_fmk_MPa: fmk,
      kmod,
      boyut_katsayisi_kh: kh,
      tasarim_egilme_dayanimi_fmd_MPa: fmd,
      mukavemet_momenti_W_cm3: W / 1000,
      kullanim_orani: kullanim,
      gerekli_yukseklik_kh1_mm: gerekliH,
    },
    standardsUsed: ["TS EN 1995-1-1", "TS EN 338"],
    verdict,
  };
}

export const ahsapKirisEgilmeKontrolu: CalcModule<AhsapKirisEgilmeKontroluInput, AhsapKirisEgilmeKontroluOutput> = {
  id: "ahsap-kiris-egilme-kontrolu",
  title: "Ahşap Kiriş Eğilme Kontrolü",
  discipline: "insaat",
  standards: ["TS EN 1995-1-1", "TS EN 338"],
  inputSchema: ahsapKirisEgilmeKontroluInputSchema,
  compute,
};
