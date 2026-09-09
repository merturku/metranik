import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Basit mesnetli (iki nokta destekli) bir boru hattında, düzgün yayılı yük
// altında maksimum eğilme momenti M=wL²/8 oluşur (klasik kiriş teorisi).
// İzin verilen gerilmeye göre σ=M/S eşitliğinden L çözülür: L=√(8σS/w).
// Konsol Boru Destek Aralığı Kontrolü modülü ankastre (tek uçtan sabit)
// durumu kapsar; bu modül daha yaygın olan iki nokta destekli düz hat
// durumunu kapsar.
export const boruDestekAraligiBasitMesnetliInputSchema = z.object({
  izinVerilenGerilme_sigma_MPa: z.number().positive(),
  kesitModulu_S_mm3: z.number().positive(),
  birimUzunlukYuku_w_Nmm: z.number().positive(),
});

export type BoruDestekAraligiBasitMesnetliInput = z.infer<
  typeof boruDestekAraligiBasitMesnetliInputSchema
>;

export interface BoruDestekAraligiBasitMesnetliOutput {
  maksimumAralik_L_m: number;
}

function compute(
  input: BoruDestekAraligiBasitMesnetliInput,
): CalcResult<BoruDestekAraligiBasitMesnetliOutput> {
  const maksimumAralikLMm = Math.sqrt(
    (8 * input.izinVerilenGerilme_sigma_MPa * input.kesitModulu_S_mm3) /
      input.birimUzunlukYuku_w_Nmm,
  );

  return {
    value: { maksimumAralik_L_m: maksimumAralikLMm / 1000 },
    intermediates: {
      maksimumAralik_mm: maksimumAralikLMm,
    },
    standardsUsed: [],
  };
}

export const boruDestekAraligiBasitMesnetli: CalcModule<
  BoruDestekAraligiBasitMesnetliInput,
  BoruDestekAraligiBasitMesnetliOutput
> = {
  id: "boru-destek-araligi-basit-mesnetli",
  title: "Boru Destek Aralığı (Basit Mesnetli)",
  discipline: "mekanik",
  standards: [],
  inputSchema: boruDestekAraligiBasitMesnetliInputSchema,
  compute,
};
