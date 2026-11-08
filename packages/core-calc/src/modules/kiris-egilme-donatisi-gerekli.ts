import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// TS 500 dikdörtgen kesit, tek donatılı kiriş: verilen tasarım momenti Md için gerekli çekme donatısı
// (Kiriş Boyutlandırma'nın moment kapasitesi hesabının ters yönü). Dikdörtgen gerilme bloku:
// 0,85·fcd·b·a = As·fyd,  Md = As·fyd·(d − a/2)  →  K·As² − fyd·d·As + Md = 0,  K = fyd²/(1,7·fcd·b).
// γc = 1,5, γs = 1,15. Sınırlar Kiriş Donatı Oranı modülüyle aynı: ρmin = 0,8·fctd/fyd,
// ρ ≤ 0,02 ve ρ ≤ 0,85·ρb (ρb = 0,85·k1·fcd/fyd·600/(600+fyd), k1 = 0,85 − 0,006·(fck−25), 0,70–0,85).
const GAMMA_C = 1.5;
const GAMMA_S = 1.15;

export const kirisEgilmeDonatisiGerekliInputSchema = z.object({
  tasarimMomenti_kNm: z.number().positive(),
  genislik_b_mm: z.number().positive(),
  faydaliYukseklik_d_mm: z.number().positive(),
  fck_MPa: z.number().positive(),
  fyk_MPa: z.number().positive(),
});

export type KirisEgilmeDonatisiGerekliInput = z.infer<typeof kirisEgilmeDonatisiGerekliInputSchema>;

export interface KirisEgilmeDonatisiGerekliOutput {
  gerekliAs_mm2: number | null;
}

function compute(input: KirisEgilmeDonatisiGerekliInput): CalcResult<KirisEgilmeDonatisiGerekliOutput> {
  const { genislik_b_mm: b, faydaliYukseklik_d_mm: d, fck_MPa: fck, fyk_MPa: fyk } = input;
  const Md = input.tasarimMomenti_kNm * 1e6; // N·mm
  const fcd = fck / GAMMA_C;
  const fyd = fyk / GAMMA_S;
  const K = (fyd * fyd) / (1.7 * fcd * b);
  const disc = (fyd * d) ** 2 - 4 * K * Md;
  const standards = ["TS 500 (dikdörtgen gerilim bloku, §7.3)", "TBDY 2018 §7.4.2 (donatı oranı sınırları)"];
  if (disc < 0) {
    return {
      value: { gerekliAs_mm2: null },
      intermediates: { Mmaks_tek_donatili_kNm: ((fyd * d) ** 2 / (4 * K)) / 1e6 },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Kesit tek donatıyla bu momenti taşıyamaz; boyutu büyütün veya basınç donatısı kullanın." },
    };
  }
  const As = (fyd * d - Math.sqrt(disc)) / (2 * K);
  const a = (As * fyd) / (0.85 * fcd * b);
  const rho = As / (b * d);
  const fctd = (0.35 * Math.sqrt(fck)) / GAMMA_C;
  const rhoMin = (0.8 * fctd) / fyd;
  const k1 = Math.min(0.85, Math.max(0.7, 0.85 - 0.006 * (fck - 25)));
  const rhoB = ((0.85 * k1 * fcd) / fyd) * (600 / (600 + fyd));
  const rhoMax = Math.min(0.02, 0.85 * rhoB);
  const AsMin = rhoMin * b * d;
  const asKullan = Math.max(As, AsMin);
  const asir = rho > rhoMax;
  return {
    value: { gerekliAs_mm2: asKullan },
    intermediates: {
      hesaplanan_As_mm2: As,
      As_min_mm2: AsMin,
      gerilim_blogu_derinligi_a_mm: a,
      donatiOrani_rho: rho,
      rho_min: rhoMin,
      rho_maks: rhoMax,
      fcd_MPa: fcd,
      fyd_MPa: fyd,
    },
    standardsUsed: standards,
    verdict: asir
      ? { status: "uygunsuz", note: `ρ = ${rho.toFixed(4)} üst sınır ${rhoMax.toFixed(4)}'i aşıyor; kesiti büyütün veya basınç donatısı ekleyin.` }
      : As < AsMin
        ? { status: "sinirda", note: "Hesaplanan donatı asgari oranın altında; As,min esas alındı." }
        : { status: "uygun", note: "Donatı oranı TS 500 sınırları içinde." },
  };
}

export const kirisEgilmeDonatisiGerekli: CalcModule<KirisEgilmeDonatisiGerekliInput, KirisEgilmeDonatisiGerekliOutput> = {
  id: "kiris-egilme-donatisi-gerekli",
  title: "Kiriş Eğilme Donatısı (Gerekli As, Tek Donatılı)",
  discipline: "insaat",
  standards: ["TS 500", "TBDY 2018"],
  inputSchema: kirisEgilmeDonatisiGerekliInputSchema,
  compute,
};
