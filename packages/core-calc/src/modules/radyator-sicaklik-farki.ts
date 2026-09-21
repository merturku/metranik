import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const radyatorSicaklikFarkiSchema = z.object({
  isi_yuku_W: z.number().positive(),
  kutlesel_debi_kgs: z.number().positive(),
  ozgul_isi_Jkg: z.number().positive().default(4186),
  min_sicaklik_farki: z.number().positive().default(10),
  max_sicaklik_farki: z.number().positive().default(20),
});

export type RadyatorSicaklikFarkiInput = z.infer<typeof radyatorSicaklikFarkiSchema>;

export interface RadyatorSicaklikFarkiOutput {
  sicaklik_farki_C: number;
  verdict?: { status: "uygun" | "düşük" | "yüksek"; note: string };
}

export const radyatorSicaklikFarki: CalcModule<RadyatorSicaklikFarkiInput, RadyatorSicaklikFarkiOutput> = {
  id: "radyator-sicaklik-farki",
  title: "Radyatör Sıcaklık Farkı Kontrolü",
  discipline: "mekanik",
  standards: ["EN 442"],
  inputSchema: radyatorSicaklikFarkiSchema,

  compute(input: RadyatorSicaklikFarkiInput): CalcResult<RadyatorSicaklikFarkiOutput> {
    const sicaklik_farki_C = input.isi_yuku_W / (input.kutlesel_debi_kgs * input.ozgul_isi_Jkg);

    let status: "uygun" | "düşük" | "yüksek" = "uygun";
    let note = "";

    if (sicaklik_farki_C < input.min_sicaklik_farki) {
      status = "düşük";
      note = `Sıcaklık farkı ${input.min_sicaklik_farki}°C'den az: su debisi aşırı, pompaya yük, enerji kaybı.`;
    } else if (sicaklik_farki_C > input.max_sicaklik_farki) {
      status = "yüksek";
      note = `Sıcaklık farkı ${input.max_sicaklik_farki}°C'den fazla: termal şok riski, radyatör çıkışı çok soğuk.`;
    } else {
      note = `Sıcaklık farkı kabul aralıkta (${input.min_sicaklik_farki}-${input.max_sicaklik_farki}°C).`;
    }

    return {
      value: {
        sicaklik_farki_C: Math.round(sicaklik_farki_C * 10) / 10,
        verdict: { status, note },
      },
      intermediates: {
        enerji_dengesi_W: Math.round(input.kutlesel_debi_kgs * input.ozgul_isi_Jkg * sicaklik_farki_C),
      },
      standardsUsed: ["EN 442"],
    };
  },
};
