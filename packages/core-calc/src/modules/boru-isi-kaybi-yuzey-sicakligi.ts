import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const boruIsiKaybiYuzeySchema = z.object({
  ic_sicaklik_C: z.number(),
  ortam_sicakligi_C: z.number(),
  isolasyon_kalınligi_mm: z.number().positive(),
  emisivite: z.number().positive().optional(),
});

export const boruIsiKaybiYuzeySicakligi: CalcModule<any, any> = {
  id: "boru-isi-kaybi-yuzey-sicakligi",
  title: "Yalıtımlı Boru Yüzey Sıcaklığı",
  discipline: "mekanik",
  standards: ["ASTM C1055"],
  inputSchema: boruIsiKaybiYuzeySchema as any,

  compute(input: any) {
    const k_yalitim = 0.04;
    const h_disari = 10;
    const R_isi = (input.isolasyon_kalınligi_mm / 1000) / k_yalitim;
    const R_taşinım = 1 / h_disari;
    const Q = input.ic_sicaklik_C - input.ortam_sicakligi_C;
    const yuzey_sıcaklığı = input.ic_sicaklik_C - Q * (R_isi / (R_isi + R_taşinım));
    return {
      value: { yuzey_sicakligi_C: parseFloat(yuzey_sıcaklığı.toFixed(1)) },
      intermediates: { R_isi, R_taşinım },
      standardsUsed: ["ASTM C1055"],
    };
  },
};
