import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";
export const radSicakliSchema = z.object({ isi_W: z.number().positive(), debi_Lmin: z.number().positive() });
export const radyatorDebiSicaklik: CalcModule<any, any> = {
  id: "radyator-debi-sicaklik-iliskisi",
  title: "Radyatör Debi-Sıcaklık İlişkisi",
  discipline: "mekanik",
  standards: ["EN 442"],
  inputSchema: radSicakliSchema as any,
  compute(input: any) {
    const cp = 4.18;
    const ΔT = input.isi_W / (input.debi_Lmin * cp * 16.67);
    return { value: { sicaklik_farki_C: parseFloat(ΔT.toFixed(1)) }, intermediates: { cp }, standardsUsed: ["EN 442"] };
  },
};
