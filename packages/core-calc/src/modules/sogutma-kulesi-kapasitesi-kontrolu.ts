import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kulenin attığı ısı enerji dengesinden bulunur: Q = ṁ×cp×(Tgiriş - Tçıkış).
// Kule yeterlidir ancak Q ≥ tasarım ısı yükü ve çıkış suyu ≤ tasarım çıkış
// sıcaklığı ise. Çıkış suyu yaş termometre sıcaklığının altına inemez.
export const sogutmaKulesiKapasitesiKontroluSchema = z.object({
  tasarim_isi_yuku_kW: z.number().positive(),
  su_debisi_m3h: z.number().positive(),
  giris_sicakligi_C: z.number(),
  cikis_sicakligi_C: z.number(),
  yas_termometre_sicakligi_C: z.number(),
  tasarim_cikis_sicakligi_C: z.number(),
});

export type SogutmaKulesiKapasitesiKontroluInput = z.infer<
  typeof sogutmaKulesiKapasitesiKontroluSchema
>;

export interface SogutmaKulesiKapasitesiKontroluOutput {
  atilan_isi_kW: number;
}

const SU_YOGUNLUGU_KG_M3 = 1000;
const SU_OZGUL_ISI_KJ_KGK = 4.186;

function compute(
  input: SogutmaKulesiKapasitesiKontroluInput,
): CalcResult<SogutmaKulesiKapasitesiKontroluOutput> {
  const rangeC = input.giris_sicakligi_C - input.cikis_sicakligi_C;
  const approachC = input.cikis_sicakligi_C - input.yas_termometre_sicakligi_C;
  const kutleselDebiKgS = (input.su_debisi_m3h * SU_YOGUNLUGU_KG_M3) / 3600;
  const atilanIsiKW = kutleselDebiKgS * SU_OZGUL_ISI_KJ_KGK * rangeC;

  let verdict: CalcResult<SogutmaKulesiKapasitesiKontroluOutput>["verdict"];
  if (approachC < 0) {
    verdict = {
      status: "uygunsuz",
      note: "Çıkış suyu yaş termometre sıcaklığının altında — fiziksel olarak mümkün değil.",
    };
  } else if (atilanIsiKW < input.tasarim_isi_yuku_kW) {
    verdict = {
      status: "uygunsuz",
      note: `Atılan ısı (${atilanIsiKW.toFixed(0)} kW) tasarım ısı yükünün (${input.tasarim_isi_yuku_kW} kW) altında: kule kapasitesi yetersiz.`,
    };
  } else if (input.cikis_sicakligi_C > input.tasarim_cikis_sicakligi_C) {
    verdict = {
      status: "sinirda",
      note: `Isı yükü karşılanıyor ancak çıkış suyu (${input.cikis_sicakligi_C} °C) tasarım çıkış sıcaklığının (${input.tasarim_cikis_sicakligi_C} °C) üzerinde.`,
    };
  } else {
    verdict = {
      status: "uygun",
      note: "Kule tasarım ısı yükünü tasarım çıkış sıcaklığında karşılıyor.",
    };
  }

  return {
    value: { atilan_isi_kW: atilanIsiKW },
    intermediates: {
      range_C: rangeC,
      approach_C: approachC,
      kutleselDebi_kgs: kutleselDebiKgS,
      kapasiteOrani: atilanIsiKW / input.tasarim_isi_yuku_kW,
    },
    standardsUsed: [],
    verdict,
  };
}

export const sogutmaKulesiKapasitesiKontrolu: CalcModule<
  SogutmaKulesiKapasitesiKontroluInput,
  SogutmaKulesiKapasitesiKontroluOutput
> = {
  id: "sogutma-kulesi-kapasitesi-kontrolu",
  title: "Soğutma Kulesi Kapasitesi Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: sogutmaKulesiKapasitesiKontroluSchema,
  compute,
};
