import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Karışım havasından taze hava oranı (sıcaklık yöntemi, saha ölçümü): x = (T_karışım − T_dönüş)/(T_dış − T_dönüş).
// Karışımda tam karışma varsayılır (ölçüm karışım kutusundan yeterli mesafede, sıcaklık tabakalaşması yoksa); en güvenilir sonuç dış–dönüş sıcaklık farkı
// ≥ 10 K iken alınır. Taze hava debisi = x·V̇_toplam. Gerekli oranı karşılıyorsa (ASHRAE 62.1/TS EN 16798) kontrol edilir; gerekli taze hava Taze Hava Debisi modülünden gelir.
export const tazeHavaOraniSicakliktanInputSchema = z.object({
  donusHavasiSicakligi_C: z.number(),
  disHavaSicakligi_C: z.number(),
  karisimSicakligi_C: z.number(),
  toplamDebi_m3h: z.number().positive(),
  gerekliTazeHava_m3h: z.number().min(0),
});

export type TazeHavaOraniSicakliktanInput = z.infer<typeof tazeHavaOraniSicakliktanInputSchema>;

export interface TazeHavaOraniSicakliktanOutput {
  tazeHavaOrani_yuzde: number | null;
}

function compute(input: TazeHavaOraniSicakliktanInput): CalcResult<TazeHavaOraniSicakliktanOutput> {
  const fark = input.disHavaSicakligi_C - input.donusHavasiSicakligi_C;
  const standards = ["Karışım (enerji dengesi) yöntemi; ASHRAE 62.1 / TS EN 16798-3"];
  if (Math.abs(fark) < 5) {
    return {
      value: { tazeHavaOrani_yuzde: null },
      intermediates: { sicaklik_farki_K: fark, not: "Dış–dönüş sıcaklık farkı < 5 K: yöntem güvenilir değil" },
      standardsUsed: standards,
      verdict: { status: "sinirda", note: "Sıcaklık farkı çok küçük; ölçüm belirsizliği sonucu anlamsız kılar (≥ 10 K önerilir)." },
    };
  }
  const x = (input.karisimSicakligi_C - input.donusHavasiSicakligi_C) / fark;
  const q = x * input.toplamDebi_m3h;
  const gecerli = x >= -0.02 && x <= 1.02;
  const durum = !gecerli ? "uygunsuz" : q >= input.gerekliTazeHava_m3h ? "uygun" : q >= 0.9 * input.gerekliTazeHava_m3h ? "sinirda" : "uygunsuz";
  return {
    value: { tazeHavaOrani_yuzde: x * 100 },
    intermediates: {
      sicaklik_farki_K: fark,
      taze_hava_debisi_m3h: q,
      gerekli_taze_hava_m3h: input.gerekliTazeHava_m3h,
      karsilama_orani_yuzde: input.gerekliTazeHava_m3h > 0 ? (q / input.gerekliTazeHava_m3h) * 100 : "—",
    },
    standardsUsed: standards,
    verdict: {
      status: durum,
      note: !gecerli ? "Oran 0–1 aralığında değil: sıcaklık ölçümlerini kontrol edin (karışım tam değil/yanlış nokta)." : durum === "uygun" ? "Taze hava debisi gerekli değeri karşılıyor." : durum === "sinirda" ? "Taze hava gerekenin %90–100'ü; damper ayarını gözden geçirin." : "Taze hava gerekenin altında; damper/minimum konum ayarı gerekli.",
    },
  };
}

export const tazeHavaOraniSicakliktan: CalcModule<TazeHavaOraniSicakliktanInput, TazeHavaOraniSicakliktanOutput> = {
  id: "taze-hava-orani-sicakliktan",
  title: "Taze Hava Oranı (Sıcaklık Yöntemi, Saha Ölçümü)",
  discipline: "mekanik",
  standards: [],
  inputSchema: tazeHavaOraniSicakliktanInputSchema,
  compute,
};
