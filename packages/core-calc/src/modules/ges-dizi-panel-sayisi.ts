import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// GES dizisinde (string) seri panel sayısı sınırları, IEC 62548 gerilim koşulları.
// Panel gerilimi sıcaklıkla doğrusal değişir: V(T) = VSTC·[1 + β/100·(T − 25)].
// En yüksek gerilim en düşük beklenen hücre sıcaklığında (soğuk sabah, ≈ ortam):
//   Nmaks = ⌊Vdc,maks / Voc(Tmin)⌋  — aşılırsa invertör girişi hasar görebilir.
// MPPT penceresi: Nmin = ⌈VMPPT,min / Vmp(Tmaks)⌉ (sıcak hücrede gerilim düşer),
// N·Vmp(Tmin) ≤ VMPPT,maks (soğukta MPPT dışına çıkma, verim kaybı).
export const gesDiziPanelSayisiInputSchema = z
  .object({
    panelVoc_V: z.number().positive(),
    panelVmp_V: z.number().positive(),
    vocSicaklikKatsayisi_yuzdeK: z.number().max(0),
    vmpSicaklikKatsayisi_yuzdeK: z.number().max(0),
    enDusukHucreSicakligi_C: z.number().min(-40).max(25),
    enYuksekHucreSicakligi_C: z.number().min(25).max(90),
    invertorMaksDcGerilimi_V: z.number().positive(),
    mpptMinGerilimi_V: z.number().positive(),
    mpptMaksGerilimi_V: z.number().positive(),
    dizidekiPanelSayisi: z.number().int().min(1),
  })
  .refine((v) => v.panelVmp_V < v.panelVoc_V, { message: "Vmp, Voc'den küçük olmalı" })
  .refine((v) => v.mpptMinGerilimi_V < v.mpptMaksGerilimi_V && v.mpptMaksGerilimi_V <= v.invertorMaksDcGerilimi_V, {
    message: "MPPT aralığı min < maks ≤ invertör azami DC gerilimi olmalı",
  });

export type GesDiziPanelSayisiInput = z.infer<typeof gesDiziPanelSayisiInputSchema>;

export interface GesDiziPanelSayisiOutput {
  maksPanelSayisi: number;
}

function compute(input: GesDiziPanelSayisiInput): CalcResult<GesDiziPanelSayisiOutput> {
  const duzelt = (V: number, beta: number, T: number) => V * (1 + (beta / 100) * (T - 25));
  const vocSoguk = duzelt(input.panelVoc_V, input.vocSicaklikKatsayisi_yuzdeK, input.enDusukHucreSicakligi_C);
  const vmpSicak = duzelt(input.panelVmp_V, input.vmpSicaklikKatsayisi_yuzdeK, input.enYuksekHucreSicakligi_C);
  const vmpSoguk = duzelt(input.panelVmp_V, input.vmpSicaklikKatsayisi_yuzdeK, input.enDusukHucreSicakligi_C);

  const nMaks = Math.floor(input.invertorMaksDcGerilimi_V / vocSoguk);
  const nMin = Math.ceil(input.mpptMinGerilimi_V / vmpSicak);
  const nMppt = Math.floor(input.mpptMaksGerilimi_V / vmpSoguk);

  const N = input.dizidekiPanelSayisi;
  const diziVoc = N * vocSoguk;
  const diziVmpSicak = N * vmpSicak;
  const diziVmpSoguk = N * vmpSoguk;

  const verdict: CalcResult<GesDiziPanelSayisiOutput>["verdict"] =
    diziVoc > input.invertorMaksDcGerilimi_V
      ? {
          status: "uygunsuz",
          note: `${N} panel: soğukta dizi Voc = ${diziVoc.toFixed(0)} V > ${input.invertorMaksDcGerilimi_V} V; invertör hasar görebilir. En fazla ${nMaks} panel.`,
        }
      : diziVmpSicak < input.mpptMinGerilimi_V
        ? {
            status: "uygunsuz",
            note: `${N} panel: sıcakta dizi Vmp = ${diziVmpSicak.toFixed(0)} V < MPPT alt sınırı ${input.mpptMinGerilimi_V} V; yazın üretim kaybı. En az ${nMin} panel.`,
          }
        : diziVmpSoguk > input.mpptMaksGerilimi_V
          ? {
              status: "sinirda",
              note: `${N} panel güvenli (Voc ${diziVoc.toFixed(0)} V) ama soğukta Vmp = ${diziVmpSoguk.toFixed(0)} V MPPT üst sınırını (${input.mpptMaksGerilimi_V} V) aşıyor; kışın verim kaybı.`,
            }
          : {
              status: "uygun",
              note: `${N} panel: Voc(Tmin) = ${diziVoc.toFixed(0)} V, Vmp ${diziVmpSicak.toFixed(0)}–${diziVmpSoguk.toFixed(0)} V MPPT penceresinde.`,
            };

  return {
    value: { maksPanelSayisi: nMaks },
    intermediates: {
      panel_voc_en_dusuk_sicaklikta_V: vocSoguk,
      panel_vmp_en_yuksek_sicaklikta_V: vmpSicak,
      panel_vmp_en_dusuk_sicaklikta_V: vmpSoguk,
      min_panel_sayisi_mppt: nMin,
      maks_panel_sayisi_mppt: nMppt,
      dizi_voc_en_dusuk_sicaklikta_V: diziVoc,
      dizi_vmp_en_yuksek_sicaklikta_V: diziVmpSicak,
      dizi_vmp_en_dusuk_sicaklikta_V: diziVmpSoguk,
    },
    standardsUsed: ["IEC 62548"],
    verdict,
  };
}

export const gesDiziPanelSayisi: CalcModule<GesDiziPanelSayisiInput, GesDiziPanelSayisiOutput> = {
  id: "ges-dizi-panel-sayisi",
  title: "GES Dizi (String) Panel Sayısı",
  discipline: "elektrik",
  standards: ["IEC 62548"],
  inputSchema: gesDiziPanelSayisiInputSchema,
  compute,
};
