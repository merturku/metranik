import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// API RP 14E tarzı erozyonel hız kriteri: Vmax = C/√ρ (C, hizmet tipine ve
// boru malzemesine göre değişen ampirik bir katsayı — sürekli servis için
// tipik olarak daha düşük, aralıklı servis için daha yüksek seçilir; C ve
// birim sistemi mühendisin girdiği değerlerdir). Hesaplanan gerçek akış hızı
// bu sınırla karşılaştırılarak erozyon/korozyon riski değerlendirilir.
export const boruErozyonHiziKontroluInputSchema = z.object({
  akiskanYogunlugu_rho_kgm3: z.number().positive(),
  erozyonKatsayisi_C: z.number().positive(),
  gercekAkisHizi_V_ms: z.number().positive(),
});

export type BoruErozyonHiziKontroluInput = z.infer<
  typeof boruErozyonHiziKontroluInputSchema
>;

export interface BoruErozyonHiziKontroluOutput {
  maksimumHiz_Vmax_ms: number;
}

function compute(
  input: BoruErozyonHiziKontroluInput,
): CalcResult<BoruErozyonHiziKontroluOutput> {
  const maksimumHizVmaxMs =
    input.erozyonKatsayisi_C / Math.sqrt(input.akiskanYogunlugu_rho_kgm3);

  return {
    value: { maksimumHiz_Vmax_ms: maksimumHizVmaxMs },
    intermediates: {
      gercekAkisHizi_ms: input.gercekAkisHizi_V_ms,
    },
    standardsUsed: ["API RP 14E"],
    verdict:
      input.gercekAkisHizi_V_ms <= maksimumHizVmaxMs
        ? { status: "uygun", note: "Akış hızı erozyonel sınırın altında." }
        : { status: "uygunsuz", note: "Akış hızı erozyonel sınırı aşıyor — erozyon/korozyon riski." },
  };
}

export const boruErozyonHiziKontrolu: CalcModule<
  BoruErozyonHiziKontroluInput,
  BoruErozyonHiziKontroluOutput
> = {
  id: "boru-erozyon-hizi-kontrolu",
  title: "Boru Hattı Erozyonel Hız Kontrolü",
  discipline: "mekanik",
  standards: ["API RP 14E"],
  inputSchema: boruErozyonHiziKontroluInputSchema,
  compute,
};
