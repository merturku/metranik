import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// NFPA 291 hidrant akış testi ekstrapolasyonu: QR = QF·[(Ps − PR)/(Ps − PF)]^0,54 (Q ∝ ΔP^(1/1,85)).
const US = 0.54;

export const hidrantAkisTestiKullanilabilirDebiInputSchema = z
  .object({
    statikBasinc_bar: z.number().positive(),
    kalanBasinc_bar: z.number().min(0),
    testDebisi_Lmin: z.number().positive(),
    hedefKalanBasinc_bar: z.number().min(0),
    gerekliDebi_Lmin: z.number().positive(),
  })
  .refine((v) => v.kalanBasinc_bar < v.statikBasinc_bar, { message: "Kalan basınç statik basınçtan küçük olmalı" })
  .refine((v) => v.hedefKalanBasinc_bar < v.statikBasinc_bar, { message: "İstenen kalan basınç statik basınçtan küçük olmalı" });

export type HidrantAkisTestiKullanilabilirDebiInput = z.infer<typeof hidrantAkisTestiKullanilabilirDebiInputSchema>;

export interface HidrantAkisTestiKullanilabilirDebiOutput {
  kullanilabilirDebi_Lmin: number;
}

function compute(input: HidrantAkisTestiKullanilabilirDebiInput): CalcResult<HidrantAkisTestiKullanilabilirDebiOutput> {
  const oran = (input.statikBasinc_bar - input.hedefKalanBasinc_bar) / (input.statikBasinc_bar - input.kalanBasinc_bar);
  const QR = input.testDebisi_Lmin * Math.pow(oran, US);
  const k = QR / input.gerekliDebi_Lmin;
  const dusumYuzde = ((input.statikBasinc_bar - input.kalanBasinc_bar) / input.statikBasinc_bar) * 100;
  let status: "uygun" | "sinirda" | "uygunsuz";
  let note: string;
  if (k >= 1) {
    status = "uygun";
    note = "İstenen kalan basınçta şebeke gerekli yangın debisini karşılıyor.";
  } else if (k >= 0.9) {
    status = "sinirda";
    note = "Kullanılabilir debi gerekli debinin %90–100'ü; marj yok.";
  } else {
    status = "uygunsuz";
    note = "Kullanılabilir debi gerekli yangın debisinin altında (depo/yangın pompası gerekebilir).";
  }
  if (dusumYuzde < 10) note += " Test basınç düşümü statik basıncın %10'undan az; ekstrapolasyon güvenilir değil.";
  return {
    value: { kullanilabilirDebi_Lmin: QR },
    intermediates: {
      basinc_dusum_orani: oran,
      kullanilabilir_debi_m3h: (QR * 60) / 1000,
      gerekli_debiye_oran: k,
    },
    standardsUsed: ["NFPA 291"],
    verdict: { status, note },
  };
}

export const hidrantAkisTestiKullanilabilirDebi: CalcModule<
  HidrantAkisTestiKullanilabilirDebiInput,
  HidrantAkisTestiKullanilabilirDebiOutput
> = {
  id: "hidrant-akis-testi-kullanilabilir-debi",
  title: "Hidrant Akış Testi — Kalan Basınçta Kullanılabilir Debi",
  discipline: "mekanik",
  standards: ["NFPA 291"],
  inputSchema: hidrantAkisTestiKullanilabilirDebiInputSchema,
  compute,
};
