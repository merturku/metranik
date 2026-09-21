import { z } from "zod";
import type { CalcModule, CalcResult } from "../types";

export const kanalBaglantıSızıntıKontroluSchema = z.object({
  tasarım_debisi_m3h: z.number().positive(),
  sızıntı_orani_yuzde: z.number().positive().default(0.1),
  izin_verilen_sızıntı_yuzde: z.number().positive().default(0.3),
});

export type KanalBaglantıSızıntıKontroluInput = z.infer<typeof kanalBaglantıSızıntıKontroluSchema>;

export interface KanalBaglantıSızıntıKontroluOutput {
  sızıntı_debisi_m3h: number;
  verdict?: { status: "uygun" | "yetersiz"; note: string };
}

export const kanalBaglantıSızıntıKontrolu: CalcModule<KanalBaglantıSızıntıKontroluInput, KanalBaglantıSızıntıKontroluOutput> = {
  id: "kanal-baglantı-sızıntı-kontrolu",
  title: "Kanal Bağlantı Sızıntı Kontrolü",
  discipline: "mekanik",
  standards: ["ISO 12237"],
  inputSchema: kanalBaglantıSızıntıKontroluSchema,

  compute(input: KanalBaglantıSızıntıKontroluInput): CalcResult<KanalBaglantıSızıntıKontroluOutput> {
    const sızıntı_debisi_m3h = input.tasarım_debisi_m3h * (input.sızıntı_orani_yuzde / 100);

    let status: "uygun" | "yetersiz" = "uygun";
    let note = "";

    if (input.sızıntı_orani_yuzde <= input.izin_verilen_sızıntı_yuzde) {
      note = `Sızıntı oranı kabul edilebilir (${input.sızıntı_orani_yuzde}% ≤ ${input.izin_verilen_sızıntı_yuzde}%).`;
    } else {
      status = "yetersiz";
      note = `Sızıntı aşırı (${input.sızıntı_orani_yuzde}% > ${input.izin_verilen_sızıntı_yuzde}%): kanal ağını iyileştirin.`;
    }

    return {
      value: {
        sızıntı_debisi_m3h: Math.round(sızıntı_debisi_m3h * 10) / 10,
        verdict: { status, note },
      },
      intermediates: {
        izin_verilen_sızıntı_debisi_m3h: Math.round(input.tasarım_debisi_m3h * (input.izin_verilen_sızıntı_yuzde / 100) * 10) / 10,
      },
      standardsUsed: ["ISO 12237"],
    };
  },
};
