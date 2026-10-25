import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Termosifon/boyler deposundaki sıcak suyun, şebeke suyuyla karıştırılarak duş
// sıcaklığında kullanılabilecek süresi (adyabatik karışım enerji dengesi):
// Vkarışık = V·f·(Tdepo − Tsoğuk)/(Tduş − Tsoğuk), t = Vkarışık / debi.
// f: depodaki sıcak suyun karışma/tabakalaşma kayıpları sonrası kullanılabilir
// oranı (ideal 1; gerçek değer depo tipine göre daha düşüktür, üreticiden alınır).
// Kullanım sırasında ısıtıcının ek ısıtması ihmal edilir (güvenli taraf).
export const termosifonDusSuresiInputSchema = z
  .object({
    depoHacmi_L: z.number().positive(),
    depoSicakligi_C: z.number(),
    sebekeSuyuSicakligi_C: z.number(),
    dusSicakligi_C: z.number(),
    dusDebisi_Ldk: z.number().positive(),
    kullanilabilirOran: z.number().positive().max(1),
  })
  .refine((v) => v.depoSicakligi_C > v.dusSicakligi_C && v.dusSicakligi_C > v.sebekeSuyuSicakligi_C, {
    message: "Sıcaklıklar depo > duş > şebeke suyu sıralamasında olmalı",
  });

export type TermosifonDusSuresiInput = z.infer<typeof termosifonDusSuresiInputSchema>;

export interface TermosifonDusSuresiOutput {
  dusSuresi_dk: number;
}

function compute(input: TermosifonDusSuresiInput): CalcResult<TermosifonDusSuresiOutput> {
  const depoFarki = input.depoSicakligi_C - input.sebekeSuyuSicakligi_C;
  const dusFarki = input.dusSicakligi_C - input.sebekeSuyuSicakligi_C;
  const karisikHacimL = (input.depoHacmi_L * input.kullanilabilirOran * depoFarki) / dusFarki;
  const sicakSuDebisi = (input.dusDebisi_Ldk * dusFarki) / depoFarki;

  return {
    value: { dusSuresi_dk: karisikHacimL / input.dusDebisi_Ldk },
    intermediates: {
      karisik_su_hacmi_L: karisikHacimL,
      depodan_sicak_su_debisi_Ldk: sicakSuDebisi,
      sebekeden_soguk_su_debisi_Ldk: input.dusDebisi_Ldk - sicakSuDebisi,
    },
    standardsUsed: [],
  };
}

export const termosifonDusSuresi: CalcModule<TermosifonDusSuresiInput, TermosifonDusSuresiOutput> = {
  id: "termosifon-dus-suresi",
  title: "Termosifon / Boyler Duş Süresi",
  discipline: "ev",
  standards: [],
  inputSchema: termosifonDusSuresiInputSchema,
  compute,
};
