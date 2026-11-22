import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Musluğa sıcak su gelme süresi: t = V_boru/Q,  V_boru = π·D²·L/4  (boru ısıl kütlesi ihmal → alt sınır)
export const sicakSuGelmeSuresiInputSchema = z.object({
  boruIcCapi_mm: z.number().positive(),
  boruUzunlugu_m: z.number().positive(),
  musluk_debisi_Ldk: z.number().positive(),
  gunlukKullanimSayisi: z.number().min(0),
  suBirimFiyati_TLm3: z.number().min(0),
  izinVerilenSure_s: z.number().positive(),
});

export type SicakSuGelmeSuresiInput = z.infer<typeof sicakSuGelmeSuresiInputSchema>;
export interface SicakSuGelmeSuresiOutput {
  gelmeSuresi_s: number;
}

const STD = "Hidrolik süreklilik (V = A·L, t = V/Q); süre sınırı yerel şartname/üretici önerisinden teyit edilmeli";

function compute(input: SicakSuGelmeSuresiInput): CalcResult<SicakSuGelmeSuresiOutput> {
  const D = input.boruIcCapi_mm / 1000;
  const hacim_L = ((Math.PI * D * D) / 4) * input.boruUzunlugu_m * 1000;
  const t = (hacim_L / input.musluk_debisi_Ldk) * 60;
  const yillikSu_m3 = (hacim_L * input.gunlukKullanimSayisi * 365) / 1000;
  const maliyet = yillikSu_m3 * input.suBirimFiyati_TLm3;
  const status = t <= input.izinVerilenSure_s ? "uygun" : t <= 2 * input.izinVerilenSure_s ? "sinirda" : "uygunsuz";
  return {
    value: { gelmeSuresi_s: t },
    intermediates: {
      boru_ici_hacim_L: hacim_L,
      boru_ici_hiz_ms: (input.musluk_debisi_Ldk / 60000) / ((Math.PI * D * D) / 4),
      yillik_bosa_giden_su_m3: yillikSu_m3,
      yillik_maliyet_TL: maliyet,
    },
    standardsUsed: [STD],
    verdict: {
      status,
      note: `Süre ${t.toFixed(0)} s (izin ${input.izinVerilenSure_s} s). Boru ve çevre ısıl kütlesi ihmal edildiği için gerçek süre daha uzundur; çözüm: sirkülasyon hattı veya yerel ısıtıcı`,
    },
  };
}

export const sicakSuGelmeSuresi: CalcModule<SicakSuGelmeSuresiInput, SicakSuGelmeSuresiOutput> = {
  id: "sicak-su-gelme-suresi",
  title: "Musluğa Sıcak Su Gelme Süresi ve Boşa Giden Su",
  discipline: "ev",
  standards: [STD],
  inputSchema: sicakSuGelmeSuresiInputSchema,
  compute,
};
