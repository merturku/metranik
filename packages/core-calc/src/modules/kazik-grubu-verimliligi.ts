import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

// Kazık grubu verimliliği (Converse-Labarre formülü): grup içindeki kazıklar
// birbirine yakın olduğunda etki alanları çakışır ve toplam kapasite, tekil
// kazık kapasitelerinin toplamından düşük çıkar.
// Eg = 1 - θ×[(n-1)m + (m-1)n] / (90×m×n), θ = arctan(d/s) derece cinsinden.
export const kazikGrubuVerimliligiInputSchema = z.object({
  kazikCapi_d_m: z.number().positive(),
  kazikArasiMesafe_s_m: z.number().positive(),
  siraSayisi_m: z.number().positive(),
  sutunSayisi_n: z.number().positive(),
});

export type KazikGrubuVerimliligiInput = z.infer<
  typeof kazikGrubuVerimliligiInputSchema
>;

export interface KazikGrubuVerimliligiOutput {
  grupVerimliligi: number;
}

function compute(
  input: KazikGrubuVerimliligiInput,
): CalcResult<KazikGrubuVerimliligiOutput> {
  const thetaDerece = Math.atan(input.kazikCapi_d_m / input.kazikArasiMesafe_s_m) * (180 / Math.PI);
  const m = input.siraSayisi_m;
  const n = input.sutunSayisi_n;
  const azaltmaTerimi = (thetaDerece * ((n - 1) * m + (m - 1) * n)) / (90 * m * n);
  const grupVerimliligi = 1 - azaltmaTerimi;

  return {
    value: { grupVerimliligi },
    intermediates: {
      theta_derece: thetaDerece,
    },
    standardsUsed: ["Converse-Labarre"],
  };
}

export const kazikGrubuVerimliligi: CalcModule<
  KazikGrubuVerimliligiInput,
  KazikGrubuVerimliligiOutput
> = {
  id: "kazik-grubu-verimliligi",
  title: "Kazık Grubu Verimliliği",
  discipline: "insaat",
  standards: ["Converse-Labarre"],
  inputSchema: kazikGrubuVerimliligiInputSchema,
  compute,
};
