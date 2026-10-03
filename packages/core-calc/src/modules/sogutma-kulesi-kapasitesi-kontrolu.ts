import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const sogutmaKulesiKapasitesiKontroluSchema = z.object({
  isi_yuku_kW: z.number().positive(),
  su_debisi_m3h: z.number().positive(),
  giris_sicakligi_C: z.number(),
  cikis_sicakligi_C: z.number(),
  ortam_sicakligi_C: z.number(),
  min_cikis_sicakligi_C: z.number().optional(),
});

export type SogutmaKulesiKapasitesiKontroluInput = z.infer<typeof sogutmaKulesiKapasitesiKontroluSchema>;

export interface SogutmaKulesiKapasitesiKontroluOutput {
  gereken_isi_yuku_kW: number;
  sicaklik_farki_C: number;
  verdict?: { status: "uygun" | "yetersiz"; note: string };
}

export const sogutmaKulesiKapasitesiKontrolu: CalcModule<SogutmaKulesiKapasitesiKontroluInput, SogutmaKulesiKapasitesiKontroluOutput> = {
  id: "sogutma-kulesi-kapasitesi-kontrolu",
  title: "Soğutma Kulesi Kapasitesi Kontrolü",
  discipline: "mekanik",
  standards: ["EN 12113", "CTI STD-101"],
  inputSchema: sogutmaKulesiKapasitesiKontrolyuSchema as any,

  compute(input: SogutmaKulesiKapasitesiKontroluInput): CalcResult<SogutmaKulesiKapasitesiKontroluOutput> {
    const m_kgs = (input.su_debisi_m3h / 3.6) * 1000; // convert to kg/s, ρ≈1000 kg/m³
    const c_su = 4186; // specific heat water J/kg°C
    const delta_T_kabin = input.giris_sicakligi_C - input.cikis_sicakligi_C;
    const gereken_isi_yuku_kW = (m_kgs * c_su * delta_T_kabin) / 1000;

    let status: "uygun" | "yetersiz" = "uygun";
    let note = "";

    if (input.cikis_sicakligi_C <= input.min_cikis_sicakligi_C) {
      note = `Çıkış sıcaklığı kabul edilebilir (${input.cikis_sicakligi_C}°C ≤ ${input.min_cikis_sicakligi_C}°C).`;
    } else {
      status = "yetersiz";
      note = `Çıkış sıcaklığı aşırı yüksek (${input.cikis_sicakligi_C}°C > ${input.min_cikis_sicakligi_C}°C): kulesini büyütün.`;
    }

    return {
      value: {
        gereken_isi_yuku_kW: Math.round(gereken_isi_yuku_kW * 10) / 10,
        sicaklik_farki_C: delta_T_kabin,
        verdict: { status, note },
      },
      intermediates: {
        kutlesel_debi_kgs: Math.round(m_kgs * 10) / 10,
        tasarım_kapasitesi_kW: input.isi_yuku_kW,
      },
      standardsUsed: ["EN 12113"],
    };
  },
};
