import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sıcak su kazanının ısıl verimi, doğrudan (giriş-çıkış) yöntem:
// Qsu = V̇·ρ·cp·(Tgidiş − Tdönüş),  Qyakıt = V̇gaz·Hu,  η = Qsu/Qyakıt.
// V̇gaz normal koşullara (0 °C, 1013 mbar) düzeltilmiş sayaç debisidir; Hu alt ısıl değer.
// Alt ısıl değer esasında yoğuşmalı kazanda η > %100 olabilir, ancak teorik üst sınır
// Hs/Hu'dur (doğalgazda ≈ 1,11); bunun aşılması ölçüm hatasını gösterir.
// Kazan Baca Gazı Kaybı (Siegert) modülündeki dolaylı yöntemin tamamlayıcısıdır.
const CP_KJ_KGK = 4.186;
const TEORIK_UST_SINIR = 1.11;

export const kazanVerimiDogrudanYontemInputSchema = z
  .object({
    suDebisi_m3h: z.number().positive(),
    suYogunlugu_kgm3: z.number().min(900).max(1010),
    gidisSicakligi_C: z.number(),
    donusSicakligi_C: z.number(),
    gazDebisi_Nm3h: z.number().positive(),
    altIsilDeger_Hu_kWhm3: z.number().positive(),
  })
  .refine((v) => v.gidisSicakligi_C > v.donusSicakligi_C, {
    message: "Gidiş sıcaklığı dönüş sıcaklığından yüksek olmalı",
  });

export type KazanVerimiDogrudanYontemInput = z.infer<typeof kazanVerimiDogrudanYontemInputSchema>;

export interface KazanVerimiDogrudanYontemOutput {
  kazanVerimi_yuzde: number;
}

function compute(input: KazanVerimiDogrudanYontemInput): CalcResult<KazanVerimiDogrudanYontemOutput> {
  const kutle_kgs = (input.suDebisi_m3h / 3600) * input.suYogunlugu_kgm3;
  const suyaVerilen_kW = kutle_kgs * CP_KJ_KGK * (input.gidisSicakligi_C - input.donusSicakligi_C);
  const yakit_kW = input.gazDebisi_Nm3h * input.altIsilDeger_Hu_kWhm3;
  const eta = suyaVerilen_kW / yakit_kW;

  const verdict: CalcResult<KazanVerimiDogrudanYontemOutput>["verdict"] =
    eta > TEORIK_UST_SINIR
      ? {
          status: "uygunsuz",
          note: `η = %${(eta * 100).toFixed(1)} teorik üst sınırı (Hs/Hu ≈ %111) aşıyor: debi, sıcaklık veya gaz sayacı ölçümünü (normal koşul düzeltmesini) kontrol edin.`,
        }
      : {
          status: "uygun",
          note: `η = %${(eta * 100).toFixed(1)} (Hu esaslı); kayıp ${(yakit_kW - suyaVerilen_kW).toFixed(1)} kW.`,
        };

  return {
    value: { kazanVerimi_yuzde: eta * 100 },
    intermediates: {
      suya_verilen_isi_kW: suyaVerilen_kW,
      yakit_isil_yuku_kW: yakit_kW,
      kayip_kW: yakit_kW - suyaVerilen_kW,
      su_kutle_debisi_kgs: kutle_kgs,
    },
    standardsUsed: [],
    verdict,
  };
}

export const kazanVerimiDogrudanYontem: CalcModule<KazanVerimiDogrudanYontemInput, KazanVerimiDogrudanYontemOutput> = {
  id: "kazan-verimi-dogrudan-yontem",
  title: "Kazan Verimi (Doğrudan Yöntem)",
  discipline: "mekanik",
  standards: [],
  inputSchema: kazanVerimiDogrudanYontemInputSchema,
  compute,
};
