import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Deprem bölgesi kolonlarında sargı (etriye) donatısı alanı — DBYBHY/TBDY 2018 kolon sarılma bölgesi:
// Ash ≥ 0,30·s·bk·(fck/fywk)·[(Ac/Ack) − 1]   ve   Ash ≥ 0,075·s·bk·(fck/fywk).
// s etriye aralığı, bk çekirdek (etriye dış yüzü) boyutu, Ac brüt kesit alanı, Ack etriye dışından ölçülen çekirdek alanı,
// fywk etriye çeliği karakteristik akma dayanımı. Kontrol her doğrultu için yapılır (burada bk ve Ash tek doğrultu içindir).
// Madde numaraları ve ek koşullar (aralık sınırları, çirozlar) yönetmelikten teyit edilmelidir.
export const kolonEtriyeSarilmaDonatisiInputSchema = z.object({
  etriyeAraligi_s_mm: z.number().positive(),
  cekirdekBoyutu_bk_mm: z.number().positive(),
  brutAlan_Ac_mm2: z.number().positive(),
  cekirdekAlani_Ack_mm2: z.number().positive(),
  fck_MPa: z.number().positive(),
  fywk_MPa: z.number().positive(),
  mevcutAsh_mm2: z.number().min(0),
});

export type KolonEtriyeSarilmaDonatisiInput = z.infer<typeof kolonEtriyeSarilmaDonatisiInputSchema>;

export interface KolonEtriyeSarilmaDonatisiOutput {
  gerekliAsh_mm2: number;
}

function compute(input: KolonEtriyeSarilmaDonatisiInput): CalcResult<KolonEtriyeSarilmaDonatisiOutput> {
  if (input.cekirdekAlani_Ack_mm2 > input.brutAlan_Ac_mm2) {
    return {
      value: { gerekliAsh_mm2: Number.NaN },
      intermediates: { not: "Ack, Ac'den büyük olamaz" },
      standardsUsed: ["TBDY 2018 / DBYBHY (kolon sarılma donatısı)"],
      verdict: { status: "uygunsuz", note: "Çekirdek alanı brüt alandan büyük girilemez." },
    };
  }
  const oran = input.fck_MPa / input.fywk_MPa;
  const a1 = 0.3 * input.etriyeAraligi_s_mm * input.cekirdekBoyutu_bk_mm * oran * (input.brutAlan_Ac_mm2 / input.cekirdekAlani_Ack_mm2 - 1);
  const a2 = 0.075 * input.etriyeAraligi_s_mm * input.cekirdekBoyutu_bk_mm * oran;
  const gerekli = Math.max(a1, a2);
  const yeterli = input.mevcutAsh_mm2 >= gerekli;
  return {
    value: { gerekliAsh_mm2: gerekli },
    intermediates: {
      birinci_kosul_Ash_mm2: a1,
      ikinci_kosul_Ash_mm2: a2,
      belirleyici: a1 >= a2 ? "0,30·s·bk·(fck/fywk)·(Ac/Ack − 1)" : "0,075·s·bk·(fck/fywk)",
      mevcut_Ash_mm2: input.mevcutAsh_mm2,
      mevcut_gerekli_orani: input.mevcutAsh_mm2 / gerekli,
    },
    standardsUsed: ["TBDY 2018 / DBYBHY (kolon sarılma donatısı; madde no teyit edilmeli)"],
    verdict: {
      status: yeterli ? "uygun" : "uygunsuz",
      note: yeterli ? "Mevcut etriye alanı gerekli sargı donatısını sağlıyor." : "Etriye çapı/kol sayısını artırın veya aralığı azaltın.",
    },
  };
}

export const kolonEtriyeSarilmaDonatisi: CalcModule<KolonEtriyeSarilmaDonatisiInput, KolonEtriyeSarilmaDonatisiOutput> = {
  id: "kolon-etriye-sarilma-donatisi",
  title: "Kolon Sarılma Bölgesi Etriye Alanı (Ash)",
  discipline: "insaat",
  standards: ["TBDY 2018"],
  inputSchema: kolonEtriyeSarilmaDonatisiInputSchema,
  compute,
};
