import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Duyulur ısı geri kazanım verimi (sıcaklık bazlı):
// ε = (Tsupply,çıkış − Tsupply,giriş) / (Texhaust,giriş − Tsupply,giriş).
export const isiGeriKazanimVerimiInputSchema = z.object({
  tazeHavaGirisSicakligi_C: z.number(),
  tazeHavaCikisSicakligi_C: z.number(),
  egzozHavaSicakligi_C: z.number(),
});

export type IsiGeriKazanimVerimiInput = z.infer<typeof isiGeriKazanimVerimiInputSchema>;

export interface IsiGeriKazanimVerimiOutput {
  verim_yuzde: number;
}

function compute(input: IsiGeriKazanimVerimiInput): CalcResult<IsiGeriKazanimVerimiOutput> {
  const verimYuzde =
    ((input.tazeHavaCikisSicakligi_C - input.tazeHavaGirisSicakligi_C) /
      (input.egzozHavaSicakligi_C - input.tazeHavaGirisSicakligi_C)) *
    100;

  return {
    value: { verim_yuzde: verimYuzde },
    intermediates: {
      sicaklikYukselmesi_C: input.tazeHavaCikisSicakligi_C - input.tazeHavaGirisSicakligi_C,
    },
    standardsUsed: [],
  };
}

export const isiGeriKazanimVerimi: CalcModule<
  IsiGeriKazanimVerimiInput,
  IsiGeriKazanimVerimiOutput
> = {
  id: "isi-geri-kazanim-verimi",
  title: "Isı Geri Kazanım Verimi",
  discipline: "mekanik",
  standards: [],
  inputSchema: isiGeriKazanimVerimiInputSchema,
  compute,
};
