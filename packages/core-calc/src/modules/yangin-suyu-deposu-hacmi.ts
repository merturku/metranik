import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Sprinkler tasarım debisi (yoğunluk/alan yöntemi, TS EN 12845 ve NFPA 13) ve yangın suyu deposu:
// Tasarım alanında çalışan sprinkler sayısı n = ⌈A/As⌉; her sprinklerin asgari debisi
// q = max(D·As, K·√Pmin), bu debide gereken basınç P = (q/K)².
// Sprinkler debisi Qs = n·q (≥ D·A), toplam Q = Qs + Qhortum, depo hacmi V = Q·t.
// Yoğunluk D, alan A, süre ve hortum payı tehlike sınıfına göre standart tablolarından girdidir.
// Gerçek hidrolik hesapta uzak/yakın sprinkler basınç farkı nedeniyle debi bu teorik asgariden büyüktür.
export const yanginSuyuDeposuHacmiInputSchema = z.object({
  tasarimYogunlugu_mm_dk: z.number().positive(),
  tasarimAlani_m2: z.number().positive(),
  sprinklerKorumaAlani_m2: z.number().positive(),
  kFaktoru_Ldk_bar05: z.number().positive(),
  asgariSprinklerBasinci_bar: z.number().positive(),
  hortumDebisi_Ldk: z.number().min(0),
  calismaSuresi_dk: z.number().positive(),
});

export type YanginSuyuDeposuHacmiInput = z.infer<typeof yanginSuyuDeposuHacmiInputSchema>;

export interface YanginSuyuDeposuHacmiOutput {
  depoHacmi_m3: number;
}

function compute(input: YanginSuyuDeposuHacmiInput): CalcResult<YanginSuyuDeposuHacmiOutput> {
  const D = input.tasarimYogunlugu_mm_dk;
  const A = input.tasarimAlani_m2;
  const As = input.sprinklerKorumaAlani_m2;
  const K = input.kFaktoru_Ldk_bar05;

  // Kayan nokta hatasıyla tam bölünen alanın bir fazla sprinkler saymaması için ε payı
  const n = Math.ceil(A / As - 1e-9);
  const qYogunluk = D * As;
  const qBasinc = K * Math.sqrt(input.asgariSprinklerBasinci_bar);
  const q = Math.max(qYogunluk, qBasinc);
  const Qs = n * q;
  const Q = Qs + input.hortumDebisi_Ldk;

  return {
    value: { depoHacmi_m3: (Q * input.calismaSuresi_dk) / 1000 },
    intermediates: {
      calisan_sprinkler_sayisi: n,
      yogunluk_alan_debisi_DxA_Ldk: D * A,
      sprinkler_basina_debi_Ldk: q,
      sprinkler_basinci_bar: (q / K) ** 2,
      belirleyici: qYogunluk >= qBasinc ? "Tasarım yoğunluğu" : "Asgari sprinkler basıncı",
      sprinkler_toplam_debisi_Ldk: Qs,
      toplam_debi_Ldk: Q,
      toplam_debi_m3h: (Q * 60) / 1000,
    },
    standardsUsed: ["TS EN 12845", "NFPA 13"],
  };
}

export const yanginSuyuDeposuHacmi: CalcModule<YanginSuyuDeposuHacmiInput, YanginSuyuDeposuHacmiOutput> = {
  id: "yangin-suyu-deposu-hacmi",
  title: "Sprinkler Tasarım Debisi ve Yangın Suyu Deposu Hacmi",
  discipline: "mekanik",
  standards: ["TS EN 12845", "NFPA 13"],
  inputSchema: yanginSuyuDeposuHacmiInputSchema,
  compute,
};
