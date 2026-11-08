import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// İki doğrultuda çalışan (ly/lx ≤ 2) dört kenarı mesnetli döşemeden kirişlere yük aktarımı (zarf yöntemi, üçgen/yamuk yük alanı):
// kısa kiriş (üçgen): tepe q·lx/2;  uzun kiriş (yamuk): tepe q·lx/2, yamuk başlama mesafesi lx/2.
// Momente eşdeğer düzgün yayılı yük (basit mesnetli kirişte aynı Mmaks):  kısa: q·lx/3;  uzun: (q·lx/2)·(1 − m²/3),  m = lx/ly.
// Kesmeye eşdeğer (toplam yük/boy):  kısa: q·lx/4;  uzun: (q·lx/2)·(1 − m/2).
// lx kısa, ly uzun kenar; q döşeme tasarım yüküdür (kN/m²). ly/lx > 2 ise döşeme tek doğrultuda çalışır (yük kısa kenara dik kirişlere
// değil, uzun kenar kirişlerine q·lx/2 olarak aktarılır). Sürekli kiriş/ankastre uç etkileri için moment dağıtımı ayrıca yapılmalıdır.
export const dosemeKirisYukAktarimiInputSchema = z.object({
  dosemeYuku_kNm2: z.number().positive(),
  kisaKenar_lx_m: z.number().positive(),
  uzunKenar_ly_m: z.number().positive(),
});

export type DosemeKirisYukAktarimiInput = z.infer<typeof dosemeKirisYukAktarimiInputSchema>;

export interface DosemeKirisYukAktarimiOutput {
  uzunKirisEsdegerYuk_kNm: number;
}

function compute(input: DosemeKirisYukAktarimiInput): CalcResult<DosemeKirisYukAktarimiOutput> {
  const { dosemeYuku_kNm2: q, kisaKenar_lx_m: lx, uzunKenar_ly_m: ly } = input;
  if (ly < lx) {
    return {
      value: { uzunKirisEsdegerYuk_kNm: Number.NaN },
      intermediates: { not: "ly, lx'ten küçük olamaz (lx kısa kenar)" },
      standardsUsed: ["Zarf (yük alanı) yöntemi"],
      verdict: { status: "uygunsuz", note: "Kenar tanımı hatalı: lx ≤ ly olmalıdır." },
    };
  }
  const m = lx / ly;
  const tek = ly / lx > 2;
  const kisaM = (q * lx) / 3;
  const uzunM = (q * lx * (1 - (m * m) / 3)) / 2;
  const kisaV = (q * lx) / 4;
  const uzunV = ((q * lx) / 2) * (1 - m / 2);
  return {
    value: { uzunKirisEsdegerYuk_kNm: tek ? (q * lx) / 2 : uzunM },
    intermediates: {
      m_orani_lx_ly: m,
      kisa_kiris_moment_esdegeri_kNm: tek ? "tek doğrultuda çalışır: kısa kirişe yük yok" : kisaM,
      kisa_kiris_kesme_esdegeri_kNm: tek ? "—" : kisaV,
      uzun_kiris_kesme_esdegeri_kNm: tek ? (q * lx) / 2 : uzunV,
      toplam_doseme_yuku_kN: q * lx * ly,
      calisma_sekli: tek ? "tek doğrultu (ly/lx > 2)" : "iki doğrultu",
    },
    standardsUsed: ["Yük alanı (zarf) yöntemi; TS 500 döşeme–kiriş yük aktarımı"],
  };
}

export const dosemeKirisYukAktarimi: CalcModule<DosemeKirisYukAktarimiInput, DosemeKirisYukAktarimiOutput> = {
  id: "doseme-kiris-yuk-aktarimi",
  title: "Döşemeden Kirişe Yük Aktarımı (Eşdeğer Yayılı)",
  discipline: "insaat",
  standards: [],
  inputSchema: dosemeKirisYukAktarimiInputSchema,
  compute,
};
