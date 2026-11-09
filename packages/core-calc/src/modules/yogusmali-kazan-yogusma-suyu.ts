import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yoğuşmalı kazanda doğalgaz yanma suyunun yoğuşma miktarı: CH4 + 2O2 → CO2 + 2H2O → 1 mol CH4'ten 2 mol su.
// Teorik su üretimi = 2·18,015/22,414 = 1,6075 kg/Nm³ CH4 (saf metan; gerçek doğalgazda biraz farklı — dönüşüm katsayısı girdi olarak değiştirilebilir).
// Yoğuşan su = yakıt debisi × birim su × yoğuşan kesir f; f dönüş suyu sıcaklığına (çiy noktası ≈ 55–59 °C) ve fazla havaya bağlıdır (dönüş suyu 30–40 °C'de f ≈ 0,3–0,5).
// Yoğuşma suyu asidiktir (pH 3–5); atık su bağlantısında nötralizasyon/izin koşulları yerel yönetmelikten kontrol edilmelidir.
export const yogusmaliKazanYogusmaSuyuInputSchema = z.object({
  yakitDebisi_Nm3h: z.number().positive(),
  birimSuUretimi_kgNm3: z.number().positive(),
  yogusanKesir: z.number().min(0).max(1),
});

export type YogusmaliKazanYogusmaSuyuInput = z.infer<typeof yogusmaliKazanYogusmaSuyuInputSchema>;

export interface YogusmaliKazanYogusmaSuyuOutput {
  yogusmaSuyu_kgh: number;
}

function compute(input: YogusmaliKazanYogusmaSuyuInput): CalcResult<YogusmaliKazanYogusmaSuyuOutput> {
  const toplam = input.yakitDebisi_Nm3h * input.birimSuUretimi_kgNm3;
  const yogusan = toplam * input.yogusanKesir;
  return {
    value: { yogusmaSuyu_kgh: yogusan },
    intermediates: {
      yanma_suyu_toplam_kgh: toplam,
      yogusan_su_Lh: yogusan,
      yogusmayan_su_kgh: toplam - yogusan,
      gizli_isi_geri_kazanimi_kW: (yogusan * 2442) / 3600,
      teorik_metan_birim_su_kgNm3: (2 * 18.015) / 22.414,
    },
    standardsUsed: ["Stokiyometrik yanma (CH₄ + 2O₂ → CO₂ + 2H₂O)"],
  };
}

export const yogusmaliKazanYogusmaSuyu: CalcModule<YogusmaliKazanYogusmaSuyuInput, YogusmaliKazanYogusmaSuyuOutput> = {
  id: "yogusmali-kazan-yogusma-suyu",
  title: "Yoğuşmalı Kazan Yoğuşma Suyu Miktarı",
  discipline: "mekanik",
  standards: [],
  inputSchema: yogusmaliKazanYogusmaSuyuInputSchema,
  compute,
};
