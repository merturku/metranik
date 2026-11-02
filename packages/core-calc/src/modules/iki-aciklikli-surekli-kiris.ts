import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İki eşit açıklıklı sürekli kiriş, düzgün yayılı yük w (her iki açıklıkta) — üç moment denkleminden:
//  orta mesnet momenti M_B = −wL²/8,  uç mesnet reaksiyonu R_A = R_C = 3wL/8,  orta mesnet R_B = 5wL/4,
//  açıklık maksimum momenti (x = 3L/8) M = 9wL²/128.  Açıklıklardan biri yüklü (kısmi yükleme) durumu kapsam dışıdır.
export const ikiAciklikliSurekliKirisInputSchema = z.object({
  aciklik_m: z.number().positive(),
  yayiliYuk_kNm: z.number().positive(),
});

export type IkiAciklikliSurekliKirisInput = z.infer<typeof ikiAciklikliSurekliKirisInputSchema>;

export interface IkiAciklikliSurekliKirisOutput {
  ortaMesnetMomenti_kNm: number;
}

function compute(input: IkiAciklikliSurekliKirisInput): CalcResult<IkiAciklikliSurekliKirisOutput> {
  const { aciklik_m: L, yayiliYuk_kNm: w } = input;
  const mB = (w * L * L) / 8;
  const mAciklik = (9 * w * L * L) / 128;
  const basit = (w * L * L) / 8;
  return {
    value: { ortaMesnetMomenti_kNm: mB },
    intermediates: {
      aciklik_maks_momenti_kNm: mAciklik,
      aciklik_maks_noktasi_m: (3 * L) / 8,
      uc_mesnet_reaksiyonu_kN: (3 * w * L) / 8,
      orta_mesnet_reaksiyonu_kN: (5 * w * L) / 4,
      toplam_yuk_kN: 2 * w * L,
      basit_kiris_momenti_kNm: basit,
      moment_azalmasi_yuzde: (1 - mAciklik / basit) * 100,
    },
    standardsUsed: ["Üç moment denklemi (klasik yapı statiği)"],
  };
}

export const ikiAciklikliSurekliKiris: CalcModule<IkiAciklikliSurekliKirisInput, IkiAciklikliSurekliKirisOutput> = {
  id: "iki-aciklikli-surekli-kiris",
  title: "İki Açıklıklı Sürekli Kiriş Tesirleri",
  discipline: "insaat",
  standards: [],
  inputSchema: ikiAciklikliSurekliKirisInputSchema,
  compute,
};
