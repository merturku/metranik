import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aylık ortalama dış sıcaklıklardan ısıtma derece-günü: DG = Σ Nay·max(0, Tb − Tay)  (TS 825 aylık yöntem; Tb = bina denge sıcaklığı)
// Aylık ortalama yöntemi, ay içinde Tb'yi aşan günleri ihmal ettiğinden günlük veriyle bulunan DG'den küçük çıkar.
export const dereceGunAylikSicaklikInputSchema = z.object({
  ocak: z.number(),
  subat: z.number(),
  mart: z.number(),
  nisan: z.number(),
  mayis: z.number(),
  haziran: z.number(),
  temmuz: z.number(),
  agustos: z.number(),
  eylul: z.number(),
  ekim: z.number(),
  kasim: z.number(),
  aralik: z.number(),
  denge_Tb_C: z.number(),
});

export type DereceGunAylikSicaklikInput = z.infer<typeof dereceGunAylikSicaklikInputSchema>;
export interface DereceGunAylikSicaklikOutput {
  dereceGun_Kgun: number;
}

const STD = "TS 825 (aylık ortalama yöntemi ile derece-gün)";
const AYLAR = ["ocak", "subat", "mart", "nisan", "mayis", "haziran", "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik"] as const;
const GUN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function compute(input: DereceGunAylikSicaklikInput): CalcResult<DereceGunAylikSicaklikOutput> {
  let dg = 0;
  let sezon = 0;
  let enSoguk = AYLAR[0] as string;
  let enSogukT = Infinity;
  AYLAR.forEach((ay, i) => {
    const t = input[ay];
    const n = GUN[i] ?? 30;
    if (t < input.denge_Tb_C) {
      dg += (input.denge_Tb_C - t) * n;
      sezon += n;
    }
    if (t < enSogukT) {
      enSogukT = t;
      enSoguk = ay;
    }
  });
  return {
    value: { dereceGun_Kgun: dg },
    intermediates: {
      isitma_sezonu_gun: sezon,
      en_soguk_ay: enSoguk,
      en_soguk_ay_sicakligi_C: enSogukT,
      denge_sicakligi_C: input.denge_Tb_C,
    },
    standardsUsed: [STD],
    verdict: {
      status: "uygun",
      note: "Aylık ortalama yöntemi günlük veriye göre DG'yi eksik bulur; sonuç Derece-Gün ile Yıllık Isıtma Enerjisi modülüne girdi olarak kullanılabilir (resmi şehir DG değerleri TS 825 Ek tablosundan teyit edilmeli)",
    },
  };
}

export const dereceGunAylikSicaklik: CalcModule<DereceGunAylikSicaklikInput, DereceGunAylikSicaklikOutput> = {
  id: "derece-gun-aylik-sicaklik",
  title: "Aylık Sıcaklıklardan Isıtma Derece-Günü",
  discipline: "mekanik",
  standards: [STD],
  inputSchema: dereceGunAylikSicaklikInputSchema,
  compute,
};
