import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Politropik sıkıştırma işi (birim kütle başına): w = n/(n-1)×R×T1×[(P2/P1)^((n-1)/n) - 1].
// n: politropik indeks (izotermal n=1, izentropik n=k), R: özgül gaz sabiti
// (J/kgK), T1: giriş sıcaklığı (K). Kompresör Sıkıştırma Sıcaklığı modülü
// çıkış sıcaklığını hesaplar; bu modül aynı sıkıştırma sürecinin gerektirdiği
// gücü hesaplar.
export const kompresorPolitropikSikistirmaGucuInputSchema = z.object({
  politropikIndeks_n: z.number().positive(),
  ozgulGazSabiti_R_JkgK: z.number().positive(),
  girisSicakligi_T1_K: z.number().positive(),
  basincOrani_P2P1: z.number().positive(),
  kutleselDebi_mdot_kgs: z.number().positive(),
});

export type KompresorPolitropikSikistirmaGucuInput = z.infer<
  typeof kompresorPolitropikSikistirmaGucuInputSchema
>;

export interface KompresorPolitropikSikistirmaGucuOutput {
  guc_kW: number;
}

function compute(
  input: KompresorPolitropikSikistirmaGucuInput,
): CalcResult<KompresorPolitropikSikistirmaGucuOutput> {
  const ussEksi1BolUss = (input.politropikIndeks_n - 1) / input.politropikIndeks_n;
  const birimKutleIsi_Jkg =
    ((input.politropikIndeks_n / (input.politropikIndeks_n - 1)) *
      input.ozgulGazSabiti_R_JkgK *
      input.girisSicakligi_T1_K *
      (Math.pow(input.basincOrani_P2P1, ussEksi1BolUss) - 1));
  const gucW = birimKutleIsi_Jkg * input.kutleselDebi_mdot_kgs;

  return {
    value: { guc_kW: gucW / 1000 },
    intermediates: {
      birimKutleIsi_Jkg: birimKutleIsi_Jkg,
    },
    standardsUsed: [],
  };
}

export const kompresorPolitropikSikistirmaGucu: CalcModule<
  KompresorPolitropikSikistirmaGucuInput,
  KompresorPolitropikSikistirmaGucuOutput
> = {
  id: "kompresor-politropik-sikistirma-gucu",
  title: "Kompresör Politropik Sıkıştırma Gücü",
  discipline: "mekanik",
  standards: [],
  inputSchema: kompresorPolitropikSikistirmaGucuInputSchema,
  compute,
};
