import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Süreklilik denklemi (Q=A×V) ekonomik hız yöntemiyle birleştirilir: küçük
// çap düşük yatırım ama yüksek pompa/işletme maliyeti, büyük çap tersi
// getirir; ikisi arasındaki dengeyi temsil eden "ekonomik hız" aralığından
// (uygulamaya göre tipik 1-3 m/s) gerekli çap D=√(4Q/(πV)) bulunur. Boru
// Basınç Kaybı modülünün doğrudan girdi olarak aldığı çapı üretir.
export const boruEkonomikCapSecimiInputSchema = z.object({
  debi_Q_m3s: z.number().positive(),
  ekonomikHiz_V_ms: z.number().positive(),
});

export type BoruEkonomikCapSecimiInput = z.infer<typeof boruEkonomikCapSecimiInputSchema>;

export interface BoruEkonomikCapSecimiOutput {
  gerekliCap_D_mm: number;
}

function compute(input: BoruEkonomikCapSecimiInput): CalcResult<BoruEkonomikCapSecimiOutput> {
  const gerekliCapDM = Math.sqrt((4 * input.debi_Q_m3s) / (Math.PI * input.ekonomikHiz_V_ms));

  return {
    value: { gerekliCap_D_mm: gerekliCapDM * 1000 },
    intermediates: {
      gerekliCap_m: gerekliCapDM,
    },
    standardsUsed: [],
  };
}

export const boruEkonomikCapSecimi: CalcModule<
  BoruEkonomikCapSecimiInput,
  BoruEkonomikCapSecimiOutput
> = {
  id: "boru-ekonomik-cap-secimi",
  title: "Boru Hattı Ekonomik Çap Seçimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruEkonomikCapSecimiInputSchema,
  compute,
};
