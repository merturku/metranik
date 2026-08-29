import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Aydınlatma güç yoğunluğu (LPD): toplam kurulu aydınlatma gücünün alana
// bölünmesiyle bulunur ve enerji verimliliği yönetmeliklerinin (ASHRAE 90.1,
// yerelde BEP) öngördüğü üst sınırla karşılaştırılır. Aydınlatma (Lüks Yöntemi)
// modülünün ürettiği aydınlık düzeyinden farklı bir metriktir — burada ölçü
// enerji tüketimi (W/m²), görme konforu değil.
export const aydinlatmaGucYogunluguKontroluInputSchema = z.object({
  toplamAydinlatmaGucu_W: z.number().positive(),
  alan_m2: z.number().positive(),
  izinVerilenLPD_Wm2: z.number().positive(),
});

export type AydinlatmaGucYogunluguKontroluInput = z.infer<
  typeof aydinlatmaGucYogunluguKontroluInputSchema
>;

export interface AydinlatmaGucYogunluguKontroluOutput {
  hesaplananLPD_Wm2: number;
}

function compute(
  input: AydinlatmaGucYogunluguKontroluInput,
): CalcResult<AydinlatmaGucYogunluguKontroluOutput> {
  const hesaplananLPDWm2 = input.toplamAydinlatmaGucu_W / input.alan_m2;

  return {
    value: { hesaplananLPD_Wm2: hesaplananLPDWm2 },
    intermediates: {
      izinVerilenLPD_Wm2: input.izinVerilenLPD_Wm2,
    },
    standardsUsed: ["ASHRAE 90.1"],
    verdict:
      hesaplananLPDWm2 <= input.izinVerilenLPD_Wm2
        ? { status: "uygun", note: "Aydınlatma güç yoğunluğu izin verilen sınırın altında." }
        : { status: "uygunsuz", note: "Aydınlatma güç yoğunluğu izin verilen sınırı aşıyor." },
  };
}

export const aydinlatmaGucYogunluguKontrolu: CalcModule<
  AydinlatmaGucYogunluguKontroluInput,
  AydinlatmaGucYogunluguKontroluOutput
> = {
  id: "aydinlatma-guc-yogunlugu-kontrolu",
  title: "Aydınlatma Güç Yoğunluğu (LPD) Kontrolü",
  discipline: "elektrik",
  standards: ["ASHRAE 90.1"],
  inputSchema: aydinlatmaGucYogunluguKontroluInputSchema,
  compute,
};
