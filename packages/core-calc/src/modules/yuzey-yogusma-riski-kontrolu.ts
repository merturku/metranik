import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Bir yüzeyin sıcaklığı, çevresindeki havanın çiy noktası sıcaklığının
// altına düşerse yüzeyde yoğuşma (terleme) oluşur. Kontrol, yüzey sıcaklığı
// ile çiy noktası arasındaki farkın bir güvenlik marjını karşılayıp
// karşılamadığını değerlendirir. Psikrometrik Çiy Noktası Sıcaklığı
// modülünün ürettiği çiy noktasını girdi olarak kullanır.
export const yuzeyYogusmaRiskiKontroluInputSchema = z.object({
  yuzeySicakligi_Tyuzey_C: z.number(),
  ciyNoktasiSicakligi_Tciy_C: z.number(),
  guvenlikMarji_C: z.number().nonnegative(),
});

export type YuzeyYogusmaRiskiKontroluInput = z.infer<
  typeof yuzeyYogusmaRiskiKontroluInputSchema
>;

export interface YuzeyYogusmaRiskiKontroluOutput {
  sicaklikFarki_C: number;
}

function compute(
  input: YuzeyYogusmaRiskiKontroluInput,
): CalcResult<YuzeyYogusmaRiskiKontroluOutput> {
  const sicaklikFarkiC = input.yuzeySicakligi_Tyuzey_C - input.ciyNoktasiSicakligi_Tciy_C;

  return {
    value: { sicaklikFarki_C: sicaklikFarkiC },
    intermediates: {
      guvenlikMarji_C: input.guvenlikMarji_C,
    },
    standardsUsed: [],
    verdict:
      sicaklikFarkiC >= input.guvenlikMarji_C
        ? { status: "uygun", note: "Yüzey sıcaklığı çiy noktasından yeterince uzak, yoğuşma riski düşük." }
        : { status: "uygunsuz", note: "Yüzey sıcaklığı çiy noktasına çok yakın veya altında — yoğuşma riski." },
  };
}

export const yuzeyYogusmaRiskiKontrolu: CalcModule<
  YuzeyYogusmaRiskiKontroluInput,
  YuzeyYogusmaRiskiKontroluOutput
> = {
  id: "yuzey-yogusma-riski-kontrolu",
  title: "Yüzey Yoğuşma Riski Kontrolü",
  discipline: "mekanik",
  standards: [],
  inputSchema: yuzeyYogusmaRiskiKontroluInputSchema,
  compute,
};
