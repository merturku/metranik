import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Nötr iletken kesiti seçimi (IEC 60364-5-52): tek fazlı doğrusal olmayan
// yüklerde (LED sürücü, UPS, bilgisayar vb.) üçüncü harmonik akımları nötr
// iletkende toplanır (faz kaymaları birbirini götürmez); nötr akımı faz
// akımından büyük çıkabilir. Harmonik çarpanı IEC tablosundan/ölçümden alınır.
// İnötr = İfaz × HarmonikÇarpanı, gerekli nötr kesiti aynı çarpanla büyütülür.
export const notrIletkenKesitiSecimiInputSchema = z.object({
  fazAkimi_Ifaz_A: z.number().positive(),
  harmonikCarpani: z.number().positive(),
  fazKesiti_mm2: z.number().positive(),
});

export type NotrIletkenKesitiSecimiInput = z.infer<
  typeof notrIletkenKesitiSecimiInputSchema
>;

export interface NotrIletkenKesitiSecimiOutput {
  onerilenNotrKesiti_mm2: number;
}

function compute(
  input: NotrIletkenKesitiSecimiInput,
): CalcResult<NotrIletkenKesitiSecimiOutput> {
  const notrAkimiA = input.fazAkimi_Ifaz_A * input.harmonikCarpani;
  const onerilenNotrKesitiMm2 = input.fazKesiti_mm2 * input.harmonikCarpani;

  return {
    value: { onerilenNotrKesiti_mm2: onerilenNotrKesitiMm2 },
    intermediates: {
      notrAkimi_A: notrAkimiA,
    },
    standardsUsed: ["IEC 60364-5-52"],
  };
}

export const notrIletkenKesitiSecimi: CalcModule<
  NotrIletkenKesitiSecimiInput,
  NotrIletkenKesitiSecimiOutput
> = {
  id: "notr-iletken-kesiti-secimi",
  title: "Nötr İletken Kesiti Seçimi",
  discipline: "elektrik",
  standards: ["IEC 60364-5-52"],
  inputSchema: notrIletkenKesitiSecimiInputSchema,
  compute,
};
