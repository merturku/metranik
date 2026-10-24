import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Isı değiştirici (eşanjör) etkinliği, sıcak akışkanın gerçekleşen sıcaklık
// düşümünün mümkün olan maksimum düşüme oranı olarak tanımlanır (ε-NTU
// yönteminin temel tanımı, sıcak akışkanın ısıl kapasitesi minimum kabul edilir):
// ε = (Th,giriş - Th,çıkış) / (Th,giriş - Tc,giriş).
export const isiDegistiriciEtkinligiInputSchema = z.object({
  sicakGirisSicakligi_ThIn_C: z.number(),
  sicakCikisSicakligi_ThOut_C: z.number(),
  sogukGirisSicakligi_TcIn_C: z.number(),
});

export type IsiDegistiriciEtkinligiInput = z.infer<
  typeof isiDegistiriciEtkinligiInputSchema
>;

export interface IsiDegistiriciEtkinligiOutput {
  etkinlik_epsilon: number;
}

function compute(
  input: IsiDegistiriciEtkinligiInput,
): CalcResult<IsiDegistiriciEtkinligiOutput> {
  const maksimumFark = input.sicakGirisSicakligi_ThIn_C - input.sogukGirisSicakligi_TcIn_C;
  const gerceklesenFark =
    input.sicakGirisSicakligi_ThIn_C - input.sicakCikisSicakligi_ThOut_C;
  const etkinlik_epsilon = gerceklesenFark / maksimumFark;

  return {
    value: { etkinlik_epsilon },
    intermediates: {
      gerceklesenSicaklikFarki_C: gerceklesenFark,
      maksimumSicaklikFarki_C: maksimumFark,
    },
    standardsUsed: [],
  };
}

export const isiDegistiriciEtkinligi: CalcModule<
  IsiDegistiriciEtkinligiInput,
  IsiDegistiriciEtkinligiOutput
> = {
  id: "isi-degistirici-etkinligi",
  title: "Isı Değiştirici Etkinliği",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiDegistiriciEtkinligiInputSchema,
  compute,
};
