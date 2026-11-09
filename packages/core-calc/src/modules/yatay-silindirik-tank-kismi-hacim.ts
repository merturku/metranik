import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Yatay silindirik tankın kısmi dolu hacmi (düz kapaklı): h sıvı yüksekliği, r = D/2, L silindir boyu:
// V = L·[ r²·arccos((r − h)/r) − (r − h)·√(2·r·h − h²) ]  (m³).  Tam dolu V = π·r²·L.
// Bombeli/elipsoidal kapaklar hacim eklemez bu modülde (kapak hacmi üreticiden eklenmelidir). Yakıt deposu/ısıl depo seviye–hacim kalibrasyonu ve
// otonomi hesabı için kullanılır (Yakıt Deposu Otonomi Süresi modülüne hacim girdisi).
export const yataySilindirikTankKismiHacimInputSchema = z.object({
  cap_D_m: z.number().positive(),
  boy_L_m: z.number().positive(),
  sivi_yuksekligi_h_m: z.number().min(0),
});

export type YataySilindirikTankKismiHacimInput = z.infer<typeof yataySilindirikTankKismiHacimInputSchema>;

export interface YataySilindirikTankKismiHacimOutput {
  dolu_hacim_m3: number | null;
}

function compute(input: YataySilindirikTankKismiHacimInput): CalcResult<YataySilindirikTankKismiHacimOutput> {
  const r = input.cap_D_m / 2;
  const h = input.sivi_yuksekligi_h_m;
  const standards = ["Dairesel segment geometrisi"];
  if (h > input.cap_D_m + 1e-12) {
    return {
      value: { dolu_hacim_m3: null },
      intermediates: { not: "Sıvı yüksekliği çapı aşamaz" },
      standardsUsed: standards,
      verdict: { status: "uygunsuz", note: "Sıvı yüksekliği tank çapından büyük." },
    };
  }
  const x = Math.min(1, Math.max(-1, (r - h) / r));
  const segment = r * r * Math.acos(x) - (r - h) * Math.sqrt(Math.max(0, 2 * r * h - h * h));
  const v = input.boy_L_m * segment;
  const toplam = Math.PI * r * r * input.boy_L_m;
  return {
    value: { dolu_hacim_m3: v },
    intermediates: {
      dolu_hacim_L: v * 1000,
      toplam_hacim_m3: toplam,
      doluluk_yuzde: (v / toplam) * 100,
      seviye_yuzdesi: (h / input.cap_D_m) * 100,
      bos_hacim_m3: toplam - v,
    },
    standardsUsed: standards,
  };
}

export const yataySilindirikTankKismiHacim: CalcModule<YataySilindirikTankKismiHacimInput, YataySilindirikTankKismiHacimOutput> = {
  id: "yatay-silindirik-tank-kismi-hacim",
  title: "Yatay Silindirik Tank Kısmi Dolu Hacim",
  discipline: "mekanik",
  standards: [],
  inputSchema: yataySilindirikTankKismiHacimInputSchema,
  compute,
};
