import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kuru borulu sprinkler sisteminde hedef dolum süresine göre gerekli kompresör
// debisi: Q = V / t.
export const kuruSistemHavaKompresoruInputSchema = z.object({
  boruSistemiHacmi_V_L: z.number().positive(),
  hedefDolumSuresi_t_dk: z.number().positive(),
});

export type KuruSistemHavaKompresoruInput = z.infer<
  typeof kuruSistemHavaKompresoruInputSchema
>;

export interface KuruSistemHavaKompresoruOutput {
  gerekliDebi_Ldk: number;
}

function compute(
  input: KuruSistemHavaKompresoruInput,
): CalcResult<KuruSistemHavaKompresoruOutput> {
  const gerekliDebiLdk = input.boruSistemiHacmi_V_L / input.hedefDolumSuresi_t_dk;

  return {
    value: { gerekliDebi_Ldk: gerekliDebiLdk },
    intermediates: {
      hedefDolumSuresi_dk: input.hedefDolumSuresi_t_dk,
    },
    standardsUsed: ["NFPA 13"],
  };
}

export const kuruSistemHavaKompresoru: CalcModule<
  KuruSistemHavaKompresoruInput,
  KuruSistemHavaKompresoruOutput
> = {
  id: "kuru-sistem-hava-kompresoru",
  title: "Kuru Sistem Hava Kompresörü Kapasitesi",
  discipline: "mekanik",
  standards: ["NFPA 13"],
  inputSchema: kuruSistemHavaKompresoruInputSchema,
  compute,
};
