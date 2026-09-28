import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const isiEsjanjoreEffektivitesiSchema = z.object({
  sicaklik_giris_sicak_C: z.number(),
  sicaklik_giris_soğuk_C: z.number(),
  sicaklik_cikis_sicak_C: z.number(),
  sicaklik_cikis_soğuk_C: z.number(),
  min_effektivite: z.number().default(0.7),
});

export type IsiEsjanjoreEffektivitesiInput = z.infer<typeof isiEsjanjoreEffektivitesiSchema>;

export interface IsiEsjanjoreEffektivitesiOutput {
  effektivite: number;
  isi_farki_teorik_C: number;
  isi_farki_fiili_C: number;
  verdict?: { status: "uygun" | "yetersiz"; note: string };
}

export const isiEsjanjoreEffektivitesi: CalcModule<IsiEsjanjoreEffektivitesiInput, IsiEsjanjoreEffektivitesiOutput> = {
  id: "isi-esjanjoru-effektivitesi",
  title: "Isı Eşanjörü Effektivitesi (ε-NTU)",
  discipline: "mekanik",
  standards: ["EN 12815", "ISO 8801"],
  inputSchema: isiEsjanjoreEffektivitesiSchema,

  compute(input: IsiEsjanjoreEffektivitesiInput): CalcResult<IsiEsjanjoreEffektivitesiOutput> {
    const delta_T_teorik = input.sicaklik_giris_sicak_C - input.sicaklik_giris_soğuk_C;
    const delta_T_fiili = input.sicaklik_cikis_soğuk_C - input.sicaklik_giris_soğuk_C;
    const effektivite = delta_T_fiili / delta_T_teorik;

    let status: "uygun" | "yetersiz" = "uygun";
    let note = "";

    if (effektivite >= input.min_effektivite) {
      note = `Effektivite kabul edilebilir (${(effektivite * 100).toFixed(1)}% ≥ ${(input.min_effektivite * 100).toFixed(1)}%).`;
    } else {
      status = "yetersiz";
      note = `Effektivite düşük (${(effektivite * 100).toFixed(1)}% < ${(input.min_effektivite * 100).toFixed(1)}%): eşanjör boyutu yetersiz.`;
    }

    return {
      value: {
        effektivite: Math.round(effektivite * 1000) / 1000,
        isi_farki_teorik_C: delta_T_teorik,
        isi_farki_fiili_C: delta_T_fiili,
        verdict: { status, note },
      },
      intermediates: {
        min_gerekli_effektivite: input.min_effektivite,
      },
      standardsUsed: ["EN 12815"],
    };
  },
};
