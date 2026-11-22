import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Septik tank hacmi: V = N·(q·t_bekleme + s·T_temizleme)
// q = kişi başı günlük atık su (L/kişi·gün), t = bekletme süresi (gün), s = kişi başı yıllık çamur birikimi (L/kişi·yıl)
export const fosseptikHacmiInputSchema = z.object({
  kisiSayisi: z.number().positive(),
  gunlukAtikSu_Lkisigun: z.number().positive(),
  beklemeSuresi_gun: z.number().positive(),
  camurBirikimi_Lkisiyil: z.number().min(0),
  temizlemeAraligi_yil: z.number().positive(),
  tankDerinligi_m: z.number().positive(),
  enBoyOrani: z.number().positive(),
});

export type FosseptikHacmiInput = z.infer<typeof fosseptikHacmiInputSchema>;
export interface FosseptikHacmiOutput {
  toplamHacim_m3: number;
}

const STD = "Septik tank tasarım uygulaması (EPA Onsite Wastewater Manual / yerel yönetmelik teyidi gerekir)";

function compute(input: FosseptikHacmiInput): CalcResult<FosseptikHacmiOutput> {
  const N = input.kisiSayisi;
  const sivi = (N * input.gunlukAtikSu_Lkisigun * input.beklemeSuresi_gun) / 1000;
  const camur = (N * input.camurBirikimi_Lkisiyil * input.temizlemeAraligi_yil) / 1000;
  const V = sivi + camur;
  const alan = V / input.tankDerinligi_m;
  const en = Math.sqrt(alan / input.enBoyOrani);
  const boy = en * input.enBoyOrani;
  return {
    value: { toplamHacim_m3: V },
    intermediates: {
      sivi_hacmi_m3: sivi,
      camur_hacmi_m3: camur,
      plan_alani_m2: alan,
      tank_eni_m: en,
      tank_boyu_m: boy,
      gunluk_atik_su_m3: (N * input.gunlukAtikSu_Lkisigun) / 1000,
    },
    standardsUsed: [STD],
    verdict: {
      status: input.beklemeSuresi_gun >= 1 ? "uygun" : "sinirda",
      note: "Bekletme süresi ≥ 1 gün kabul edilir; yerel yönetmelik asgari hacmi (ör. 1,5–2 m³) ve boy/en oranı kontrol edilmeli. Çok bölmeli tasarım ve çıkış (emici hendek/drenaj) bu hesapta yok",
    },
  };
}

export const fosseptikHacmi: CalcModule<FosseptikHacmiInput, FosseptikHacmiOutput> = {
  id: "fosseptik-hacmi",
  title: "Fosseptik (Septik Tank) Hacmi",
  discipline: "ev",
  standards: [STD],
  inputSchema: fosseptikHacmiInputSchema,
  compute,
};
