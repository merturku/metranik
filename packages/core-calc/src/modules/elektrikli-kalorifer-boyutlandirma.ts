import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const elektrikliKaloriferBoyutlandirmaSchema = z.object({
  volumetrik_debi_m3h: z.number().positive(),
  sicaklik_artisi_C: z.number().positive(),
  hava_yoğunluğu_kgm3: z.number().positive().default(1.2),
  ozgul_isi_Jkg: z.number().positive().default(1000),
});

export type ElektrikliKaloriferBoyutlandirmaInput = z.infer<typeof elektrikliKaloriferBoyutlandirmaSchema>;

export interface ElektrikliKaloriferBoyutlandirmaOutput {
  gerekli_guç_kW: number;
  gerekli_guç_kVA: number;
}

export const elektrikliKaloriferBoyutlandirma: CalcModule<ElektrikliKaloriferBoyutlandirmaInput, ElektrikliKaloriferBoyutlandirmaOutput> = {
  id: "elektrikli-kalorifer-boyutlandirma",
  title: "Elektrikli Kalorifer Boyutlandırma",
  discipline: "mekanik",
  standards: ["—"],
  inputSchema: elektrikliKaloriferBoyutlandirmaSchema,

  compute(input: ElektrikliKaloriferBoyutlandirmaInput): CalcResult<ElektrikliKaloriferBoyutlandirmaOutput> {
    const ṁ = (input.volumetrik_debi_m3h / 3600) * input.hava_yoğunluğu_kgm3;
    const gerekli_guç_kW = ṁ * input.ozgul_isi_Jkg * input.sicaklik_artisi_C / 1000;
    const gerekli_guç_kVA = gerekli_guç_kW / 0.95;

    return {
      value: {
        gerekli_guç_kW: Math.round(gerekli_guç_kW * 10) / 10,
        gerekli_guç_kVA: Math.round(gerekli_guç_kVA * 10) / 10,
      },
      intermediates: {
        kutlesel_debi_kgs: Math.round(ṁ * 100) / 100,
      },
      standardsUsed: ["—"],
    };
  },
};
