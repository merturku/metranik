import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duvar kağıdı rulo sayısı (şerit yöntemi):
// şerit boyu = h + kesim payı; desenliyse desen tekrarının (rapor) tam katına yuvarlanır
// (her şerit desenin aynı noktasından başlamalı — düz eşleşme);
// rulodan çıkan şerit = ⌊rulo boyu / şerit boyu⌋, gereken şerit = ⌈net duvar genişliği / rulo eni⌉,
// rulo = ⌈şerit / rulodan çıkan şerit⌉. Tam boy açıklıklar (kapı, boydan pencere)
// genişlikten düşülür; küçük pencerelerin altı/üstü kaplandığı için düşülmez.
const EPS = 1e-9;
const yukariYuvarla = (x: number) => Math.ceil(x - EPS);
const asagiYuvarla = (x: number) => Math.floor(x + EPS);

export const duvarKagidiRuloSayisiInputSchema = z
  .object({
    toplamDuvarUzunlugu_m: z.number().positive(),
    dusulecekAciklikGenisligi_m: z.number().min(0),
    duvarYuksekligi_m: z.number().positive(),
    ruloEni_cm: z.number().positive(),
    ruloBoyu_m: z.number().positive(),
    desenTekrari_cm: z.number().min(0),
    kesimPayi_cm: z.number().min(0),
  })
  .refine((v) => v.dusulecekAciklikGenisligi_m < v.toplamDuvarUzunlugu_m, {
    message: "Düşülecek açıklık toplam duvar uzunluğundan küçük olmalı",
  });

export type DuvarKagidiRuloSayisiInput = z.infer<typeof duvarKagidiRuloSayisiInputSchema>;

export interface DuvarKagidiRuloSayisiOutput {
  ruloSayisi: number | null;
}

function compute(input: DuvarKagidiRuloSayisiInput): CalcResult<DuvarKagidiRuloSayisiOutput> {
  const rapor = input.desenTekrari_cm / 100;
  const hamSerit = input.duvarYuksekligi_m + input.kesimPayi_cm / 100;
  const seritBoyu = rapor > 0 ? yukariYuvarla(hamSerit / rapor) * rapor : hamSerit;
  const ruloBasinaSerit = asagiYuvarla(input.ruloBoyu_m / seritBoyu);
  const netGenislik = input.toplamDuvarUzunlugu_m - input.dusulecekAciklikGenisligi_m;
  const seritSayisi = yukariYuvarla(netGenislik / (input.ruloEni_cm / 100));

  if (ruloBasinaSerit < 1) {
    return {
      value: { ruloSayisi: null },
      intermediates: { serit_boyu_m: seritBoyu, rulo_basina_serit: 0, gereken_serit_sayisi: seritSayisi },
      standardsUsed: [],
      verdict: {
        status: "uygunsuz",
        note: `Şerit boyu ${seritBoyu.toFixed(2)} m rulo boyundan (${input.ruloBoyu_m} m) uzun: bu rulo bu yüksekliğe yetmez.`,
      },
    };
  }

  const rulo = yukariYuvarla(seritSayisi / ruloBasinaSerit);
  const kaplanan = netGenislik * input.duvarYuksekligi_m;
  const satinAlinan = rulo * input.ruloBoyu_m * (input.ruloEni_cm / 100);

  return {
    value: { ruloSayisi: rulo },
    intermediates: {
      serit_boyu_m: seritBoyu,
      rulo_basina_serit: ruloBasinaSerit,
      net_duvar_genisligi_m: netGenislik,
      gereken_serit_sayisi: seritSayisi,
      kaplanan_alan_m2: kaplanan,
      satin_alinan_alan_m2: satinAlinan,
      fire_orani_yuzde: ((satinAlinan - kaplanan) / satinAlinan) * 100,
    },
    standardsUsed: [],
  };
}

export const duvarKagidiRuloSayisi: CalcModule<DuvarKagidiRuloSayisiInput, DuvarKagidiRuloSayisiOutput> = {
  id: "duvar-kagidi-rulo-sayisi",
  title: "Duvar Kağıdı Rulo Sayısı",
  discipline: "ev",
  standards: [],
  inputSchema: duvarKagidiRuloSayisiInputSchema,
  compute,
};
