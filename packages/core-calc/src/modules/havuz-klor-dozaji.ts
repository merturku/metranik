import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Havuz suyunda serbest kloru hedef değere çıkarmak için gereken ürün miktarı
// (kütle dengesi): 1 ppm = 1 mg/L = 1 g/m³, gereken aktif klor = (Chedef − Cmevcut)·V (g);
// ürün miktarı = aktif klor / ürünün aktif klor içeriği (g/kg katı veya g/L sıvı).
// Örn. %65'lik kalsiyum hipoklorit ≈ 650 g/kg; ticari %12,5 sodyum hipoklorit ≈ 125 g/L.
// Değerlendirme yaygın kullanılan 1–3 mg/L serbest klor aralığına göre (WHO 2006 yüzme
// havuzu rehberi: ≈1 mg/L hedef, kamusal havuzda 3 mg/L üst değer).
// Hesap anlık doz içindir; güneş ve kullanıcı yüküyle klor tüketimini kapsamaz.
export const havuzKlorDozajiInputSchema = z.object({
  havuzHacmi_m3: z.number().positive(),
  mevcutSerbestKlor_ppm: z.number().min(0),
  hedefSerbestKlor_ppm: z.number().positive(),
  urunAktifKlorIcerigi_gPerBirim: z.number().positive().max(1000),
});

export type HavuzKlorDozajiInput = z.infer<typeof havuzKlorDozajiInputSchema>;

export interface HavuzKlorDozajiOutput {
  urunMiktari_kgVeyaL: number;
}

function compute(input: HavuzKlorDozajiInput): CalcResult<HavuzKlorDozajiOutput> {
  const artis = Math.max(0, input.hedefSerbestKlor_ppm - input.mevcutSerbestKlor_ppm);
  const aktifKlor_g = artis * input.havuzHacmi_m3;
  const urun = aktifKlor_g / input.urunAktifKlorIcerigi_gPerBirim;
  const hedef = input.hedefSerbestKlor_ppm;

  const verdict: CalcResult<HavuzKlorDozajiOutput>["verdict"] =
    artis === 0
      ? { status: "uygun", note: `Mevcut ${input.mevcutSerbestKlor_ppm} ppm hedefin üstünde/eşit: ek dozaj gerekmez.` }
      : hedef >= 1 && hedef <= 3
        ? { status: "uygun", note: `Hedef ${hedef} ppm, önerilen 1–3 ppm aralığında.` }
        : hedef > 3
          ? {
              status: "sinirda",
              note: `Hedef ${hedef} ppm > 3 ppm (şok klorlama): serbest klor 3 ppm'in altına inmeden havuza girilmemeli.`,
            }
          : { status: "sinirda", note: `Hedef ${hedef} ppm < 1 ppm: dezenfeksiyon yetersiz kalabilir.` };

  return {
    value: { urunMiktari_kgVeyaL: urun },
    intermediates: {
      klor_artisi_ppm: artis,
      gereken_aktif_klor_g: aktifKlor_g,
      urun_miktari_g_veya_mL: urun * 1000,
    },
    standardsUsed: [],
    verdict,
  };
}

export const havuzKlorDozaji: CalcModule<HavuzKlorDozajiInput, HavuzKlorDozajiOutput> = {
  id: "havuz-klor-dozaji",
  title: "Havuz Klor Dozajı",
  discipline: "ev",
  standards: [],
  inputSchema: havuzKlorDozajiInputSchema,
  compute,
};
