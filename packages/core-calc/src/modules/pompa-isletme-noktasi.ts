import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Pompa–sistem eğrisi kesişimi (işletme noktası).
// Pompa eğrisi, üretici eğrisinden okunan üç noktadan (kapama Q = 0 dahil) ikinci
// derece polinomla tam geçirilir: Hp(Q) = A + B·Q + C·Q².
// Sistem eğrisi: Hs(Q) = Hst + b·Q², b = (Hd − Hst)/Qd² (tam türbülanslı akışta
// sürtünme kaybı debinin karesiyle artar). İşletme noktası Hp(Q) = Hs(Q) kökü.
// Afinite yasalarıyla n2/n1 = r devrindeki eğri Hp(Q, r) = A·r² + B·r·Q + C·Q²;
// tasarım noktasından geçen r: A·r² + B·Qd·r + C·Qd² − Hd = 0.
export const pompaIsletmeNoktasiInputSchema = z
  .object({
    kapamaBasmaYuksekligi_H0_m: z.number().positive(),
    egriNokta2Debi_m3h: z.number().positive(),
    egriNokta2Basma_m: z.number().min(0),
    egriNokta3Debi_m3h: z.number().positive(),
    egriNokta3Basma_m: z.number().min(0),
    statikYukseklik_Hst_m: z.number().min(0),
    tasarimDebisi_Qd_m3h: z.number().positive(),
    tasarimBasmaYuksekligi_Hd_m: z.number().positive(),
  })
  .refine((v) => v.egriNokta3Debi_m3h > v.egriNokta2Debi_m3h, {
    message: "3. eğri noktasının debisi 2. noktadan büyük olmalı",
  })
  .refine((v) => v.tasarimBasmaYuksekligi_Hd_m >= v.statikYukseklik_Hst_m, {
    message: "Tasarım basma yüksekliği statik yükseklikten küçük olamaz",
  });

export type PompaIsletmeNoktasiInput = z.infer<typeof pompaIsletmeNoktasiInputSchema>;

export interface PompaIsletmeNoktasiOutput {
  isletmeDebisi_m3h: number | null;
}

function enKucukPozitifKok(a: number, b: number, c: number): number | null {
  if (Math.abs(a) < 1e-12) return b !== 0 && -c / b > 0 ? -c / b : null;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const kokler = [(-b + Math.sqrt(disc)) / (2 * a), (-b - Math.sqrt(disc)) / (2 * a)].filter((x) => x > 0);
  return kokler.length > 0 ? Math.min(...kokler) : null;
}

function compute(input: PompaIsletmeNoktasiInput): CalcResult<PompaIsletmeNoktasiOutput> {
  const A = input.kapamaBasmaYuksekligi_H0_m;
  const Q2 = input.egriNokta2Debi_m3h;
  const Q3 = input.egriNokta3Debi_m3h;
  const y2 = input.egriNokta2Basma_m - A;
  const y3 = input.egriNokta3Basma_m - A;
  const det = Q2 * Q3 * (Q3 - Q2);
  const B = (y2 * Q3 * Q3 - y3 * Q2 * Q2) / det;
  const C = (y3 * Q2 - y2 * Q3) / det;

  const Hst = input.statikYukseklik_Hst_m;
  const Qd = input.tasarimDebisi_Qd_m3h;
  const Hd = input.tasarimBasmaYuksekligi_Hd_m;
  const b = (Hd - Hst) / (Qd * Qd);

  const Q = A > Hst ? enKucukPozitifKok(C - b, B, A - Hst) : null;
  const H = Q === null ? null : Hst + b * Q * Q;
  const devirOrani = enKucukPozitifKok(A, B * Qd, C * Qd * Qd - Hd);

  const verdict: CalcResult<PompaIsletmeNoktasiOutput>["verdict"] =
    Q === null
      ? {
          status: "uygunsuz",
          note: "Pompa eğrisi ile sistem eğrisi kesişmiyor: pompa bu sistemin statik yüksekliğini/direncini yenemez.",
        }
      : Q < Qd
        ? {
            status: "uygunsuz",
            note: `İşletme debisi ${Q.toFixed(1)} m³/h < tasarım ${Qd} m³/h: pompa yetersiz. Daha büyük pompa/çark veya devir artırımı (r = ${devirOrani?.toFixed(3) ?? "—"}) gerekir.`,
          }
        : Q > Q3
          ? {
              status: "sinirda",
              note: `İşletme noktası (${Q.toFixed(1)} m³/h) girilen eğri verisinin (≤ ${Q3} m³/h) dışında; sonuç ekstrapolasyon. Üretici eğrisinden daha yüksek debili bir nokta girin.`,
            }
          : {
              status: "uygun",
              note: `İşletme noktası ${Q.toFixed(1)} m³/h, ${H!.toFixed(1)} m; tasarım debisini %${((Q / Qd - 1) * 100).toFixed(1)} aşıyor. Tam tasarım noktası için devir oranı r = ${devirOrani?.toFixed(3) ?? "—"}.`,
            };

  return {
    value: { isletmeDebisi_m3h: Q },
    intermediates: {
      pompa_egrisi_B: B,
      pompa_egrisi_C: C,
      sistem_direnc_katsayisi_b: b,
      isletme_basma_yuksekligi_m: H ?? "—",
      tasarim_icin_devir_orani_r: devirOrani ?? "—",
    },
    standardsUsed: [],
    verdict,
  };
}

export const pompaIsletmeNoktasi: CalcModule<PompaIsletmeNoktasiInput, PompaIsletmeNoktasiOutput> = {
  id: "pompa-isletme-noktasi",
  title: "Pompa İşletme Noktası (Pompa–Sistem Eğrisi)",
  discipline: "mekanik",
  standards: [],
  inputSchema: pompaIsletmeNoktasiInputSchema,
  compute,
};
