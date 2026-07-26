import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit mesnetli, üniform yayılı yüklü kirişte maksimum sehim (klasik kiriş
// teorisi): δ = 5×w×L⁴ / (384×E×I).
// w: yayılı yük (N/m), L: açıklık (m), E: elastisite modülü (Pa), I: atalet
// momenti (m⁴). Servis sınırı olarak L/250 kullanılır (yaygın pratik değer;
// esas taşıyıcı yönetmelikte (TS 500/Eurocode 2) farklı sınırlar tanımlanabilir).
export const kirisSehimKontroluInputSchema = z.object({
  yayiliYuk_w_Nm: z.number().positive(),
  aciklik_L_m: z.number().positive(),
  elastisiteModulu_E_Pa: z.number().positive(),
  ataletMomenti_I_m4: z.number().positive(),
});

export type KirisSehimKontroluInput = z.infer<typeof kirisSehimKontroluInputSchema>;

export interface KirisSehimKontroluOutput {
  sehim_mm: number;
}

function compute(input: KirisSehimKontroluInput): CalcResult<KirisSehimKontroluOutput> {
  const sehim_m =
    (5 * input.yayiliYuk_w_Nm * input.aciklik_L_m ** 4) /
    (384 * input.elastisiteModulu_E_Pa * input.ataletMomenti_I_m4);
  const sehim_mm = sehim_m * 1000;
  const sinirSehim_mm = (input.aciklik_L_m * 1000) / 250;

  return {
    value: { sehim_mm },
    intermediates: {
      sinirSehim_L250_mm: Number(sinirSehim_mm.toFixed(2)),
    },
    standardsUsed: [],
    verdict:
      sehim_mm <= sinirSehim_mm
        ? { status: "uygun", note: "Hesaplanan sehim L/250 servis sınırının altında." }
        : { status: "uygunsuz", note: "Hesaplanan sehim L/250 servis sınırını aşıyor." },
  };
}

export const kirisSehimKontrolu: CalcModule<KirisSehimKontroluInput, KirisSehimKontroluOutput> = {
  id: "kiris-sehim-kontrolu",
  title: "Kiriş Sehim Kontrolü",
  discipline: "insaat",
  standards: [],
  inputSchema: kirisSehimKontroluInputSchema,
  compute,
};
