import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Ekonomizer: Q = ṁgaz·cp·(Tgiriş − Tçıkış); su ısınması Q/(ṁsu·cpsu); yakıt tasarrufu Q·t/η.
export const ekonomizerBacaGaziIsiGeriKazanimiInputSchema = z
  .object({
    gazKutleDebisi_kgs: z.number().positive(),
    gazCp_kJkgK: z.number().positive(),
    gazGiris_C: z.number(),
    gazCikis_C: z.number(),
    suDebisi_kgs: z.number().positive(),
    suGiris_C: z.number(),
    asitCiyNoktasi_C: z.number(),
    kazanVerimi: z.number().gt(0).max(1),
    yillikSaat_h: z.number().positive(),
    yakitFiyati_TLkWh: z.number().min(0),
  })
  .refine((v) => v.gazGiris_C > v.gazCikis_C && v.gazCikis_C > v.suGiris_C, {
    message: "Tgaz,giriş > Tgaz,çıkış > Tsu,giriş olmalı",
  });

export type EkonomizerBacaGaziIsiGeriKazanimiInput = z.infer<typeof ekonomizerBacaGaziIsiGeriKazanimiInputSchema>;

export interface EkonomizerBacaGaziIsiGeriKazanimiOutput {
  geriKazanilanIsi_kW: number;
}

function compute(input: EkonomizerBacaGaziIsiGeriKazanimiInput): CalcResult<EkonomizerBacaGaziIsiGeriKazanimiOutput> {
  const Q = input.gazKutleDebisi_kgs * input.gazCp_kJkgK * (input.gazGiris_C - input.gazCikis_C);
  const suArtis = Q / (input.suDebisi_kgs * 4.186);
  const suCikis = input.suGiris_C + suArtis;
  const yakitEnerjisi = (Q * input.yillikSaat_h) / input.kazanVerimi;
  let verdict: CalcResult<unknown>["verdict"];
  if (suCikis >= input.gazGiris_C) {
    verdict = { status: "uygunsuz", note: "Su çıkış sıcaklığı baca gazı girişini aşıyor; ısı geçişi fiziksel olarak mümkün değil (su debisini artırın)." };
  } else if (input.gazCikis_C < input.asitCiyNoktasi_C) {
    verdict = { status: "uygunsuz", note: "Baca gazı çıkışı asit çiy noktasının altında; düşük sıcaklık korozyonu riski." };
  } else if (input.gazCikis_C < input.asitCiyNoktasi_C + 5) {
    verdict = { status: "sinirda", note: "Baca gazı çıkışı asit çiy noktasına 5 K'den yakın; korozyon payı az." };
  } else {
    verdict = { status: "uygun", note: "Baca gazı çıkışı asit çiy noktasının yeterince üzerinde." };
  }
  return {
    value: { geriKazanilanIsi_kW: Q },
    intermediates: {
      su_cikis_C: suCikis,
      su_sicaklik_artisi_K: suArtis,
      yillik_yakit_tasarrufu_kWh: yakitEnerjisi,
      yillik_tasarruf_TL: yakitEnerjisi * input.yakitFiyati_TLkWh,
    },
    standardsUsed: [],
    verdict,
  };
}

export const ekonomizerBacaGaziIsiGeriKazanimi: CalcModule<EkonomizerBacaGaziIsiGeriKazanimiInput, EkonomizerBacaGaziIsiGeriKazanimiOutput> = {
  id: "ekonomizer-baca-gazi-isi-geri-kazanimi",
  title: "Ekonomizer Baca Gazı Isı Geri Kazanımı",
  discipline: "mekanik",
  standards: [],
  inputSchema: ekonomizerBacaGaziIsiGeriKazanimiInputSchema,
  compute,
};
