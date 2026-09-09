import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Allievi/Joukowsky kriteri: bir vananın kapanması, basınç dalgasının boru
// boyunca gidiş-dönüş yapacağı süreden (tc=2L/a) daha kısa sürerse "ani
// kapanma" sayılır ve tam Joukowsky basınç darbesi oluşur; daha uzun sürerse
// "yavaş kapanma" olur ve darbe azalır. Su Darbesi Basıncı (Joukowsky)
// modülünün hesapladığı basınç artışının gerçekleşip gerçekleşmeyeceğinin
// zamanlama kontrolüdür.
export const boruKritikVanaKapanmaSuresiInputSchema = z.object({
  boruUzunlugu_L_m: z.number().positive(),
  basincDalgasiHizi_a_ms: z.number().positive(),
  vanaKapanmaSuresi_tkapanma_s: z.number().positive(),
});

export type BoruKritikVanaKapanmaSuresiInput = z.infer<
  typeof boruKritikVanaKapanmaSuresiInputSchema
>;

export interface BoruKritikVanaKapanmaSuresiOutput {
  kritikKapanmaSuresi_tc_s: number;
}

function compute(
  input: BoruKritikVanaKapanmaSuresiInput,
): CalcResult<BoruKritikVanaKapanmaSuresiOutput> {
  const kritikKapanmaSuresiTcS =
    (2 * input.boruUzunlugu_L_m) / input.basincDalgasiHizi_a_ms;

  return {
    value: { kritikKapanmaSuresi_tc_s: kritikKapanmaSuresiTcS },
    intermediates: {
      vanaKapanmaSuresi_s: input.vanaKapanmaSuresi_tkapanma_s,
    },
    standardsUsed: ["Allievi"],
    verdict:
      input.vanaKapanmaSuresi_tkapanma_s >= kritikKapanmaSuresiTcS
        ? { status: "uygun", note: "Yavaş kapanma — tam Joukowsky basınç darbesi oluşmaz." }
        : { status: "uygunsuz", note: "Ani kapanma — tam Joukowsky basınç darbesi oluşur, boru/vana bu darbeye göre kontrol edilmeli." },
  };
}

export const boruKritikVanaKapanmaSuresi: CalcModule<
  BoruKritikVanaKapanmaSuresiInput,
  BoruKritikVanaKapanmaSuresiOutput
> = {
  id: "boru-kritik-vana-kapanma-suresi",
  title: "Boru Hattı Kritik Vana Kapanma Süresi (Su Darbesi)",
  discipline: "mekanik",
  standards: ["Allievi"],
  inputSchema: boruKritikVanaKapanmaSuresiInputSchema,
  compute,
};
