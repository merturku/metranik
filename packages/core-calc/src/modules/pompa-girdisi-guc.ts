import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const pompaGirdisiGucSchema = z.object({
  debi_m3h: z.number().positive(),
  basınç_kPa: z.number().positive(),
  verim_yuzde: z.number().positive().default(70),
});

export type PompaGirdisiGucInput = z.infer<typeof pompaGirdisiGucSchema>;

export interface PompaGirdisiGucOutput {
  teorik_guc_kW: number;
  girdisi_guc_kW: number;
}

export const pompaGirdisiGuc: CalcModule<PompaGirdisiGucInput, PompaGirdisiGucOutput> = {
  id: "pompa-girdisi-guc",
  title: "Pompa Giriş Gücü",
  discipline: "mekanik",
  standards: ["ISO 9906"],
  inputSchema: pompaGirdisiGucSchema,

  compute(input: PompaGirdisiGucInput): CalcResult<PompaGirdisiGucOutput> {
    const debi_m3s = input.debi_m3h / 3600;
    const teorik = (debi_m3s * input.basınç_kPa * 1000) / 1000; // kW
    const girdisi = teorik / (input.verim_yuzde / 100);

    return {
      value: {
        teorik_guc_kW: Math.round(teorik * 1000) / 1000,
        girdisi_guc_kW: Math.round(girdisi * 1000) / 1000,
      },
      intermediates: { verim: input.verim_yuzde / 100 },
      standardsUsed: ["ISO 9906"],
    };
  },
};
